import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { storeVerificationCode } from '@/lib/verification-codes'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { phoneNumber } = await request.json()
    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 })
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Normalize phone number (remove spaces, ensure consistent format)
    const normalizedPhone = phoneNumber.replace(/\s+/g, '').trim()
    
    // Store code (expires in 10 minutes)
    storeVerificationCode(normalizedPhone, code, 10)
    
    console.log('Phone verification code stored:', { phoneNumber, normalizedPhone, code })

    // Send SMS via Twilio
    try {
      const { sendVerificationSMS } = await import('@/lib/sms-service')
      await sendVerificationSMS(phoneNumber, code)
    } catch (error) {
      console.error('SMS sending error:', error)
      // Continue even if SMS fails (for development)
      console.log(`SMS verification code for ${phoneNumber}: ${code}`)
    }

    return NextResponse.json({ success: true, message: 'Code sent to phone' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send code' }, { status: 400 })
  }
}

