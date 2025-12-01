'use client'

export default function VerifyPage() {
  // This step is no longer used in the simplified flow.
  // Keep a simple informational page so the route still works.
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-xl bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4" dir="rtl">
          صفحة التحقق لم تعد مطلوبة
        </h1>
        <p className="text-gray-700 mb-2" dir="rtl">
          تم تبسيط خطوات التقديم، ولا تحتاج الآن للتحقق من البريد الإلكتروني أو رقم الهاتف.
        </p>
        <p className="text-gray-600 mb-6">
          The verification step has been removed. You can apply directly using the application form.
        </p>
        <a
          href="/apply"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
        >
          Go to Application Form / الانتقال إلى نموذج التقديم
        </a>
      </div>
    </div>
  )
}
