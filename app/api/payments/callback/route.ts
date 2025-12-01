import { NextRequest, NextResponse } from 'next/server'

// Placeholder Paymob webhook handler.
// In this simplified deployment, payment is skipped and this endpoint is a no-op.

export async function POST(_request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'Payment callback placeholder: no payment processing performed.',
    })
  } catch (error: any) {
    console.error('Payment callback error:', error)
    return NextResponse.json({ error: error.message || 'Callback failed' }, { status: 400 })
  }
}


