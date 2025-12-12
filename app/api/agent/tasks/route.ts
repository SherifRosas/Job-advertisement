import { NextRequest, NextResponse } from 'next/server'
import { getAIAgent } from '@/lib/ai-agent'

/**
 * GET /api/agent/tasks - Get all agent tasks
 * POST /api/agent/tasks - Create a new task
 */
export async function GET() {
  try {
    const agent = getAIAgent()
    const tasks = agent.getTasks()

    return NextResponse.json({
      success: true,
      tasks,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

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

    const agent = getAIAgent()
    const taskId = agent.scheduleTask({
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







