import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// #region agent log
// Log OAuth config when route is accessed
if (typeof window === 'undefined') {
  const googleClientId = process.env.GOOGLE_CLIENT_ID || ''
  fetch('http://127.0.0.1:7242/ingest/6259713f-96f1-450b-bc8b-be2703a50b4c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'[...nextauth]/route.ts:5',message:'NextAuth handler initialization',data:{hasClientId:!!googleClientId,clientIdLength:googleClientId.length,clientIdPreview:googleClientId.substring(0,50),nextAuthUrl:process.env.NEXTAUTH_URL},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
}
// #endregion

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Ensure this route is properly exported for Next.js 14 App Router
export const dynamic = 'force-dynamic'

