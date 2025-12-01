import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/supabase'
import { verifyApplicationData } from '@/lib/ai-verification'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { applicationId } = await request.json()

    const application = await db.getApplicationById(applicationId)
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    const user = await db.getUserById(application.userId)
    if (!user || user.email !== session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Perform AI verification
    const verificationResult = await verifyApplicationData(
      {
        fullName: application.fullName,
        address: application.address,
        phoneNumber: application.phoneNumber,
      },
      application.nationalIdFront,
      application.nationalIdBack
    )

    // Update application with verification results
    await db.updateApplication(applicationId, {
      aiVerified: verificationResult.verified,
      aiVerificationNotes: verificationResult.notes.join('; '),
    })

    return NextResponse.json({
      success: true,
      verified: verificationResult.verified,
      notes: verificationResult.notes,
      confidence: verificationResult.confidence,
    })
  } catch (error: any) {
    console.error('AI verification error:', error)
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 400 }
    )
  }
}


