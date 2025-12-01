'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SendMessagesButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSendReminders = async (type: 'payment_reminders' | 'interview_reminders') => {
    if (!confirm(`Send ${type === 'payment_reminders' ? 'payment' : 'interview'} reminders to all eligible users?`)) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      })

      if (response.ok) {
        alert('Messages sent successfully!')
        router.refresh()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to send messages')
      }
    } catch (error) {
      alert('Error sending messages')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleSendReminders('payment_reminders')}
        disabled={loading}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        Send Payment Reminders
      </button>
      <button
        onClick={() => handleSendReminders('interview_reminders')}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        Send Interview Reminders
      </button>
    </div>
  )
}


