import { NextRequest, NextResponse } from 'next/server'
import { getAIAgent } from '@/lib/ai-agent'

/**
 * POST /api/agent/generate - Generate marketing content
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, platform, language = 'ar' } = body

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type is required' },
        { status: 400 }
      )
    }

    const agent = getAIAgent()
    const content = await agent.generateContent(type, platform, language)

    return NextResponse.json({
      success: true,
      content,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}


