'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CloseAdvertisementButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClose = async () => {
    if (!confirm('Are you sure you want to close the advertisement? This will terminate all access and payments. A QR code will be sent to your Gmail for reactivation.')) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/advertisement/close', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Advertisement closed. QR code sent to your Gmail.')
        router.refresh()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to close advertisement')
      }
    } catch (error) {
      alert('Error closing advertisement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClose}
      disabled={loading}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
    >
      {loading ? 'Closing...' : 'Close Advertisement'}
    </button>
  )
}


