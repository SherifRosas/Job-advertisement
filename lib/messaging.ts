import { prisma } from './db'

export type MessageType = 'payment_reminder' | 'interview_reminder' | 'selection_notification'

export interface MessageData {
  userId: string
  applicationId?: string
  type: MessageType
  content: string
}

export async function sendMessage(data: MessageData) {
  try {
    // Create message record
    const message = await prisma.message.create({
      data: {
        userId: data.userId,
        applicationId: data.applicationId,
        type: data.type,
        content: data.content,
        sentAt: new Date(),
        status: 'sent',
      },
    })

    // Send email/SMS based on message type
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (data.type === 'payment_reminder') {
      const { sendPaymentReminderSMS } = await import('./sms-service')
      if (user.phoneNumber) {
        await sendPaymentReminderSMS(user.phoneNumber, user.name || 'Applicant')
      }
    } else if (data.type === 'interview_reminder') {
      const application = data.applicationId
        ? await prisma.application.findUnique({
            where: { id: data.applicationId },
            include: { appointment: true },
          })
        : null

      if (application?.appointment && user.phoneNumber) {
        const { sendInterviewReminderSMS } = await import('./sms-service')
        await sendInterviewReminderSMS(
          user.phoneNumber,
          application.fullName,
          new Date(application.appointment.date).toLocaleDateString(),
          application.appointment.time,
          application.appointment.location
        )
      }
    } else if (data.type === 'selection_notification') {
      const { sendSelectionEmail } = await import('./email-service')
      const application = data.applicationId
        ? await prisma.application.findUnique({
            where: { id: data.applicationId },
          })
        : null

      if (application) {
        await sendSelectionEmail(user.email, application.fullName)
      }
    }

    return message
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

export async function sendPaymentReminders() {
  try {
    // Find users who logged in but haven't paid
    const users = await prisma.user.findMany({
      where: {
        emailVerified: true,
        phoneVerified: true,
      },
      include: {
        applications: {
          where: {
            paymentStatus: 'pending',
          },
        },
      },
    })

    for (const user of users) {
      if (user.applications.length > 0) {
        // Check if reminder was already sent (within last 24 hours)
        const recentReminder = await prisma.message.findFirst({
          where: {
            userId: user.id,
            type: 'payment_reminder',
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        })

        if (!recentReminder) {
          await sendMessage({
            userId: user.id,
            applicationId: user.applications[0].id,
            type: 'payment_reminder',
            content: `Dear ${user.name || 'Applicant'}, please complete your payment of 1,000 EGP to proceed with your application.`,
          })
        }
      }
    }
  } catch (error) {
    console.error('Error sending payment reminders:', error)
  }
}

export async function sendInterviewReminders() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        application: {
          include: {
            user: true,
          },
        },
      },
    })

    for (const appointment of appointments) {
      const appointmentDate = new Date(appointment.date)
      const now = new Date()
      const daysUntil = Math.floor((appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

      // Send reminder 1 day before
      if (daysUntil === 1) {
        const recentReminder = await prisma.message.findFirst({
          where: {
            userId: appointment.application.userId,
            type: 'interview_reminder',
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        })

        if (!recentReminder) {
          await sendMessage({
            userId: appointment.application.userId,
            applicationId: appointment.applicationId,
            type: 'interview_reminder',
            content: `Reminder: Your interview is scheduled for ${appointmentDate.toLocaleDateString()} at ${appointment.time}. Location: ${appointment.location}`,
          })
        }
      }
    }
  } catch (error) {
    console.error('Error sending interview reminders:', error)
  }
}

export async function sendSelectionNotification(applicationId: string) {
  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { user: true },
    })

    if (!application) {
      throw new Error('Application not found')
    }

    await sendMessage({
      userId: application.userId,
      applicationId,
      type: 'selection_notification',
      content: `Congratulations ${application.fullName}! You have been selected for the Financial Accounts Manager position. We will contact you soon with next steps.`,
    })

    await prisma.application.update({
      where: { id: applicationId },
      data: {
        selectionEmailSent: true,
        selectionEmailSentAt: new Date(),
      },
    })
  } catch (error) {
    console.error('Error sending selection notification:', error)
    throw error
  }
}

