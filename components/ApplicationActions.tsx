'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Application {
  id: string
  fullName: string
  user: { email: string }
  paymentStatus: string
  selectionStatus: string
}

export default function ApplicationActions({ application }: { application: Application }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSelect = async () => {
    if (!confirm(`Select ${application.fullName}?`)) return

    setLoading(true)
    try {
      const response = await fetch('/api/admin/selection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: application.id }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to select applicant')
      }
    } catch (error) {
      alert('Error selecting applicant')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleSelect}
        disabled={loading || application.selectionStatus === 'selected'}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
      >
        {application.selectionStatus === 'selected' ? 'Selected' : 'Select'}
      </button>
    </div>
  )
}


