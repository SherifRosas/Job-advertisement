'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import ApplicationProgress from '@/components/ApplicationProgress'

export default function VerifyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [emailCode, setEmailCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneCode, setPhoneCode] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [loading, setLoading] = useState(false)

  // Redirect to test login if not authenticated (in useEffect to avoid render warning)
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/test-login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>
  }

  const handleSendEmailCode = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/verify/email', {
        method: 'GET',
      })

      const data = await response.json()
      if (data.success) {
        alert('Verification code sent to your email. Check your terminal for the code.')
      } else {
        alert(data.error || 'Error sending code')
      }
    } catch (error) {
      alert('Error sending verification code')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailVerification = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/verify/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user?.email,
          code: emailCode,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setEmailVerified(true)
      } else {
        alert(data.error || 'Invalid verification code')
      }
    } catch (error) {
      alert('Error verifying email')
    } finally {
      setLoading(false)
    }
  }

  const handleSendPhoneCode = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/verify/phone/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      })

      const data = await response.json()
      if (data.success) {
        alert('Verification code sent to your phone')
      } else {
        alert(data.error || 'Error sending code')
      }
    } catch (error) {
      alert('Error sending verification code')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneVerification = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/verify/phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          code: phoneCode,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setPhoneVerified(true)
        if (emailVerified) {
          router.push('/apply')
        }
      } else {
        alert(data.error || 'Invalid verification code')
      }
    } catch (error) {
      alert('Error verifying phone')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <ApplicationProgress currentStep="verify" className="mb-8" />
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Verify Your Account</h1>
          <p className="text-center text-gray-600 mb-8">التحقق من حسابك</p>

        {/* Email Verification */}
        <div className="mb-8 p-6 border-2 rounded-lg" style={{ borderColor: emailVerified ? '#10b981' : '#e5e7eb' }}>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            {emailVerified ? '✅' : '1.'} Email Verification
          </h2>
          {!emailVerified ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Email: <strong>{session.user?.email}</strong>
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handleSendEmailCode}
                  disabled={loading}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  Send Code
                </button>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                />
                <button
                  onClick={handleEmailVerification}
                  disabled={loading || emailCode.length !== 6}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  Verify
                </button>
              </div>
            </div>
          ) : (
            <p className="text-green-600 font-semibold">Email verified successfully!</p>
          )}
        </div>

        {/* Phone Verification */}
        <div className="mb-8 p-6 border-2 rounded-lg" style={{ borderColor: phoneVerified ? '#10b981' : '#e5e7eb' }}>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            {phoneVerified ? '✅' : '2.'} Phone Verification
          </h2>
          {!phoneVerified ? (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number (+20XXXXXXXXXX)"
                  autoComplete="tel"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                />
                <button
                  onClick={handleSendPhoneCode}
                  disabled={loading || !phoneNumber}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  Send Code
                </button>
              </div>
              {phoneNumber && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <button
                    onClick={handlePhoneVerification}
                    disabled={loading || phoneCode.length !== 6}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                  >
                    Verify
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-green-600 font-semibold">Phone verified successfully!</p>
          )}
        </div>

        {emailVerified && phoneVerified && (
          <div className="text-center">
            <button
              onClick={() => router.push('/apply')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg"
            >
              Continue to Application →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

