import { NextResponse } from 'next/server'
import { getAIAgent } from '@/lib/ai-agent'

/**
 * POST /api/agent/start - Start the AI agent
 */
export async function POST() {
  try {
    const agent = getAIAgent()
    await agent.start()

    return NextResponse.json({
      success: true,
      message: 'AI Agent "Numerous" started successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}


