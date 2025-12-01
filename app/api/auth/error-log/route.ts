import { NextResponse } from 'next/server'

// This endpoint helps diagnose OAuth errors
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  const errorUri = searchParams.get('error_uri')

  // Log the full error details
  console.log('=== OAUTH ERROR DETAILS ===')
  console.log('Error:', error)
  console.log('Error Description:', errorDescription)
  console.log('Error URI:', errorUri)
  console.log('Full URL:', request.url)
  console.log('==========================')

  return NextResponse.json({
    error,
    errorDescription,
    errorUri,
    fullUrl: request.url,
    timestamp: new Date().toISOString(),
    diagnostic: {
      redirectUri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/callback/google`,
      hasClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    },
  })
}

