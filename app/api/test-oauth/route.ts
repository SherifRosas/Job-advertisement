import { NextResponse } from 'next/server'

export async function GET() {
  const config = {
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID ? 
      `${process.env.GOOGLE_CLIENT_ID.substring(0, 20)}...` : 'MISSING',
    nextAuthUrl: process.env.NEXTAUTH_URL || 'MISSING',
    redirectUri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/callback/google`,
  }

  return NextResponse.json(config, { status: 200 })
}


