import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Ensure this route is properly exported for Next.js 14 App Router
export const dynamic = 'force-dynamic'

