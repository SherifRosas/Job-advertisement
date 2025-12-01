import { NextResponse } from 'next/server'
import { getSettings } from '@/lib/supabase-server'
import { supabaseServer } from '@/lib/supabase-server'

export async function GET() {
  try {
    // Check database connection
    const { error: dbError } = await supabaseServer.from('settings').select('id').limit(1)

    // Check advertisement status
    const settings = await getSettings()

    if (dbError) {
      throw dbError
    }

    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      advertisementStatus: settings?.advertisementStatus || 'unknown',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}


