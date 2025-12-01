import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/supabase'
import { emailVerificationSchema } from '@/lib/validation'
import { verifyCode, deleteVerificationCode, storeVerificationCode, getVerificationCode } from '@/lib/verification-codes'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, code } = emailVerificationSchema.parse(body)

    // Debug logging
    console.log('Email verification attempt:', { email, code, hasStoredCode: !!getVerificationCode(email) })

    // Check if code is valid
    if (!verifyCode(email, code)) {
      const stored = getVerificationCode(email)
      console.log('Code verification failed:', { 
        email, 
        providedCode: code, 
        storedCode: stored?.code, 
        expired: stored ? Date.now() > stored.expires : 'no code' 
      })
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    // Get user and update
    const user = await db.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await db.updateUser(user.id, { emailVerified: true })

    // Clean up
    deleteVerificationCode(email)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const email = session.user.email
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Store code (expires in 10 minutes)
    storeVerificationCode(email, code, 10)

    // Send email via email service
    try {
      const { sendVerificationEmail } = await import('@/lib/email-service')
      await sendVerificationEmail(email, code)
    } catch (error) {
      console.error('Email sending error:', error)
      // Continue even if email fails (for development)
      console.log(`Email verification code for ${email}: ${code}`)
    }

    return NextResponse.json({ success: true, message: 'Code sent to email' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send code' }, { status: 400 })
  }
}

