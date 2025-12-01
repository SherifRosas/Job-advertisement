import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { applicationId } = await request.json()

    const application = await db.getApplicationById(applicationId)
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Update selection status
    await db.updateApplication(applicationId, {
      selectionStatus: 'selected',
      selectedAt: new Date().toISOString(),
      selectedBy: session.user?.email || 'admin',
    })

    // Send selection email notification
    try {
      const { sendSelectionNotification } = await import('@/lib/messaging')
      await sendSelectionNotification(applicationId)
    } catch (error) {
      console.error('Error sending selection notification:', error)
      // Continue even if notification fails
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to select' }, { status: 400 })
  }
}

