import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const application = await db.getApplicationById(id)

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Get user, coupon, and appointment
    const user = await db.getUserById(application.userId)
    const coupon = await db.getCouponByApplicationId(application.id)
    const appointment = await db.getAppointmentByApplicationId(application.id)

    // Check if user owns this application or is admin
    const isOwner = user?.email === session.user.email
    const isAdmin = (session.user as any)?.role === 'admin'

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      application: {
        ...application,
        user,
        coupon,
        appointment,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch application' },
      { status: 400 }
    )
  }
}


