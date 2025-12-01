import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sendPaymentReminders, sendInterviewReminders } from '@/lib/messaging'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type } = await request.json()

    if (type === 'payment_reminders') {
      await sendPaymentReminders()
      return NextResponse.json({ success: true, message: 'Payment reminders sent' })
    } else if (type === 'interview_reminders') {
      await sendInterviewReminders()
      return NextResponse.json({ success: true, message: 'Interview reminders sent' })
    } else {
      return NextResponse.json({ error: 'Invalid message type' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send messages' }, { status: 400 })
  }
}


