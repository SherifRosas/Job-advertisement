'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for OAuth error in URL
  useEffect(() => {
    const errorParam = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')
    
    if (errorParam) {
      // Log full error details
      console.error('OAuth Error Details:')
      console.error('Error:', errorParam)
      console.error('Description:', errorDescription || 'No description')
      console.error('Full URL:', window.location.href)
      
      if (errorParam === 'google') {
        setError('Google OAuth configuration error. Please check your Google OAuth settings.')
      } else if (errorParam === 'Configuration') {
        setError('OAuth configuration error. Please check your server configuration.')
      } else if (errorParam === 'AccessDenied') {
        setError('Access denied. Please check OAuth consent screen and test users.')
      } else {
        setError(`Authentication error: ${errorParam}${errorDescription ? ` - ${errorDescription}` : ''}`)
      }
      
      // Clear the error from URL after showing it
      const newUrl = window.location.pathname
      window.history.replaceState({}, '', newUrl)
    }
  }, [searchParams])

  const handleGoogleLogin = async () => {
    setLoading(true)
    console.log('Login button clicked, starting Google OAuth...')
    
    try {
      // Check if NextAuth is available
      if (typeof signIn === 'undefined') {
        console.error('signIn is undefined - NextAuth not initialized')
        setLoading(false)
        alert('Authentication system not initialized. Please check server configuration.')
        return
      }

      // Try signIn with redirect: false to handle manually
      const result = await signIn('google', { 
        callbackUrl: '/verify',
        redirect: false
      })
      
      console.log('signIn result:', result)
      console.log('Result type:', typeof result)
      console.log('Result keys:', result ? Object.keys(result) : 'null/undefined')
      
      // Check if result is undefined or null
      if (result === undefined || result === null) {
        console.error('signIn returned undefined/null - NextAuth API route may not be working')
        console.log('Attempting direct redirect to Google OAuth endpoint...')
        // Fallback: redirect directly to the OAuth endpoint
        window.location.href = '/api/auth/signin/google?callbackUrl=/verify'
        return
      }
      
      // Check result
      if (result?.error) {
        console.error('Login error:', result.error)
        setLoading(false)
        alert(`Login failed: ${result.error}. Please check Google OAuth configuration.`)
        return
      }
      
      // If we have a URL, redirect to it
      if (result?.url) {
        console.log('Redirecting to:', result.url)
        window.location.href = result.url
        return
      }
      
      // If OK but no URL, try direct redirect to Google OAuth
      if (result?.ok) {
        console.log('Result OK but no URL, redirecting to Google OAuth endpoint...')
        window.location.href = '/api/auth/signin/google?callbackUrl=/verify'
        return
      }
      
      // If we get here, something went wrong
      console.error('Unexpected result:', result)
      console.log('Attempting direct redirect as fallback...')
      setLoading(false)
      // Try direct redirect as last resort
      window.location.href = '/api/auth/signin/google?callbackUrl=/verify'
    } catch (error) {
      console.error('Login exception:', error)
      setLoading(false)
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error('Full error details:', error)
      console.log('Attempting direct redirect as fallback after error...')
      // Try direct redirect even on error
      window.location.href = '/api/auth/signin/google?callbackUrl=/verify'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-600 mb-8">تسجيل الدخول</p>
        
        {error && (
          <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <p className="text-yellow-700 font-semibold">⚠️ OAuth Not Configured</p>
            <p className="text-yellow-600 text-sm mt-1">
              Google OAuth is not configured. Please use the test login system instead.
            </p>
          </div>
        )}
        
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-blue-700 font-semibold mb-2">📝 Use Test Login</p>
          <p className="text-blue-600 text-sm mb-4">
            For development and testing, please use the test login system which bypasses OAuth.
          </p>
          <button
            onClick={() => router.push('/test-login')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Go to Test Login →
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-3 transition duration-200 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{loading ? 'Loading...' : 'Continue with Google (Not Configured)'}</span>
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            <strong>Note:</strong> OAuth is disabled for development. Use Test Login instead.
          </p>
        </div>
      </div>
    </div>
  )
}

