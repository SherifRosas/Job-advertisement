/**
 * Marketing Campaign Management System
 * Handles campaign creation, scheduling, execution, and analytics
 */

import { prisma } from '@/lib/db'
import { getAIAgent } from './ai-agent'

export interface CreateCampaignInput {
  name: string
  description?: string
  type: 'social_post' | 'email_campaign' | 'multi_channel'
  platforms: ('facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email')[]
  scheduleType: 'once' | 'recurring' | 'interval'
  startDate?: Date
  endDate?: Date
  recurrenceRule?: string
  content?: string
  language?: 'ar' | 'en' | 'both'
  targetAudience?: string
  autoGenerate?: boolean
  config?: Record<string, any>
  createdBy?: string
  subAdminId?: string // Optional sub-admin ID (defaults to main admin if not provided)
}

export interface CampaignMetrics {
  totalReach: number
  totalEngagement: number
  totalClicks: number
  executionCount: number
  successRate: number
  averageReach: number
  averageEngagement: number
}

/**
 * Create a new marketing campaign
 */
export async function createCampaign(input: CreateCampaignInput) {
  // Generate content if auto-generate is enabled
  let content = input.content
  if (input.autoGenerate && !content) {
    const agent = getAIAgent()
    const platform = input.platforms[0] && input.platforms[0] !== 'email' 
      ? input.platforms[0] 
      : undefined
    const language = input.language === 'both' ? 'ar' : (input.language || 'ar')
    
    try {
      // Try AI generation, but fallback gracefully if it fails
      content = await agent.generateContent('social_post', platform, language as 'ar' | 'en')
    } catch (error) {
      console.warn('AI content generation failed (quota exceeded or API error), using fallback content:', error)
      // Use fallback content - this is fine, campaigns can work without AI
      content = agent.getFallbackContent('social_post', platform, language as 'ar' | 'en')
    }
  }

  // Get main admin ID to assign as default sub-admin (account manager)
  // Make this optional - don't fail campaign creation if admin lookup fails
  let mainAdminId: string | undefined = undefined
  try {
    const mainAdmin = await prisma.admin.findFirst({
      where: {
        email: 'sherifrosas.ai@gmail.com',
        role: 'main-admin',
        isActive: true,
      },
    })
    if (mainAdmin) {
      mainAdminId = mainAdmin.id
    }
  } catch (error) {
    console.warn('Could not fetch main admin (database may not be fully set up):', error)
    // Continue without sub-admin assignment - this is not critical for campaign creation
  }

  // Create the campaign - handle database connection errors gracefully
  let campaign
  try {
    campaign = await prisma.campaign.create({
      data: {
        name: input.name,
        description: input.description,
        type: input.type,
        platforms: input.platforms,
        scheduleType: input.scheduleType,
        startDate: input.startDate,
        endDate: input.endDate,
        recurrenceRule: input.recurrenceRule,
        content: content || '',
        language: input.language || 'ar',
        targetAudience: input.targetAudience,
        autoGenerate: input.autoGenerate ?? true,
        config: input.config || {},
        createdBy: input.createdBy,
        subAdminId: input.subAdminId || mainAdminId, // Use provided sub-admin or default to main admin
        status: input.startDate && input.startDate > new Date() ? 'scheduled' : 'draft',
      },
    })
  } catch (dbError: any) {
    // If database connection fails, provide a helpful error message
    if (dbError.message?.includes('Tenant or user not found') || 
        dbError.message?.includes('FATAL') ||
        dbError.code === 'P1001') {
      throw new Error(
        'Database connection failed. Please verify your DATABASE_URL in .env.local. ' +
        'The database credentials may be incorrect or the database may not exist. ' +
        'Error: ' + dbError.message
      )
    }
    // Re-throw other database errors
    throw dbError
  }

  // Create initial executions if campaign is scheduled
  if (campaign.status === 'scheduled' && campaign.startDate) {
    await scheduleCampaignExecutions(campaign.id)
  }

  return campaign
}

/**
 * Schedule campaign executions based on campaign configuration
 */
export async function scheduleCampaignExecutions(campaignId: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  })

  if (!campaign) {
    throw new Error('Campaign not found')
  }

  const executions: any[] = []
  const now = new Date()
  const startDate = campaign.startDate || now
  const endDate = campaign.endDate

  // Generate execution schedule based on scheduleType
  if (campaign.scheduleType === 'once') {
    // Single execution for each platform
    for (const platform of campaign.platforms) {
      executions.push({
        campaignId: campaign.id,
        platform,
        scheduledAt: startDate,
        status: 'pending',
        content: campaign.content,
      })
    }
  } else if (campaign.scheduleType === 'recurring' && campaign.recurrenceRule) {
    // Parse recurrence rule and create multiple executions
    // For simplicity, we'll create daily executions until endDate
    const dailyExecutions = generateDailySchedule(
      startDate,
      endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
      campaign.platforms,
      campaign.content || ''
    )
    executions.push(...dailyExecutions.map(exec => ({
      ...exec,
      campaignId: campaign.id,
      status: 'pending' as const,
    })))
  } else if (campaign.scheduleType === 'interval') {
    // Interval-based scheduling (e.g., every 3 days)
    const intervalDays = parseInt(campaign.recurrenceRule || '1')
    const intervalExecutions = generateIntervalSchedule(
      startDate,
      endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      intervalDays,
      campaign.platforms,
      campaign.content || ''
    )
    executions.push(...intervalExecutions.map(exec => ({
      ...exec,
      campaignId: campaign.id,
      status: 'pending' as const,
    })))
  }

  // Create executions in database
  if (executions.length > 0) {
    await prisma.campaignExecution.createMany({
      data: executions,
    })
  }

  // Update campaign status
  await prisma.campaign.update({
    where: { id: campaignId },
    data: { status: 'scheduled' },
  })

  return executions
}

/**
 * Generate daily execution schedule
 */
function generateDailySchedule(
  startDate: Date,
  endDate: Date,
  platforms: string[],
  content: string
) {
  const executions: any[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    for (const platform of platforms) {
      executions.push({
        platform,
        scheduledAt: new Date(currentDate),
        content,
      })
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return executions
}

/**
 * Generate interval-based execution schedule
 */
function generateIntervalSchedule(
  startDate: Date,
  endDate: Date,
  intervalDays: number,
  platforms: string[],
  content: string
) {
  const executions: any[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    for (const platform of platforms) {
      executions.push({
        platform,
        scheduledAt: new Date(currentDate),
        content,
      })
    }
    currentDate.setDate(currentDate.getDate() + intervalDays)
  }

  return executions
}

/**
 * Execute a campaign execution
 */
export async function executeCampaignExecution(executionId: string) {
  const execution = await prisma.campaignExecution.findUnique({
    where: { id: executionId },
    include: { campaign: true },
  })

  if (!execution) {
    throw new Error('Execution not found')
  }

  if (execution.status !== 'pending') {
    throw new Error(`Execution ${executionId} is not pending`)
  }

  // Update status to running
  await prisma.campaignExecution.update({
    where: { id: executionId },
    data: { status: 'running' },
  })

  try {
    const agent = getAIAgent()
    
    // Generate content if needed
    let content = execution.content
    if (!content && execution.campaign.autoGenerate) {
      const platform = execution.platform !== 'email' 
        ? execution.platform as 'facebook' | 'twitter' | 'linkedin' | 'whatsapp'
        : undefined
      const language = execution.campaign.language === 'both' 
        ? 'ar' 
        : (execution.campaign.language as 'ar' | 'en')
      content = await agent.generateContent('social_post', platform, language)
    }

    // Execute the task via AI agent
    const taskId = agent.scheduleTask({
      type: execution.platform === 'email' ? 'email_campaign' : 'social_post',
      platform: execution.platform as any,
      scheduledAt: execution.scheduledAt,
      content: content || '',
      config: (execution.campaign.config as Record<string, any>) || {},
    })

    const result = await agent.executeTask(taskId)

    // Update execution with results
    await prisma.campaignExecution.update({
      where: { id: executionId },
      data: {
        status: 'completed',
        executedAt: new Date(),
        content: content || execution.content,
        result: {
          success: result.success,
          message: result.message,
          taskId: result.taskId,
        },
        reach: result.metrics?.reach || 0,
        engagement: result.metrics?.engagement || 0,
        clicks: result.metrics?.clicks || 0,
      },
    })

    return result
  } catch (error: any) {
    // Update execution with error
    await prisma.campaignExecution.update({
      where: { id: executionId },
      data: {
        status: 'failed',
        executedAt: new Date(),
        errorMessage: error.message || 'Execution failed',
      },
    })

    throw error
  }
}

/**
 * Get campaign metrics
 */
export async function getCampaignMetrics(campaignId: string): Promise<CampaignMetrics> {
  const executions = await prisma.campaignExecution.findMany({
    where: { campaignId },
  })

  const completedExecutions = executions.filter(e => e.status === 'completed')
  const totalReach = completedExecutions.reduce((sum, e) => sum + (e.reach || 0), 0)
  const totalEngagement = completedExecutions.reduce((sum, e) => sum + (e.engagement || 0), 0)
  const totalClicks = completedExecutions.reduce((sum, e) => sum + (e.clicks || 0), 0)
  const successCount = completedExecutions.length
  const successRate = executions.length > 0 ? (successCount / executions.length) * 100 : 0

  return {
    totalReach,
    totalEngagement,
    totalClicks,
    executionCount: executions.length,
    successRate,
    averageReach: completedExecutions.length > 0 ? totalReach / completedExecutions.length : 0,
    averageEngagement: completedExecutions.length > 0 ? totalEngagement / completedExecutions.length : 0,
  }
}

/**
 * Get all campaigns
 */
export async function getAllCampaigns() {
  return prisma.campaign.findMany({
    include: {
      executions: {
        orderBy: { scheduledAt: 'desc' },
        take: 10, // Latest 10 executions
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

/**
 * Get campaign by ID
 */
export async function getCampaignById(campaignId: string) {
  return prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      executions: {
        orderBy: { scheduledAt: 'desc' },
      },
    },
  })
}

/**
 * Update campaign
 */
export async function updateCampaign(
  campaignId: string,
  data: Partial<CreateCampaignInput>
) {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}

/**
 * Delete campaign
 */
export async function deleteCampaign(campaignId: string) {
  return prisma.campaign.delete({
    where: { id: campaignId },
  })
}

/**
 * Pause campaign
 */
export async function pauseCampaign(campaignId: string) {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { status: 'paused' },
  })
}

/**
 * Resume campaign
 */
export async function resumeCampaign(campaignId: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  })

  if (!campaign) {
    throw new Error('Campaign not found')
  }

  const newStatus = campaign.startDate && campaign.startDate > new Date() 
    ? 'scheduled' 
    : 'active'

  return prisma.campaign.update({
    where: { id: campaignId },
    data: { status: newStatus },
  })
}

/**
 * Cancel campaign
 */
export async function cancelCampaign(campaignId: string) {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { status: 'cancelled' },
  })
}

/**
 * Process scheduled campaigns (to be called by cron job)
 */
export async function processScheduledCampaigns() {
  const now = new Date()
  
  // Find pending executions that should be executed
  const pendingExecutions = await prisma.campaignExecution.findMany({
    where: {
      status: 'pending',
      scheduledAt: { lte: now },
    },
    include: {
      campaign: true,
    },
  })

  // Filter executions for active campaigns only
  const activeExecutions = pendingExecutions.filter(
    exec => exec.campaign.status === 'active' || exec.campaign.status === 'scheduled'
  )

  // Execute each pending execution
  const results = []
  for (const execution of activeExecutions) {
    try {
      const result = await executeCampaignExecution(execution.id)
      results.push({ executionId: execution.id, success: true, result })
    } catch (error: any) {
      results.push({ executionId: execution.id, success: false, error: error.message })
    }
  }

  return results
}

