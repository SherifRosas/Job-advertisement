// Email service integration (SendGrid or Resend)

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const emailService = process.env.EMAIL_SERVICE || 'sendgrid'
    const apiKey = process.env.EMAIL_SERVICE_API_KEY
    const fromEmail = process.env.EMAIL_FROM || 'noreply@education.gov.eg'

    if (!apiKey) {
      console.warn('Email service not configured. Email would be sent to:', options.to)
      console.log('Subject:', options.subject)
      console.log('Body:', options.text || options.html)
      return false
    }

    if (emailService === 'sendgrid') {
      const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(apiKey)

      await sgMail.send({
        to: options.to,
        from: fromEmail,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ''),
      })

      return true
    } else if (emailService === 'resend') {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: options.to,
          subject: options.subject,
          html: options.html,
        }),
      })

      return response.ok
    }

    return false
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

export async function sendVerificationEmail(email: string, code: string): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: 'Email Verification Code - Ministry of Education',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="color: #2563eb; font-size: 32px; text-align: center;">${code}</h1>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `,
    text: `Your verification code is: ${code}. This code will expire in 10 minutes.`,
  })
}

export async function sendSelectionEmail(email: string, applicantName: string): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: 'Congratulations! You Have Been Selected - Ministry of Education',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Congratulations ${applicantName}!</h2>
        <p>We are pleased to inform you that you have been selected for the Financial Accounts Manager position at the Egyptian Ministry of Education.</p>
        <p>We will contact you soon with further details and next steps.</p>
        <p>Thank you for your interest in joining our team.</p>
        <p>Best regards,<br>Ministry of Education</p>
      </div>
    `,
    text: `Congratulations ${applicantName}! You have been selected for the Financial Accounts Manager position. We will contact you soon with further details.`,
  })
}

export async function sendQRCodeEmail(email: string, qrCode: string, qrCodeImage: string): Promise<boolean> {
  return sendEmail({
    to: email,
    subject: 'Advertisement Reactivation QR Code - Ministry of Education',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Advertisement Reactivation QR Code</h2>
        <p>The advertisement has been closed. To reactivate it, please use the QR code below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <img src="${qrCodeImage}" alt="QR Code" style="max-width: 300px;" />
        </div>
        <p><strong>QR Code:</strong> <code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${qrCode}</code></p>
        <p>This QR code will expire in 30 days.</p>
        <p><strong>Important:</strong> Keep this QR code secure. You will need it along with Gmail authentication to reactivate the advertisement.</p>
      </div>
    `,
    text: `Advertisement Reactivation QR Code: ${qrCode}. This code will expire in 30 days.`,
  })
}


