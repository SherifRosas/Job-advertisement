'use client'

import { useRouter } from 'next/navigation'
import ApplicationProgress from '@/components/ApplicationProgress'

export default function PaymentPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Payment step is skipped in the simplified flow; show coupon as the final step */}
        <ApplicationProgress currentStep="coupon" className="mb-8" />

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Payment Skipped</h1>
          <p className="text-center text-gray-600 mb-6">تم تخطي خطوة الدفع</p>

          <div className="space-y-4">
            <p className="text-sm text-gray-700 text-center" dir="rtl">
              في هذا الإصدار من النظام، لا توجد حاجة للدفع. يتم إنشاء الكوبون مباشرة بعد التقديم.
            </p>
            <p className="text-sm text-gray-600 text-center">
              In this deployment, payment is skipped. Your coupon is generated immediately after submitting the application.
            </p>

            <button
              onClick={() => router.push('/')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              العودة إلى الصفحة الرئيسية / Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


