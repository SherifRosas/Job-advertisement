import { NextResponse } from 'next/server'
import { getTaskStatistics } from '@/lib/agent-scheduler'

/**
 * GET /api/agent/tasks/stats - Get task statistics
 */
export async function GET() {
  try {
    const stats = await getTaskStatistics()

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}






