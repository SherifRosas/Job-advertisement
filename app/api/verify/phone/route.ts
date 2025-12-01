import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/supabase'
import { phoneVerificationSchema } from '@/lib/validation'
import { verifyCode, deleteVerificationCode, getVerificationCode } from '@/lib/verification-codes'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { phoneNumber, code } = phoneVerificationSchema.parse(body)

    // Normalize phone number (remove spaces, ensure consistent format)
    const normalizedPhone = phoneNumber.replace(/\s+/g, '').trim()

    // Debug logging
    console.log('Phone verification attempt:', { 
      phoneNumber, 
      normalizedPhone,
      code, 
      hasStoredCode: !!getVerificationCode(normalizedPhone),
      storedCode: getVerificationCode(normalizedPhone)?.code 
    })

    // Check if code is valid (try both original and normalized)
    let isValid = verifyCode(normalizedPhone, code)
    if (!isValid && phoneNumber !== normalizedPhone) {
      // Try with original phone number format
      isValid = verifyCode(phoneNumber, code)
    }

    if (!isValid) {
      const stored = getVerificationCode(phoneNumber)
      console.log('Code verification failed:', { 
        phoneNumber, 
        providedCode: code, 
        storedCode: stored?.code, 
        expired: stored ? Date.now() > stored.expires : 'no code' 
      })
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    // Get user and update
    const user = await db.getUserByEmail(session.user.email)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await db.updateUser(user.id, {
      phoneNumber: normalizedPhone,
      phoneVerified: true,
    })

    // Clean up (try both formats)
    deleteVerificationCode(normalizedPhone)
    if (phoneNumber !== normalizedPhone) {
      deleteVerificationCode(phoneNumber)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 400 })
  }
}


