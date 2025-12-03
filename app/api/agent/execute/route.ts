import { NextRequest, NextResponse } from 'next/server'
import { getAIAgent } from '@/lib/ai-agent'

/**
 * POST /api/agent/execute - Execute a task immediately
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId } = body

    if (!taskId) {
      return NextResponse.json(
        { success: false, error: 'taskId is required' },
        { status: 400 }
      )
    }

    const agent = getAIAgent()
    const result = await agent.executeTask(taskId)

    return NextResponse.json({
      success: result.success,
      result,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

