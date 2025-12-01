// SMS service integration (Twilio)

export interface SMSOptions {
  to: string
  message: string
}

export async function sendSMS(options: SMSOptions): Promise<boolean> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !fromNumber) {
      console.warn('SMS service not configured. SMS would be sent to:', options.to)
      console.log('Message:', options.message)
      return false
    }

    const twilio = require('twilio')
    const client = twilio(accountSid, authToken)

    await client.messages.create({
      body: options.message,
      from: fromNumber,
      to: options.to,
    })

    return true
  } catch (error) {
    console.error('SMS sending error:', error)
    return false
  }
}

export async function sendVerificationSMS(phoneNumber: string, code: string): Promise<boolean> {
  return sendSMS({
    to: phoneNumber,
    message: `Your verification code is: ${code}. This code will expire in 10 minutes. - Ministry of Education`,
  })
}

export async function sendPaymentReminderSMS(phoneNumber: string, applicantName: string): Promise<boolean> {
  return sendSMS({
    to: phoneNumber,
    message: `Dear ${applicantName}, please complete your payment of 1,000 EGP to proceed with your application. - Ministry of Education`,
  })
}

export async function sendInterviewReminderSMS(
  phoneNumber: string,
  applicantName: string,
  date: string,
  time: string,
  location: string
): Promise<boolean> {
  return sendSMS({
    to: phoneNumber,
    message: `Reminder: ${applicantName}, your interview is scheduled for ${date} at ${time}. Location: ${location}. - Ministry of Education`,
  })
}


