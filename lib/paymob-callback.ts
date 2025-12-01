import { prisma } from './db'
import { generateSecurityMark } from './security-mark'
import crypto from 'crypto'

export async function processPaymobCallback(callbackData: any) {
  try {
    // Verify HMAC if provided
    const hmacSecret = process.env.PAYMOB_HMAC_SECRET
    if (hmacSecret && callbackData.hmac) {
      const calculatedHmac = crypto
        .createHmac('sha512', hmacSecret)
        .update(JSON.stringify(callbackData))
        .digest('hex')
      
      if (calculatedHmac !== callbackData.hmac) {
        throw new Error('Invalid HMAC signature')
      }
    }

    // Extract payment information
    const obj = callbackData.obj || callbackData
    const transactionId = obj.id?.toString() || obj.transaction_id
    const orderId = obj.order?.id?.toString() || obj.order_id
    const amount = obj.amount_cents ? obj.amount_cents / 100 : obj.amount || 1000
    const success = obj.success === true || obj.success === 'true' || obj.status === 'success'

    if (!success) {
      throw new Error('Payment was not successful')
    }

    // Find application
    let application = null
    if (orderId) {
      application = await prisma.application.findFirst({
        where: {
          OR: [
            { id: orderId },
            { paymentTransactionId: transactionId },
          ],
        },
        include: { user: true },
      })
    }

    if (!application) {
      throw new Error('Application not found for this payment')
    }

    if (application.paymentStatus === 'paid') {
      return { success: true, message: 'Payment already processed' }
    }

    // Update application
    await prisma.application.update({
      where: { id: application.id },
      data: {
        paymentStatus: 'paid',
        paymentTransactionId: transactionId,
      },
    })

    // Create revenue record
    await prisma.revenue.create({
      data: {
        applicationId: application.id,
        amount: amount,
        status: 'completed',
      },
    })

    // Generate coupon
    const couponCode = `CPN-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`
    const securityMark = generateSecurityMark(application.id, new Date())

    const coupon = await prisma.coupon.create({
      data: {
        applicationId: application.id,
        couponCode,
        securityMark,
      },
    })

    // Generate appointment
    const settings = await prisma.settings.findFirst()
    const appointmentDate = new Date()
    appointmentDate.setDate(appointmentDate.getDate() + 7)

    const appointment = await prisma.appointment.create({
      data: {
        applicationId: application.id,
        applicantName: application.fullName,
        securityMark,
        date: appointmentDate,
        time: '10:00 AM',
        location: settings?.interviewLocation || 'To be announced',
      },
    })

    return {
      success: true,
      applicationId: application.id,
      couponId: coupon.id,
      appointmentId: appointment.id,
    }
  } catch (error: any) {
    console.error('Paymob callback processing error:', error)
    throw error
  }
}


