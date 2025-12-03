import { NextResponse } from 'next/server'
import { processScheduledCampaigns } from '@/lib/campaign'

/**
 * POST /api/campaigns/process - Process scheduled campaigns
 * This endpoint should be called by a cron job to execute pending campaigns
 */
export async function POST() {
  try {
    const results = await processScheduledCampaigns()

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
      message: `Processed ${results.length} campaign executions`,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

