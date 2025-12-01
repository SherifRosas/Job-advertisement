import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  return NextResponse.json({
    hasSession: !!session,
    user: session?.user || null,
    userRole: (session?.user as any)?.role || null,
    userId: (session?.user as any)?.id || null,
    userEmail: session?.user?.email || null,
    fullSession: session,
  })
}

