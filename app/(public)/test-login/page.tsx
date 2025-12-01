'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function TestLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('test@example.com')
  const [name, setName] = useState('Test User')
  const [phoneNumber, setPhoneNumber] = useState('+201234567890')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleCreateTestUser = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/test-user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, phoneNumber }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create test user')
      }

      setSuccess('Test user created successfully!')
      
      // Auto-login with credentials provider
      setTimeout(async () => {
        try {
          const result = await signIn('credentials', {
            email: email,
            password: 'test123', // Dummy password for test users
            redirect: false,
          })

          if (result?.ok) {
            router.push('/verify')
          } else {
            // If credentials don't work, just redirect to verify page
            // The user is already created in database
            router.push('/verify')
          }
        } catch (err) {
          // Even if login fails, redirect to verify
          router.push('/verify')
        }
      }, 1000)
    } catch (err: any) {
      setError(err.message || 'Failed to create test user')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Test Login</h1>
        <p className="text-center text-gray-600 mb-8">Create test user (bypasses OAuth)</p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-red-700 font-semibold">Error</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <p className="text-green-700 font-semibold">Success</p>
            <p className="text-green-600 text-sm mt-1">{success}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="test@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Test User"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (optional)
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+201234567890"
            />
          </div>

          <button
            onClick={handleCreateTestUser}
            disabled={loading || !email}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Test User & Login'}
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            This is a development feature to bypass OAuth for testing.
            <br />
            Test users are auto-verified (email and phone).
          </p>
        </div>
      </div>
    </div>
  )
}

