'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import ApplicationProgress from '@/components/ApplicationProgress'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const applicationId = searchParams.get('applicationId')
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    if (!applicationId) {
      alert('Application ID is missing')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          amount: 1000,
        }),
      })

      const data = await response.json()
      if (data.success) {
        // If Paymob is configured, redirect to payment gateway
        if (data.paymentUrl && data.requiresRedirect) {
          window.location.href = data.paymentUrl
          return
        }
        
        // If simulated payment, redirect to coupon page
        if (data.couponId) {
          router.push(`/coupon/${data.couponId}`)
        } else {
          alert('Payment processed but coupon not generated. Please contact support.')
        }
      } else {
        alert(data.error || 'Payment failed')
      }
    } catch (error) {
      alert('Payment error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!applicationId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Invalid application</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Payment step is skipped in the simplified flow; show coupon as the final step */}
        <ApplicationProgress currentStep="coupon" className="mb-8" />
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Payment</h1>
          <p className="text-center text-gray-600 mb-8">الدفع</p>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Application Fee:</span>
              <span className="font-bold text-lg">1,000 EGP</span>
            </div>
            <p className="text-sm text-gray-600">
              Payment methods: Credit Card, Debit Card, Mobile Wallet, Bank Transfer
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Pay 1,000 EGP / دفع ١٠٠٠ جنيه'}
            </button>

            <p className="text-xs text-center text-gray-500">
              By proceeding, you agree to our Terms of Service
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}


