import { NextRequest, NextResponse } from 'next/server'

// Placeholder endpoint for sending reminders.
// In this deployment, real SMS/email reminder logic is disabled to simplify the stack.

export async function POST(_request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'Message send endpoint placeholder: no reminders sent in this deployment.',
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send messages' }, { status: 400 })
  }
}


