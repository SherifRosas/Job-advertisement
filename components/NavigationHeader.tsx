'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function NavigationHeader() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            
            {session && (
              <>
                <Link
                  href="/status"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/status') 
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  My Applications
                </Link>
              </>
            )}
            
            <Link
              href="/help"
              className={`text-sm font-medium transition-colors ${
                isActive('/help') 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Help
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <span className="text-sm text-gray-600">
                {session.user?.email}
              </span>
            ) : (
              <Link
                href="/test-login"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

