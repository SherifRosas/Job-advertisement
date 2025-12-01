import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSettings, supabaseServer } from '@/lib/supabase-server'
import { db } from '@/lib/supabase'
import { generateQRCode } from '@/lib/qr-code'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await getSettings()
    if (!settings) {
      return NextResponse.json({ error: 'Settings not found' }, { status: 404 })
    }

    if (settings.advertisementStatus === 'closed') {
      return NextResponse.json({ error: 'Advertisement already closed' }, { status: 400 })
    }

    // Generate QR code
    const qrResult = await generateQRCode(settings.id)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // 30 days expiration

    // Update settings
    await db.updateSettings({
      advertisementStatus: 'closed',
      closedAt: new Date().toISOString(),
      closedBy: session.user?.email || 'admin',
      reactivationQrCode: qrResult.code,
      qrCodeExpiresAt: expiresAt.toISOString(),
      qrCodeUsed: false,
    })

    // Send QR code to admin Gmail
    const adminGmail = settings.adminGmail || process.env.ADMIN_GMAIL || 'sherifrosas.ai@gmail.com'
    try {
      const { sendQRCodeEmail } = await import('@/lib/email-service')
      await sendQRCodeEmail(adminGmail, qrResult.code, qrResult.image)
    } catch (error) {
      console.error('Error sending QR code email:', error)
      // Log for manual retrieval if email fails
      console.log(`QR Code for reactivation: ${qrResult.code}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Advertisement closed. QR code sent to Gmail.',
      qrCode: qrResult.code, // In production, don't return this
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to close' }, { status: 400 })
  }
}

