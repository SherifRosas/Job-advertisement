'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'

interface ApplicationStatus {
  id: string
  fullName: string
  paymentStatus: string
  selectionStatus: string
  aiVerified: boolean
  coupon?: { couponCode: string }
  appointment?: { date: string; time: string; location: string }
}

export default function StatusPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<ApplicationStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [searching, setSearching] = useState(false)
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const fetchApplications = async (userEmail?: string) => {
    try {
      const emailToUse = userEmail || email
      if (!emailToUse) {
        setLoading(false)
        return
      }

      const response = await fetch(`/api/applications/user?email=${encodeURIComponent(emailToUse)}`, {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }

      const data = await response.json()
      if (data.success) {
        setApplications(data.applications)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
      setSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchEmail) {
      alert('Please enter your email address')
      return
    }
    setEmail(searchEmail)
    setSearching(true)
    setLoading(true)
    fetchApplications(searchEmail)
  }

  if (loading || searching) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold text-center mb-2"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          {isArabic ? 'حالة الطلب' : 'Application Status'}
        </h1>
        <p
          className="text-center text-sm text-gray-500 mb-8"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          {isArabic
            ? 'تحقق من حالة طلبك بإدخال بريدك الإلكتروني'
            : 'Check your application status by entering your email'}
        </p>

        {/* Email Search Form */}
        {!email && (
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🔍</div>
              <h2
                className="text-2xl font-bold mb-2"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {isArabic
                  ? 'التحقق من حالة الطلب'
                  : 'Check Your Application Status'}
              </h2>
              <p
                className="text-sm text-gray-500"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {isArabic
                  ? 'أدخل بريدك الإلكتروني للاطلاع على طلباتك'
                  : 'Enter your email to view your applications'}
              </p>
            </div>
            <form onSubmit={handleSearch} className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {isArabic ? 'البريد الإلكتروني *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  required
                  placeholder="example@email.com"
                  autoComplete="email"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <p
                  className="text-xs text-gray-500 mt-2"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {isArabic
                    ? 'استخدم نفس البريد الذي استخدمته في التقديم'
                    : 'Use the same email you used for application'}
                </p>
              </div>
              <button
                type="submit"
                disabled={searching}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {searching ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⏳</span>
                    <span dir={isArabic ? 'rtl' : 'ltr'}>
                      {isArabic ? 'جاري البحث...' : 'Searching...'}
                    </span>
                  </span>
                ) : (
                  <>
                    <span
                      dir={isArabic ? 'rtl' : 'ltr'}
                      className="block mb-1"
                    >
                      {isArabic
                        ? 'البحث عن الطلبات'
                        : 'Search Applications'}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Show email and allow change */}
        {email && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-2 border-blue-200">
            <div>
              <p
                className="text-sm text-gray-600 mb-1"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {isArabic
                  ? 'عرض الطلبات الخاصة بـ:'
                  : 'Viewing applications for:'}
              </p>
              <p className="font-bold text-lg text-blue-900">{email}</p>
            </div>
            <button
              onClick={() => {
                setEmail('')
                setSearchEmail('')
                setApplications([])
              }}
              className="mt-3 sm:mt-0 text-sm bg-white text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg border border-blue-300 transition-colors"
              >
                <span dir={isArabic ? 'rtl' : 'ltr'}>
                  {isArabic ? 'تغيير البريد' : 'Change Email'}
                </span>
              </button>
          </div>
        )}

        {email && applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-xl p-10 text-center border border-gray-200">
            <div className="text-6xl mb-4">📭</div>
            <h3
              className="text-xl font-bold text-gray-800 mb-2"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic
                ? 'لم يتم العثور على طلبات'
                : 'No applications found'}
            </h3>
            <p
              className="text-sm text-gray-500 mb-6"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic
                ? 'إذا قمت بتقديم طلب مؤخراً، يرجى الانتظار قليلاً والمحاولة مرة أخرى'
                : 'If you recently submitted an application, please wait a moment and try again'}
            </p>
            <button
              onClick={() => router.push('/apply')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <span dir={isArabic ? 'rtl' : 'ltr'}>
                  {isArabic ? 'تقديم طلب جديد' : 'Apply Now'}
                </span>
              </button>
          </div>
        ) : email && applications.length > 0 ? (
          <div className="space-y-6">
            <div
              className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <p className="text-green-800 font-semibold">
                {isArabic
                  ? `تم العثور على ${applications.length} طلب`
                  : `Found ${applications.length} application${
                      applications.length > 1 ? 's' : ''
                    }`}
              </p>
            </div>
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
                  <h2
                    className="text-2xl font-bold text-gray-900"
                    dir={isArabic ? 'rtl' : 'ltr'}
                  >
                    {app.fullName}
                  </h2>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Application ID</p>
                    <p className="text-xs font-mono text-gray-400">{app.id.substring(0, 8)}...</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p
                      className="text-sm text-gray-600 mb-1"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    >
                      {isArabic ? 'حالة الدفع' : 'Payment Status'}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      app.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.paymentStatus === 'paid'
                        ? isArabic
                          ? '✓ مدفوع'
                          : 'Paid'
                        : app.paymentStatus}
                    </span>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p
                      className="text-sm text-gray-600 mb-1"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    >
                      {isArabic ? 'حالة الاختيار' : 'Selection Status'}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      app.selectionStatus === 'selected' ? 'bg-blue-100 text-blue-800' : 
                      app.selectionStatus === 'rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {isArabic
                        ? app.selectionStatus === 'selected'
                          ? '✓ تم الاختيار'
                          : app.selectionStatus === 'rejected'
                          ? '✗ مرفوض'
                          : 'قيد المراجعة'
                        : app.selectionStatus === 'selected'
                        ? '✓ Selected'
                        : app.selectionStatus === 'rejected'
                        ? '✗ Rejected'
                        : 'Under review'}
                    </span>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <p
                      className="text-sm text-gray-600 mb-1"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    >
                      {isArabic ? 'التحقق الآلي' : 'AI Verification'}
                    </p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      app.aiVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isArabic
                        ? app.aiVerified
                          ? '✓ تم التحقق'
                          : '⏳ قيد المراجعة'
                        : app.aiVerified
                        ? '✓ Verified'
                        : '⏳ In review'}
                    </span>
                  </div>
                  
                  {app.coupon && (
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <p
                        className="text-sm text-gray-600 mb-1"
                        dir={isArabic ? 'rtl' : 'ltr'}
                      >
                        {isArabic ? 'رقم الكوبون' : 'Coupon Code'}
                      </p>
                      <p className="font-mono font-bold text-lg text-emerald-700">{app.coupon.couponCode}</p>
                    </div>
                  )}
                </div>
                
                {app.appointment && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200 mt-4">
                    <h3
                      className="text-lg font-bold mb-4"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    >
                      {isArabic ? '📅 موعد المقابلة' : '📅 Interview Appointment'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded-lg">
                        <p
                          className="text-xs text-gray-500 mb-1"
                          dir={isArabic ? 'rtl' : 'ltr'}
                        >
                          {isArabic ? 'التاريخ' : 'Date'}
                        </p>
                        <p className="font-semibold">{new Date(app.appointment.date).toLocaleDateString()}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p
                          className="text-xs text-gray-500 mb-1"
                          dir={isArabic ? 'rtl' : 'ltr'}
                        >
                          {isArabic ? 'الوقت' : 'Time'}
                        </p>
                        <p className="font-semibold">{app.appointment.time}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg md:col-span-1">
                        <p
                          className="text-xs text-gray-500 mb-1"
                          dir={isArabic ? 'rtl' : 'ltr'}
                        >
                          {isArabic ? 'المكان' : 'Location'}
                        </p>
                        <p className="font-semibold text-sm">{app.appointment.location}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {app.coupon && (
                  <div className="mt-4">
                    <a
                      href={`/coupon/${app.id}`}
                      className="inline-block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                    >
                      <span dir={isArabic ? 'rtl' : 'ltr'}>
                        {isArabic ? 'عرض الكوبون' : 'View Coupon'}
                      </span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}


