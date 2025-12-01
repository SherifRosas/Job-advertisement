import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = (token as any)?.role === 'admin'
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isAdminLogin = req.nextUrl.pathname === '/admin/login'

    // Debug logging
    console.log('Middleware - Request:', {
      path: req.nextUrl.pathname,
      hasToken: !!token,
      tokenRole: (token as any)?.role,
      tokenKeys: token ? Object.keys(token) : [],
      isAdmin,
      isAdminRoute,
      isAdminLogin,
    })

    // Allow access to admin login page
    if (isAdminLogin) {
      return NextResponse.next()
    }

    // Redirect non-admin users trying to access admin routes to login
    if (isAdminRoute && !isAdmin) {
      console.log('Middleware - Redirecting to login (not admin)')
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public routes
        if (!req.nextUrl.pathname.startsWith('/admin')) {
          return true
        }
        // Allow admin login page without authentication
        if (req.nextUrl.pathname === '/admin/login') {
          return true
        }
        
        // Debug logging
        console.log('Middleware - Authorized check:', {
          path: req.nextUrl.pathname,
          hasToken: !!token,
          tokenRole: (token as any)?.role,
          tokenKeys: token ? Object.keys(token) : [],
          isAuthorized: (token as any)?.role === 'admin',
        })
        
        // If no token, allow through (will be caught by page-level check)
        if (!token) {
          console.log('Middleware - No token, allowing through for page-level check')
          return true
        }
        
        // Require admin for other admin routes
        const isAuthorized = (token as any)?.role === 'admin'
        if (!isAuthorized) {
          console.log('Middleware - Not authorized, token role:', (token as any)?.role)
        }
        return isAuthorized
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}


