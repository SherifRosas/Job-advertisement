import { NextRequest, NextResponse } from 'next/server'
import {
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  pauseCampaign,
  resumeCampaign,
  cancelCampaign,
  getCampaignMetrics,
} from '@/lib/campaign'

/**
 * GET /api/campaigns/[id] - Get campaign by ID
 * PUT /api/campaigns/[id] - Update campaign
 * DELETE /api/campaigns/[id] - Delete campaign
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const campaign = await getCampaignById(id)

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      )
    }

    const metrics = await getCampaignMetrics(id)

    return NextResponse.json({
      success: true,
      campaign,
      metrics,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const campaign = await updateCampaign(id, body)

    return NextResponse.json({
      success: true,
      campaign,
      message: 'Campaign updated successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteCampaign(id)

    return NextResponse.json({
      success: true,
      message: 'Campaign deleted successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

