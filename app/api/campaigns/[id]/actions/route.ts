import { NextRequest, NextResponse } from 'next/server'
import {
  pauseCampaign,
  resumeCampaign,
  cancelCampaign,
  executeCampaignExecution,
} from '@/lib/campaign'

/**
 * POST /api/campaigns/[id]/actions - Perform actions on campaigns
 * Actions: pause, resume, cancel, execute
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { action, executionId } = body

    if (!action) {
      return NextResponse.json(
        { success: false, error: 'Action is required' },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case 'pause':
        result = await pauseCampaign(id)
        break
      case 'resume':
        result = await resumeCampaign(id)
        break
      case 'cancel':
        result = await cancelCampaign(id)
        break
      case 'execute':
        if (!executionId) {
          return NextResponse.json(
            { success: false, error: 'executionId is required for execute action' },
            { status: 400 }
          )
        }
        result = await executeCampaignExecution(executionId)
        break
      default:
        return NextResponse.json(
          { success: false, error: `Unknown action: ${action}` },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      result,
      message: `Campaign ${action} completed successfully`,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}






