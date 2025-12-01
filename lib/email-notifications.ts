import crypto from 'crypto'
import { db } from './supabase'

interface ApplicationConfirmationParams {
  userId: string
  applicationId: string
  email: string
  fullName: string
  couponCode: string
  appointmentDate: string
  appointmentTime: string
  appointmentLocation: string
}

/**
 * Log an application confirmation "email" into the messages table.
 * This can later be wired to a real email provider (SendGrid/Resend).
 */
export async function sendApplicationConfirmation(params: ApplicationConfirmationParams) {
  const {
    userId,
    applicationId,
    email,
    fullName,
    couponCode,
    appointmentDate,
    appointmentTime,
    appointmentLocation,
  } = params

  const messageId = crypto.randomUUID()

  const humanDate = new Date(appointmentDate).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  const content = [
    `Application confirmation for ${fullName} <${email}>`,
    '',
    `Coupon Code: ${couponCode}`,
    `Interview Date & Time: ${humanDate} (${appointmentTime})`,
    `Location: ${appointmentLocation}`,
    '',
    'Please bring:',
    '- Original National ID',
    '- Original certificates and qualifications',
    '- Printed coupon',
    '- Recent personal photo',
  ].join('\n')

  // Store in Supabase messages table (acts as an email log)
  await db.createMessage({
    id: messageId,
    userId,
    applicationId,
    type: 'application_confirmation',
    status: 'queued',
    content,
    sentAt: new Date().toISOString(),
  })

  // For now, also log to server console for debugging
  console.log('Application confirmation message logged:', {
    messageId,
    userId,
    applicationId,
    email,
  })
}


