import { NextRequest, NextResponse } from 'next/server'
import { scheduleAgentTask } from '@/lib/agent-scheduler'

/**
 * POST /api/agent/schedule - Schedule a new agent task
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, platform, scheduledAt, content, config } = body

    if (!type || !scheduledAt) {
      return NextResponse.json(
        { success: false, error: 'Type and scheduledAt are required' },
        { status: 400 }
      )
    }

    const taskId = await scheduleAgentTask({
      type,
      platform,
      scheduledAt: new Date(scheduledAt),
      content,
      config,
    })

    return NextResponse.json({
      success: true,
      taskId,
      message: 'Task scheduled successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

