import { NextResponse } from 'next/server'
import { processPendingTasks } from '@/lib/agent-scheduler'

/**
 * POST /api/agent/process - Process pending agent tasks
 * This endpoint should be called by a cron job to execute scheduled tasks
 */
export async function POST() {
  try {
    const result = await processPendingTasks()

    return NextResponse.json({
      success: true,
      ...result,
      message: `Processed ${result.processed} tasks (${result.succeeded} succeeded, ${result.failed} failed)`,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}






