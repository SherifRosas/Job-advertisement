import { NextRequest, NextResponse } from 'next/server'
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  pauseCampaign,
  resumeCampaign,
  cancelCampaign,
  getCampaignMetrics,
} from '@/lib/campaign'

/**
 * GET /api/campaigns - Get all campaigns
 * POST /api/campaigns - Create a new campaign
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const campaignId = searchParams.get('id')

    if (campaignId) {
      const campaign = await getCampaignById(campaignId)
      if (!campaign) {
        return NextResponse.json(
          { success: false, error: 'Campaign not found' },
          { status: 404 }
        )
      }

      const metrics = await getCampaignMetrics(campaignId)

      return NextResponse.json({
        success: true,
        campaign,
        metrics,
      })
    }

    const campaigns = await getAllCampaigns()
    return NextResponse.json({
      success: true,
      campaigns,
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
    const {
      name,
      description,
      type,
      platforms,
      scheduleType,
      startDate,
      endDate,
      recurrenceRule,
      content,
      language,
      targetAudience,
      autoGenerate,
      config,
      createdBy,
    } = body

    if (!name || !type || !platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name, type, and platforms are required' },
        { status: 400 }
      )
    }

    const campaign = await createCampaign({
      name,
      description,
      type,
      platforms,
      scheduleType: scheduleType || 'once',
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      recurrenceRule,
      content,
      language: language || 'ar',
      targetAudience,
      autoGenerate: autoGenerate !== false,
      config,
      createdBy,
    })

    return NextResponse.json({
      success: true,
      campaign,
      message: 'Campaign created successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/campaigns - Update a campaign
 * DELETE /api/campaigns - Delete a campaign
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Campaign ID is required' },
        { status: 400 }
      )
    }

    const campaign = await updateCampaign(id, updateData)

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

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Campaign ID is required' },
        { status: 400 }
      )
    }

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





