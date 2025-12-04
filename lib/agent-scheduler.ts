/**
 * Agent Task Scheduler - Persistent Task Management System
 * 
 * This system provides:
 * - Database-backed task storage (persists across restarts)
 * - Automatic task execution via cron jobs
 * - Task status tracking and history
 * - Retry logic for failed tasks
 */

import { prisma } from '@/lib/db'
import { getAIAgent, AgentTask, CampaignResult } from '@/lib/ai-agent'

export interface ScheduledTask {
  id: string
  type: 'social_post' | 'email_campaign' | 'analytics' | 'content_generation'
  platform?: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email'
  scheduledAt: Date
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  content?: string
  config?: Record<string, any>
  retryCount: number
  maxRetries: number
  lastError?: string
  result?: CampaignResult
  createdAt: Date
  updatedAt: Date
  executedAt?: Date
}

/**
 * Schedule a new agent task (persists to database)
 */
export async function scheduleAgentTask(
  task: Omit<AgentTask, 'id' | 'status'>
): Promise<string> {
  const scheduledTask = await prisma.agentTask.create({
    data: {
      type: task.type,
      platform: task.platform,
      scheduledAt: task.scheduledAt,
      content: task.content,
      config: task.config || {},
      status: 'pending',
      retryCount: 0,
      maxRetries: task.config?.maxRetries || 3,
    },
  })

  // Also add to in-memory agent for immediate access
  const agent = getAIAgent()
  agent.scheduleTask(task)

  return scheduledTask.id
}

/**
 * Get all scheduled tasks
 */
export async function getAllScheduledTasks(
  filters?: {
    status?: ScheduledTask['status']
    type?: ScheduledTask['type']
    platform?: ScheduledTask['platform']
  }
): Promise<ScheduledTask[]> {
  const where: any = {}
  if (filters?.status) where.status = filters.status
  if (filters?.type) where.type = filters.type
  if (filters?.platform) where.platform = filters.platform

  const tasks = await prisma.agentTask.findMany({
    where,
    orderBy: { scheduledAt: 'asc' },
  })

  return tasks.map(mapToScheduledTask)
}

/**
 * Get task by ID
 */
export async function getScheduledTask(taskId: string): Promise<ScheduledTask | null> {
  const task = await prisma.agentTask.findUnique({
    where: { id: taskId },
  })

  return task ? mapToScheduledTask(task) : null
}

/**
 * Cancel a scheduled task
 */
export async function cancelScheduledTask(taskId: string): Promise<void> {
  await prisma.agentTask.update({
    where: { id: taskId },
    data: {
      status: 'cancelled',
      updatedAt: new Date(),
    },
  })
}

/**
 * Process pending tasks (called by cron job)
 * This is the main function that executes scheduled tasks automatically
 */
export async function processPendingTasks(): Promise<{
  processed: number
  succeeded: number
  failed: number
  results: Array<{ taskId: string; success: boolean; error?: string }>
}> {
  const now = new Date()

  // Find all pending tasks that should be executed
  const pendingTasks = await prisma.agentTask.findMany({
    where: {
      status: 'pending',
      scheduledAt: { lte: now },
    },
    orderBy: { scheduledAt: 'asc' },
  })

  const results: Array<{ taskId: string; success: boolean; error?: string }> = []
  let succeeded = 0
  let failed = 0

  // Execute each pending task
  for (const task of pendingTasks) {
    try {
      // Update status to running
      await prisma.agentTask.update({
        where: { id: task.id },
        data: {
          status: 'running',
          updatedAt: new Date(),
        },
      })

      // Execute via AI Agent
      const agent = getAIAgent()
      const agentTask: AgentTask = {
        id: task.id,
        type: task.type as any,
        platform: task.platform as any,
        scheduledAt: task.scheduledAt,
        status: 'running',
        content: task.content || undefined,
        config: (task.config as Record<string, any>) || {},
      }

      const result = await agent.executeTask(task.id)

      // Update task with results
      await prisma.agentTask.update({
        where: { id: task.id },
        data: {
          status: result.success ? 'completed' : 'failed',
          executedAt: new Date(),
          result: result as any,
          lastError: result.success ? null : result.message,
          updatedAt: new Date(),
        },
      })

      results.push({ taskId: task.id, success: result.success })
      if (result.success) {
        succeeded++
      } else {
        failed++
        await handleTaskFailure(task.id, result.message || 'Task execution failed')
      }
    } catch (error: any) {
      failed++
      const errorMessage = error.message || 'Unknown error'

      await prisma.agentTask.update({
        where: { id: task.id },
        data: {
          status: 'failed',
          executedAt: new Date(),
          lastError: errorMessage,
          updatedAt: new Date(),
        },
      })

      await handleTaskFailure(task.id, errorMessage)
      results.push({ taskId: task.id, success: false, error: errorMessage })
    }
  }

  return {
    processed: pendingTasks.length,
    succeeded,
    failed,
    results,
  }
}

/**
 * Handle task failure with retry logic
 */
async function handleTaskFailure(taskId: string, error: string): Promise<void> {
  const task = await prisma.agentTask.findUnique({
    where: { id: taskId },
  })

  if (!task) return

  const retryCount = task.retryCount + 1

  if (retryCount < task.maxRetries) {
    // Reschedule for retry (exponential backoff: 5min, 15min, 45min)
    const backoffMinutes = Math.pow(3, retryCount) * 5
    const retryAt = new Date(Date.now() + backoffMinutes * 60 * 1000)

    await prisma.agentTask.update({
      where: { id: taskId },
      data: {
        status: 'pending',
        retryCount,
        scheduledAt: retryAt,
        lastError: error,
        updatedAt: new Date(),
      },
    })

    console.log(`🔄 Task ${taskId} will retry in ${backoffMinutes} minutes (attempt ${retryCount}/${task.maxRetries})`)
  } else {
    console.log(`❌ Task ${taskId} failed after ${retryCount} attempts`)
  }
}

/**
 * Get task statistics
 */
export async function getTaskStatistics(): Promise<{
  total: number
  pending: number
  running: number
  completed: number
  failed: number
  cancelled: number
}> {
  const [total, pending, running, completed, failed, cancelled] = await Promise.all([
    prisma.agentTask.count(),
    prisma.agentTask.count({ where: { status: 'pending' } }),
    prisma.agentTask.count({ where: { status: 'running' } }),
    prisma.agentTask.count({ where: { status: 'completed' } }),
    prisma.agentTask.count({ where: { status: 'failed' } }),
    prisma.agentTask.count({ where: { status: 'cancelled' } }),
  ])

  return {
    total,
    pending,
    running,
    completed,
    failed,
    cancelled,
  }
}

/**
 * Clean up old completed/failed tasks (optional maintenance)
 */
export async function cleanupOldTasks(olderThanDays: number = 30): Promise<number> {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

  const result = await prisma.agentTask.deleteMany({
    where: {
      status: { in: ['completed', 'failed', 'cancelled'] },
      executedAt: { lt: cutoffDate },
    },
  })

  return result.count
}

/**
 * Map database task to ScheduledTask interface
 */
function mapToScheduledTask(task: any): ScheduledTask {
  return {
    id: task.id,
    type: task.type,
    platform: task.platform,
    scheduledAt: task.scheduledAt,
    status: task.status,
    content: task.content,
    config: (task.config as Record<string, any>) || {},
    retryCount: task.retryCount,
    maxRetries: task.maxRetries,
    lastError: task.lastError,
    result: task.result as CampaignResult | undefined,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    executedAt: task.executedAt,
  }
}

