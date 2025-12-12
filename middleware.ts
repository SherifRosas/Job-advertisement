import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Helper function to check if role is admin (main-admin or admin)
function isAdminRole(role: string | undefined): boolean {
  return role === 'admin' || role === 'main-admin'
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const role = (token as any)?.role
    const isAdmin = isAdminRole(role)
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isAdminLogin = req.nextUrl.pathname === '/admin/login'

    // Debug logging
    console.log('Middleware - Request:', {
      path: req.nextUrl.pathname,
      hasToken: !!token,
      tokenRole: role,
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
        const role = (token as any)?.role
        const isAuthorized = isAdminRole(role)
        console.log('Middleware - Authorized check:', {
          path: req.nextUrl.pathname,
          hasToken: !!token,
          tokenRole: role,
          tokenKeys: token ? Object.keys(token) : [],
          isAuthorized,
        })
        
        // If no token, allow through (will be caught by page-level check)
        if (!token) {
          console.log('Middleware - No token, allowing through for page-level check')
          return true
        }
        
        // Require admin or main-admin for other admin routes
        if (!isAuthorized) {
          console.log('Middleware - Not authorized, token role:', role)
        }
        return isAuthorized
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}


