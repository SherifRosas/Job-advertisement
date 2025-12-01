import { NextRequest, NextResponse } from 'next/server'
import { getSettings } from '@/lib/supabase-server'
import { processPaymobCallback } from '@/lib/paymob-callback'

// Paymob webhook handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check advertisement status
    const settings = await getSettings()
    if (settings?.advertisementStatus === 'closed') {
      return NextResponse.json(
        { error: 'Advertisement is closed' },
        { status: 400 }
      )
    }

    // Process payment callback
    const result = await processPaymobCallback(body)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Payment callback error:', error)
    return NextResponse.json({ error: error.message || 'Callback failed' }, { status: 400 })
  }
}

