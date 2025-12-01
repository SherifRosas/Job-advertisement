import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Skip authentication - use email from query parameter
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Get user by email
    const user = await db.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ 
        success: true, 
        applications: [],
        message: 'No applications found for this email' 
      })
    }

    // Get all applications for this user
    const applications = await db.getAllApplications()
    const userApplications = applications.filter(app => app.userId === user.id)

    // Enrich with coupon and appointment data
    const enrichedApplications = await Promise.all(
      userApplications.map(async (app) => {
        let coupon = null
        let appointment = null

        try {
          // Get coupon if exists
          coupon = await db.getCouponByApplicationId(app.id)

          // Get appointment if exists
          appointment = await db.getAppointmentByApplicationId(app.id)
        } catch (error) {
          // Not found is OK, just continue
          console.error('Error fetching related data:', error)
        }

        return {
          id: app.id,
          fullName: app.fullName,
          paymentStatus: app.paymentStatus,
          selectionStatus: app.selectionStatus || 'pending',
          aiVerified: app.aiVerified || false,
          createdAt: app.createdAt,
          coupon: coupon ? {
            id: coupon.id,
            couponCode: coupon.couponCode,
            downloadable: coupon.downloadable,
            printable: coupon.printable,
          } : null,
          appointment: appointment ? {
            id: appointment.id,
            date: appointment.date,
            time: appointment.time,
            location: appointment.location,
          } : null,
        }
      })
    )

    return NextResponse.json({
      success: true,
      applications: enrichedApplications,
    })
  } catch (error: any) {
    console.error('Error fetching user applications:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

