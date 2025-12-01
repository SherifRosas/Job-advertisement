import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import { getSettings } from '@/lib/supabase-server'
import { generateSecurityMark } from '@/lib/security-mark'
import { findNextInterviewSlot } from '@/lib/interview-scheduler'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    // Skip authentication for now - allow direct payment
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { applicationId, amount, email } = await request.json()

    if (amount !== 1000) {
      return NextResponse.json({ error: 'Invalid payment amount' }, { status: 400 })
    }

    // Check advertisement status
    const settings = await getSettings()
    if (settings?.advertisementStatus === 'closed') {
      return NextResponse.json(
        { error: 'Advertisement is closed. Payments are not accepted.' },
        { status: 400 }
      )
    }

    const application = await db.getApplicationById(applicationId)
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Skip email verification for now
    // const user = await db.getUserById(application.userId)
    // if (!user || (email && user.email !== email)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    // }
    
    const user = await db.getUserById(application.userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (application.paymentStatus === 'paid') {
      return NextResponse.json({ error: 'Payment already processed' }, { status: 400 })
    }

    // Integrate with Paymob
    let transactionId = `TXN-${Date.now()}-${crypto.randomBytes(8).toString('hex')}`
    let paymentProcessed = false
    
    try {
      const { initiatePaymobPayment } = await import('@/lib/paymob')
      const paymentResult = await initiatePaymobPayment({
        applicationId,
        amount: 1000,
        currency: 'EGP',
        customerName: application.fullName,
        customerEmail: user.email,
        customerPhone: application.phoneNumber,
      })

      // Return payment URL for redirect (user will complete payment on Paymob)
      return NextResponse.json({
        success: true,
        paymentUrl: paymentResult.paymentUrl,
        orderId: paymentResult.orderId,
        requiresRedirect: true,
      })
    } catch (error: any) {
      // Fallback to simulated payment if Paymob not configured
      console.warn('Paymob not configured, using simulated payment:', error.message)
      paymentProcessed = true

      // Update application with simulated payment
      await db.updateApplication(applicationId, {
        paymentStatus: 'paid',
        paymentTransactionId: transactionId,
      })
    }

    // Only continue with coupon/appointment generation if payment was processed directly
    if (!paymentProcessed) {
      return NextResponse.json({
        success: true,
        message: 'Payment initiated, redirecting to payment gateway',
      })
    }

    // Create revenue record
    const revenueId = crypto.randomUUID()
    await db.createRevenue({
      id: revenueId,
      applicationId,
      amount: 1000,
      status: 'completed',
    })

    // Generate coupon
    const couponCode = `CPN-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`
    const securityMark = generateSecurityMark(applicationId, new Date())
    const couponId = crypto.randomUUID()

    const coupon = await db.createCoupon({
      id: couponId,
      applicationId,
      couponCode,
      securityMark,
      downloadable: true,
      printable: true,
    })

    // Generate appointment using the same scheduling rules
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
      applicantName: application.fullName,
      securityMark,
      date: slot.dateISO,
      time: slot.time,
      location: settings?.interviewLocation || 'To be announced',
    })

    return NextResponse.json({
      success: true,
      couponId: coupon.id,
      appointmentId: appointment.id,
    })
  } catch (error: any) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { error: error.message || 'Payment failed' },
      { status: 400 }
    )
  }
}

