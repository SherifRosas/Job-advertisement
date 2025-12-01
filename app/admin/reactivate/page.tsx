'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ReactivatePage() {
  const router = useRouter()
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleReactivate = async () => {
    if (!qrCode.trim()) {
      setError('Please enter the QR code')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/advertisement/reactivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCode }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Advertisement reactivated successfully!')
        router.push('/admin/settings')
      } else {
        setError(data.error || 'Failed to reactivate')
      }
    } catch (error) {
      setError('Error reactivating advertisement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Reactivate Advertisement</h1>
        <p className="text-center text-gray-600 mb-8">إعادة تفعيل الإعلان</p>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            Please authenticate with Gmail and enter the QR code that was sent to your email address.
          </p>
          <p className="text-sm text-gray-600">
            يرجى التحقق من Gmail وإدخال رمز QR المرسل إلى بريدك الإلكتروني
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code
            </label>
            <input
              type="text"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              placeholder="Enter or scan QR code"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono"
            />
          </div>

          <button
            onClick={handleReactivate}
            disabled={loading || !qrCode.trim()}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Reactivating...' : 'Reactivate Advertisement'}
          </button>
        </div>
      </div>
    </div>
  )
}


