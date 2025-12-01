import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSettings } from '@/lib/supabase-server'
import { db } from '@/lib/supabase'
import { verifyQRCode } from '@/lib/qr-code'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify Gmail matches admin Gmail
    const adminGmail = process.env.ADMIN_GMAIL || 'sherifrosas.ai@gmail.com'
    if (session.user?.email !== adminGmail) {
      return NextResponse.json(
        { error: 'Gmail authentication required. Please login with the admin Gmail.' },
        { status: 403 }
      )
    }

    const { qrCode } = await request.json()
    if (!qrCode) {
      return NextResponse.json({ error: 'QR code required' }, { status: 400 })
    }

    const settings = await getSettings()
    if (!settings) {
      return NextResponse.json({ error: 'Settings not found' }, { status: 404 })
    }

    if (settings.advertisementStatus !== 'closed') {
      return NextResponse.json({ error: 'Advertisement is not closed' }, { status: 400 })
    }

    if (settings.qrCodeUsed) {
      return NextResponse.json({ error: 'QR code has already been used' }, { status: 400 })
    }

    if (!settings.reactivationQrCode) {
      return NextResponse.json({ error: 'No QR code found' }, { status: 400 })
    }

    // Verify QR code
    const isValid = verifyQRCode(qrCode, settings.id)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired QR code' }, { status: 400 })
    }

    // Check expiration
    if (settings.qrCodeExpiresAt && new Date() > new Date(settings.qrCodeExpiresAt)) {
      return NextResponse.json({ error: 'QR code has expired' }, { status: 400 })
    }

    // Reactivate advertisement
    await db.updateSettings({
      advertisementStatus: 'active',
      qrCodeUsed: true,
      closedAt: null,
      closedBy: null,
    })

    return NextResponse.json({
      success: true,
      message: 'Advertisement reactivated successfully',
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to reactivate' }, { status: 400 })
  }
}


