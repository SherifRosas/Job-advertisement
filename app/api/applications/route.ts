import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import { getSettings } from '@/lib/supabase-server'
import { applicationSchema } from '@/lib/validation'
import { sendApplicationConfirmation } from '@/lib/email-notifications'
import { findNextInterviewSlot } from '@/lib/interview-scheduler'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    // Skip login/verification for now - allow direct application
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Check if user is verified (SKIPPED FOR NOW)
    // const user = await db.getUserByEmail(session.user.email)
    // if (!user || !user.emailVerified || !user.phoneVerified) {
    //   return NextResponse.json(
    //     { error: 'Please verify your email and phone number first' },
    //     { status: 400 }
    //   )
    // }

    // Check advertisement status
    const settings = await getSettings()
    if (settings?.advertisementStatus === 'closed') {
      return NextResponse.json(
        { error: 'Advertisement is closed' },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    const email = formData.get('email') as string
    const fullName = formData.get('fullName') as string
    const address = formData.get('address') as string
    const phoneNumber = formData.get('phoneNumber') as string
    const requirementsAgreed = formData.get('requirementsAgreed') === 'true'
    const documentsAgreed = formData.get('documentsAgreed') === 'true'
    const nationalIdFront = formData.get('nationalIdFront') as File
    const nationalIdBack = formData.get('nationalIdBack') as File

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Get or create user by email (without verification requirement)
    let user = await db.getUserByEmail(email)
    if (!user) {
      // Create user if doesn't exist
      const userId = crypto.randomUUID()
      user = await db.createUser({
        id: userId,
        email: email,
        emailVerified: false, // Skip verification for now
        phoneVerified: false, // Skip verification for now
        name: fullName,
        phoneNumber: phoneNumber,
      })
    }

    // Validate
    applicationSchema.parse({
      email,
      fullName,
      address,
      phoneNumber,
      requirementsAgreed,
      documentsAgreed,
    })

    if (!nationalIdFront || !nationalIdBack) {
      return NextResponse.json({ error: 'National ID images required' }, { status: 400 })
    }

    // Save files
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, that's OK
    }

    const frontFileName = `${Date.now()}-front-${nationalIdFront.name}`
    const backFileName = `${Date.now()}-back-${nationalIdBack.name}`
    const frontPath = join(uploadsDir, frontFileName)
    const backPath = join(uploadsDir, backFileName)

    const frontBytes = await nationalIdFront.arrayBuffer()
    const backBytes = await nationalIdBack.arrayBuffer()

    await writeFile(frontPath, Buffer.from(frontBytes))
    await writeFile(backPath, Buffer.from(backBytes))

    // Create application
    // Perform AI verification before creating application
    const { verifyApplicationData } = await import('@/lib/ai-verification')
    const verificationResult = await verifyApplicationData(
      {
        fullName,
        address,
        phoneNumber,
      },
      `/uploads/${frontFileName}`,
      `/uploads/${backFileName}`
    )

    // If verification fails, return error
    if (!verificationResult.verified) {
      return NextResponse.json(
        {
          error: 'Verification failed',
          details: verificationResult.notes,
          confidence: verificationResult.confidence,
        },
        { status: 400 }
      )
    }

    const applicationId = crypto.randomUUID()
    const application = await db.createApplication({
      id: applicationId,
      userId: user.id,
      fullName,
      address,
      phoneNumber,
      nationalIdFront: `/uploads/${frontFileName}`,
      nationalIdBack: `/uploads/${backFileName}`,
      requirementsAgreed,
      documentsAgreed,
      aiVerified: verificationResult.verified,
      aiVerificationNotes: verificationResult.notes.join('; '),
      paymentStatus: 'paid', // Skip payment for now - mark as paid
    })

    // Update user with application data if needed
    if (user.name !== fullName || user.phoneNumber !== phoneNumber) {
      await db.updateUser(user.id, {
        name: fullName,
        phoneNumber: phoneNumber,
      })
    }

    // Generate coupon and appointment directly (skip payment)
    const { generateSecurityMark } = await import('@/lib/security-mark')
    const securityMark = generateSecurityMark(applicationId, new Date())
    const couponCode = `CPN-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`
    const couponId = crypto.randomUUID()

    const coupon = await db.createCoupon({
      id: couponId,
      applicationId,
      couponCode,
      securityMark,
      downloadable: true,
      printable: true,
    })

    // Generate appointment using scheduling rules (reuse previously fetched settings)
    const slot = await findNextInterviewSlot()

    if (!slot) {
      return NextResponse.json(
        { error: 'No available interview slots. Please try again later.' },
        { status: 400 }
      )
    }

    const appointmentId = crypto.randomUUID()

    const appointment = await db.createAppointment({
      id: appointmentId,
      applicationId,
      applicantName: fullName,
      securityMark,
      date: slot.dateISO,
      time: slot.time,
      location: settings?.interviewLocation || 'To be announced',
    })

    // Create revenue record (with 0 amount since payment is skipped)
    const revenueId = crypto.randomUUID()
    await db.createRevenue({
      id: revenueId,
      applicationId,
      amount: 0, // Payment skipped
      status: 'completed',
    })

    // Send confirmation "email" (logged to messages table)
    try {
      await sendApplicationConfirmation({
        userId: user.id,
        applicationId,
        email,
        fullName,
        couponCode,
        appointmentDate: appointment.date,
        appointmentTime: appointment.time,
        appointmentLocation: appointment.location,
      })
    } catch (err) {
      console.error('Failed to log application confirmation message:', err)
    }

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      couponId: coupon.id,
      appointmentId: appointment.id,
      message: 'Application submitted successfully. Coupon generated.',
    })
  } catch (error: any) {
    console.error('Application error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit application' },
      { status: 400 }
    )
  }
}


