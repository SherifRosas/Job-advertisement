'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { db } from '@/lib/supabase'
import ApplicationProgress from '@/components/ApplicationProgress'

export default function CouponPage() {
  const params = useParams()
  const couponId = params.id as string
  const [coupon, setCoupon] = useState<any>(null)
  const [application, setApplication] = useState<any>(null)
  const [appointment, setAppointment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Try to get coupon by ID first, then by applicationId as fallback
        let couponData = await db.getCouponById(couponId)
        
        // If not found by ID, try by applicationId (for backward compatibility)
        if (!couponData) {
          couponData = await db.getCouponByApplicationId(couponId)
        }

        if (!couponData) {
          setLoading(false)
          return
        }

        setCoupon(couponData)

        // Get application and appointment
        const applicationData = await db.getApplicationById(couponData.applicationId)
        if (applicationData) {
          setApplication(applicationData)
          
          const appointmentData = await db.getAppointmentByApplicationId(applicationData.id)
          if (appointmentData) {
            setAppointment(appointmentData)
          }
        }
      } catch (error) {
        console.error('Error fetching coupon data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [couponId])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!coupon || !application) {
    return <div className="min-h-screen flex items-center justify-center">Coupon not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <ApplicationProgress currentStep="coupon" className="mb-8" />

        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-center mb-2" dir="rtl">
            تم التقديم بنجاح!
          </h1>
          <p className="text-center text-gray-600 mb-2">Application Submitted Successfully!</p>
          <p className="text-center text-sm text-gray-500 mb-8" dir="rtl">
            احفظ هذا الكوبون للمقابلة - Save this coupon for your interview
          </p>

          <div className="space-y-6">
            {/* Success highlight */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-green-700 mb-2" dir="rtl">
                تم قبول طلبك!
              </h2>
              <p className="text-xl text-green-600 mb-2">Application Accepted!</p>
              <p className="text-sm text-green-700 mt-4" dir="rtl">
                سيتم مراجعة طلبك وإبلاغك بالنتيجة - Your application will be reviewed and you'll be notified
              </p>
            </div>

            {/* Coupon Details */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl border-2 border-gray-200 space-y-5">
              <h3 className="text-xl font-bold mb-6 text-center" dir="rtl">
                تفاصيل الكوبون
              </h3>
              <h3 className="text-lg font-semibold mb-6 text-center text-gray-600">Coupon Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1" dir="rtl">
                    اسم المتقدم
                  </p>
                  <p className="font-semibold text-gray-900">{application.fullName}</p>
                  <p className="text-xs text-gray-500 mt-1">Applicant Name</p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1" dir="rtl">
                    رقم الكوبون
                  </p>
                  <p className="font-mono font-bold text-lg text-blue-600">{coupon.couponCode}</p>
                  <p className="text-xs text-gray-500 mt-1">Coupon Code</p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1" dir="rtl">
                    العلامة الأمنية
                  </p>
                  <p className="font-mono text-sm text-gray-700 break-all">{coupon.securityMark}</p>
                  <p className="text-xs text-gray-500 mt-1">Security Mark</p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1" dir="rtl">
                    حالة الطلب
                  </p>
                  <p className="font-semibold text-green-600" dir="rtl">
                    مقبول
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Status: Accepted</p>
                </div>
              </div>
            </div>

            {/* Interview appointment */}
            {appointment && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 p-8 rounded-xl shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">📅</div>
                  <h3 className="text-2xl font-bold mb-2" dir="rtl">
                    موعد المقابلة
                  </h3>
                  <h3 className="text-xl font-semibold text-gray-700">Interview Appointment</h3>
                </div>

                <div className="bg-white p-6 rounded-lg space-y-4 border border-blue-200">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 mb-1" dir="rtl">
                        التاريخ
                      </p>
                      <p className="font-bold text-lg">
                        {new Date(appointment.date).toLocaleDateString('ar-EG', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Date</p>
                      <p className="font-semibold">{new Date(appointment.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 mb-1" dir="rtl">
                        الوقت
                      </p>
                      <p className="font-bold text-lg">{appointment.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Time</p>
                      <p className="font-semibold">{appointment.time}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2" dir="rtl">
                      المكان
                    </p>
                    <p className="font-bold text-lg mb-1" dir="rtl">
                      {appointment.location}
                    </p>
                    <p className="text-xs text-gray-500">Location</p>
                  </div>
                </div>

                {/* Next Steps Info */}
                <div className="mt-6 bg-yellow-50 border-r-4 border-yellow-400 p-5 rounded-lg" dir="rtl">
                  <h4 className="font-bold text-yellow-900 mb-2">⚠️ ما يجب إحضاره في يوم المقابلة:</h4>
                  <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                    <li>بطاقة الهوية الأصلية</li>
                    <li>الشهادات والمؤهلات الأصلية</li>
                    <li>الكوبون المطبوع</li>
                    <li>صورة شخصية حديثة</li>
                  </ul>
                  <h4 className="font-bold text-yellow-900 mt-4 mb-2">What to bring to the interview:</h4>
                  <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                    <li>Original National ID</li>
                    <li>Original certificates and qualifications</li>
                    <li>Printed coupon</li>
                    <li>Recent personal photo</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <button
              onClick={() => window.print()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-2xl block mb-1">🖨️</span>
              <span dir="rtl" className="block">
                طباعة الكوبون
              </span>
              <span className="text-sm">Print Coupon</span>
            </button>
            <button
              onClick={() => {
                const couponText = `Coupon Code: ${coupon.couponCode}\nSecurity Mark: ${coupon.securityMark}\nApplicant: ${application.fullName}`
                navigator.clipboard.writeText(couponText)
                alert('Coupon details copied to clipboard!')
              }}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-2xl block mb-1">📋</span>
              <span dir="rtl" className="block">
                نسخ التفاصيل
              </span>
              <span className="text-sm">Copy Details</span>
            </button>
          </div>

          {/* Success Message */}
          <div className="mt-8 bg-green-50 border-2 border-green-200 p-6 rounded-xl text-center" dir="rtl">
            <p className="text-green-800 font-semibold mb-2">🎉 تهانينا! تم تقديم طلبك بنجاح</p>
            <p className="text-green-700 text-sm">Congratulations! Your application has been submitted successfully</p>
            <p className="text-green-600 text-xs mt-2">سيتم مراجعة طلبك وإبلاغك بالنتيجة عبر البريد الإلكتروني</p>
            <p className="text-green-600 text-xs">Your application will be reviewed and you'll be notified via email</p>
          </div>
        </div>
      </div>
    </div>
  )
}


