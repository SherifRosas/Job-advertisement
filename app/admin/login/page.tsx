'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function AdminLoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already logged in as admin
  useEffect(() => {
    if (status === 'authenticated' && (session?.user as any)?.role === 'admin') {
      router.push('/admin')
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        console.error('Login error:', result.error)
        setError(`Login failed: ${result.error}. Please check your credentials.`)
        setLoading(false)
      } else if (result?.ok) {
        console.log('Login successful, redirecting...')
        // Force a full page reload to ensure session is available
        // Using a longer delay to ensure NextAuth has time to set the session cookie
        setTimeout(() => {
          console.log('Redirecting to /admin...')
          // Force full page reload with cache bypass
          window.location.replace('/admin')
        }, 500)
      } else {
        console.error('Login result:', result)
        setError('Login failed. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
        <p className="text-center text-gray-600 mb-8">تسجيل دخول المدير</p>

        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-blue-700 text-sm font-semibold mb-2">Default Admin Credentials:</p>
          <p className="text-blue-600 text-xs">Email: <code className="bg-blue-100 px-1 rounded">admin@example.com</code></p>
          <p className="text-blue-600 text-xs">Password: <code className="bg-blue-100 px-1 rounded">admin123</code></p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="admin123"
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}


