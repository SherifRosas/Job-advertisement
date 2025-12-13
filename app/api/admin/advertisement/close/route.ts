import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSettings, supabaseServer } from '@/lib/supabase-server'
import { db } from '@/lib/supabase'
import { generateQRCode } from '@/lib/qr-code'

export async function POST(request: NextRequest) {
  try {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6259713f-96f1-450b-bc8b-be2703a50b4c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:10',message:'Before getServerSession',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    const session = await getServerSession(authOptions)
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6259713f-96f1-450b-bc8b-be2703a50b4c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:11',message:'After getServerSession',data:{sessionIsNull:session===null,sessionExists:!!session,hasUser:!!session?.user},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6259713f-96f1-450b-bc8b-be2703a50b4c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:14',message:'Before session null check',data:{sessionIsNull:session===null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    if (!session) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6259713f-96f1-450b-bc8b-be2703a50b4c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:16',message:'Session is null, returning unauthorized',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6259713f-96f1-450b-bc8b-be2703a50b4c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:20',message:'Before accessing session.user',data:{sessionExists:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const userRole = (session.user as any)?.role
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6259713f-96f1-450b-bc8b-be2703a50b4c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:22',message:'After accessing session.user',data:{userRole},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6259713f-96f1-450b-bc8b-be2703a50b4c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:24',message:'Before role check',data:{userRole},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    if (userRole !== 'admin' && userRole !== 'main-admin') {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6259713f-96f1-450b-bc8b-be2703a50b4c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:26',message:'Unauthorized branch - invalid role',data:{userRole},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
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
