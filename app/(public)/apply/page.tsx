'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { applicationSchema } from '@/lib/validation'
import ApplicationProgress from '@/components/ApplicationProgress'
import { saveDraftToLocalStorage, loadDraftFromLocalStorage, clearDraft } from '@/lib/draft-save'

export default function ApplyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '', // Add email field for direct application
    address: '',
    phoneNumber: '',
    requirementsAgreed: false,
    documentsAgreed: false,
  })
  const [nationalIdFront, setNationalIdFront] = useState<File | null>(null)
  const [nationalIdBack, setNationalIdBack] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [draftSaved, setDraftSaved] = useState(false)
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Skip login/verification for now - allow direct access
  // if (status === 'loading') {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  // }

  // if (!session) {
  //   // Redirect to test login instead of regular login
  //   router.push('/test-login')
  //   return null
  // }

  // Load draft on mount (using email as identifier)
  // Load draft once on initial mount. We intentionally omit formData from dependencies
  // to avoid overwriting user edits after first load.
  useEffect(() => {
    const email = formData.email || 'anonymous'
    const draft = loadDraftFromLocalStorage(email)
    if (draft) {
      setFormData((prev) => ({
        fullName: draft.fullName || prev.fullName,
        email: prev.email, // Keep email from current form state
        address: draft.address || prev.address,
        phoneNumber: draft.phoneNumber || prev.phoneNumber,
        requirementsAgreed: draft.requirementsAgreed,
        documentsAgreed: draft.documentsAgreed,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-save draft every 30 seconds (using email as identifier)
  useEffect(() => {
    const email = formData.email || 'anonymous'
    
    // Set up auto-save interval
    autoSaveIntervalRef.current = setInterval(() => {
      const saved = saveDraftToLocalStorage(email, formData)
      if (saved) {
        setDraftSaved(true)
        setTimeout(() => setDraftSaved(false), 2000) // Hide message after 2 seconds
      }
    }, 30000) // 30 seconds

    // Cleanup on unmount
    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current)
      }
    }
  }, [formData])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === 'front') {
        setNationalIdFront(file)
      } else {
        setNationalIdBack(file)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate form
      applicationSchema.parse(formData)

      if (!nationalIdFront || !nationalIdBack) {
        throw new Error('Please upload both sides of your National ID')
      }

      // Create FormData
      const formDataToSend = new FormData()
      formDataToSend.append('fullName', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('address', formData.address)
      formDataToSend.append('phoneNumber', formData.phoneNumber)
      formDataToSend.append('requirementsAgreed', formData.requirementsAgreed.toString())
      formDataToSend.append('documentsAgreed', formData.documentsAgreed.toString())
      formDataToSend.append('nationalIdFront', nationalIdFront)
      formDataToSend.append('nationalIdBack', nationalIdBack)

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      // Clear draft after successful submission
      const email = formData.email || 'anonymous'
      clearDraft(email)

      // Skip payment - redirect directly to coupon
      if (data.couponId) {
        router.push(`/coupon/${data.couponId}`)
      } else {
        // Fallback to payment if coupon not generated
        router.push(`/payment?applicationId=${data.applicationId}`)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <ApplicationProgress currentStep="apply" className="mb-8" />
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-center mb-2" dir="rtl">نموذج التقديم</h1>
          <p className="text-center text-gray-600 mb-2">Application Form</p>
          <p className="text-center text-sm text-gray-500 mb-8" dir="rtl">
            يرجى ملء جميع الحقول المطلوبة - Please fill all required fields
          </p>
          
          {/* What Happens Next Info */}
          <div className="bg-blue-50 border-r-4 border-blue-500 p-5 rounded-lg mb-6" dir="rtl">
            <h3 className="font-bold text-blue-900 mb-2">ماذا يحدث بعد التقديم؟</h3>
            <p className="text-sm text-blue-800 mb-2">
              بعد إرسال النموذج، ستحصل فوراً على الكوبون الخاص بك وتفاصيل موعد المقابلة. 
              يمكنك طباعة الكوبون أو حفظه على جهازك.
            </p>
            <h3 className="font-bold text-blue-900 mt-3 mb-2">What happens after submission?</h3>
            <p className="text-sm text-blue-800">
              After submitting the form, you will immediately receive your coupon and interview appointment details. 
              You can print the coupon or save it to your device.
            </p>
          </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {draftSaved && (
          <div className="bg-green-50 border-r-4 border-green-500 p-4 mb-6 rounded-lg" dir="rtl">
            <p className="text-green-700 text-sm font-medium">
              ✓ تم حفظ المسودة تلقائياً - Draft saved automatically
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
              البريد الإلكتروني *
            </label>
            <label className="block text-xs text-gray-500 mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              autoComplete="email"
              placeholder="example@email.com"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <p className="text-xs text-gray-500 mt-1" dir="rtl">
              سيتم استخدام هذا البريد لتحديد طلبك - This email will be used to identify your application
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
              الاسم الكامل *
            </label>
            <label className="block text-xs text-gray-500 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              autoComplete="name"
              placeholder="أدخل الاسم الكامل كما هو في بطاقة الهوية"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              dir="rtl"
            />
            <p className="text-xs text-gray-500 mt-1" dir="rtl">
              يجب أن يطابق الاسم الموجود في بطاقة الهوية - Must match your National ID
            </p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
              العنوان الكامل *
            </label>
            <label className="block text-xs text-gray-500 mb-2">Full Address *</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              rows={4}
              autoComplete="street-address"
              placeholder="المحافظة، المدينة، الشارع، رقم المبنى"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              dir="rtl"
            />
            <p className="text-xs text-gray-500 mt-1" dir="rtl">
              أدخل العنوان الكامل بالتفصيل - Enter complete address with details
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
              رقم الهاتف *
            </label>
            <label className="block text-xs text-gray-500 mb-2">Phone Number *</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
              placeholder="+20XXXXXXXXXX"
              autoComplete="tel"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <p className="text-xs text-gray-500 mt-1" dir="rtl">
              رقم هاتف نشط للتواصل - Active phone number for communication
            </p>
          </div>

          {/* National ID Front */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
              بطاقة الهوية - الوجه الأمامي *
            </label>
            <label className="block text-xs text-gray-500 mb-2">National ID - Front *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'front')}
                required
                className="hidden"
                id="nationalIdFront"
              />
              <label
                htmlFor="nationalIdFront"
                className="cursor-pointer flex flex-col items-center"
              >
                <span className="text-4xl mb-2">📷</span>
                <span className="text-sm text-gray-600 mb-1" dir="rtl">اضغط لرفع الصورة</span>
                <span className="text-xs text-gray-500">Click to upload image</span>
              </label>
            </div>
            {nationalIdFront && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg" dir="rtl">
                <p className="text-sm text-green-700 font-medium">
                  ✓ تم رفع الملف: {nationalIdFront.name}
                </p>
                <p className="text-xs text-green-600">File uploaded: {nationalIdFront.name}</p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2" dir="rtl">
              يجب أن تكون الصورة واضحة ويمكن قراءتها - Image must be clear and readable
            </p>
          </div>

          {/* National ID Back */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
              بطاقة الهوية - الخلفية *
            </label>
            <label className="block text-xs text-gray-500 mb-2">National ID - Back *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'back')}
                required
                className="hidden"
                id="nationalIdBack"
              />
              <label
                htmlFor="nationalIdBack"
                className="cursor-pointer flex flex-col items-center"
              >
                <span className="text-4xl mb-2">📷</span>
                <span className="text-sm text-gray-600 mb-1" dir="rtl">اضغط لرفع الصورة</span>
                <span className="text-xs text-gray-500">Click to upload image</span>
              </label>
            </div>
            {nationalIdBack && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg" dir="rtl">
                <p className="text-sm text-green-700 font-medium">
                  ✓ تم رفع الملف: {nationalIdBack.name}
                </p>
                <p className="text-xs text-green-600">File uploaded: {nationalIdBack.name}</p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2" dir="rtl">
              يجب أن تكون الصورة واضحة ويمكن قراءتها - Image must be clear and readable
            </p>
          </div>

          {/* Agreements */}
          <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-4" dir="rtl">التأكيدات والموافقات</h3>
            <h3 className="font-semibold mb-4 text-gray-600">Confirmations & Agreements</h3>
            
            <label className="flex items-start space-x-3 space-x-reverse p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requirementsAgreed}
                onChange={(e) => setFormData({ ...formData, requirementsAgreed: e.target.checked })}
                required
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="text-sm text-gray-700 block mb-1" dir="rtl">
                  أؤكد أنني أستوفي جميع متطلبات الوظيفة المذكورة أعلاه *
                </span>
                <span className="text-xs text-gray-600">
                  I confirm that I meet all the job requirements mentioned above *
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3 space-x-reverse p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={formData.documentsAgreed}
                onChange={(e) => setFormData({ ...formData, documentsAgreed: e.target.checked })}
                required
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="text-sm text-gray-700 block mb-1" dir="rtl">
                  أوافق على تقديم المستندات الرسمية الأصلية في يوم المقابلة *
                </span>
                <span className="text-xs text-gray-600">
                  I agree to submit original official documents on the interview day *
                </span>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  <span dir="rtl">جاري الإرسال...</span>
                  <span className="mx-2">|</span>
                  <span>Submitting...</span>
                </span>
              ) : (
                <>
                  <span dir="rtl" className="block mb-1">إرسال الطلب</span>
                  <span className="text-base">Submit Application</span>
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-500 mt-3" dir="rtl">
              بعد الإرسال، ستحصل فوراً على الكوبون - After submission, you will receive your coupon immediately
            </p>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}


