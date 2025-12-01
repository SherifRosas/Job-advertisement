import Image from 'next/image'
import Link from 'next/link'
import ContentProtection from '@/components/ContentProtection'
import CopyrightFooter from '@/components/CopyrightFooter'
import AIChatbot from '@/components/AIChatbot'
import SocialShare from '@/components/SocialShare'
import { getSettings } from '@/lib/supabase-server'

export default async function HomePage() {
  // Check advertisement status
  // Default to open if query fails
  let isClosed = false
  try {
    const settings = await getSettings()
    isClosed = settings?.advertisementStatus === 'closed' || false
  } catch (error) {
    // If database query fails, default to open (allow applications)
    console.error('Error fetching settings:', error)
    isClosed = false
  }

  return (
    <>
      <ContentProtection />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src="/Official-logo/28629918-c2a3-4e84-b855-0bd30046e219.jfif"
                    alt="Ministry of Education Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    Egyptian Ministry of Education
                  </h1>
                  <p className="text-sm text-gray-600">وزارة التربية والتعليم</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin/login"
                  className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded hover:bg-gray-100"
                >
                  Admin Login
                </Link>
                <span className="text-sm text-gray-600">EN</span>
                <span className="text-sm font-bold text-blue-600">AR</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {isClosed ? (
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-red-50 border-2 border-red-500 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-red-700 mb-4">
                  Advertisement Closed
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  This job advertisement has been closed and is no longer accepting applications.
                </p>
                <p className="text-gray-600">
                  The advertisement may be reactivated in the future. Please check back later.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Job Advertisement */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4" dir="rtl">
                      مدير حسابات
                    </h1>
                    <p className="text-2xl text-gray-700 mb-4">
                      Accounts Manager
                    </p>
                    <div className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-semibold" dir="rtl">
                      إعلان رسمي - Official Advertisement
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="prose max-w-none mb-8">
                    <h2 className="text-2xl font-bold mb-4" dir="rtl">وصف الوظيفة</h2>
                    <h2 className="text-xl font-semibold mb-4 text-gray-600">Job Description</h2>
                    <p className="text-gray-700 leading-relaxed mb-4" dir="rtl">
                      إعلان لتعيين مدير حسابات بوزارة التربية والتعليم المصرية. 
                      يتولى مدير الحسابات مسؤولية إدارة الحسابات، وإعداد التقارير المالية،
                      والإشراف على الفريق المالي لضمان دقة وسلامة البيانات المالية.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Job posting for an Accounts Manager at the Egyptian Ministry of Education.
                      The Accounts Manager will be responsible for managing accounts, preparing financial reports,
                      and supervising the finance team to ensure accuracy and integrity of financial data.
                    </p>

                    {/* Required Experience */}
                    <h3 className="text-xl font-bold mt-6 mb-3" dir="rtl">الخبرة المطلوبة:</h3>
                    <h3 className="text-lg font-semibold mb-3 text-gray-600">Required Experience:</h3>
                    <ul className="list-disc list-inside space-y-3 text-gray-700" dir="rtl">
                      <li>خبرة في إدارة الحسابات</li>
                      <li>خبرة في إعداد التقارير المالية</li>
                      <li>خبرة في الإشراف على الفريق المالي</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
                      <li>Experience in accounting management</li>
                      <li>Experience in preparing financial reports</li>
                      <li>Experience supervising the finance team</li>
                    </ul>

                    {/* Qualifications */}
                    <h3 className="text-xl font-bold mt-6 mb-3" dir="rtl">المؤهلات:</h3>
                    <h3 className="text-lg font-semibold mb-3 text-gray-600">Qualifications:</h3>
                    <ul className="list-disc list-inside space-y-3 text-gray-700" dir="rtl">
                      <li>درجة بكالوريوس في المحاسبة أو ما يعادلها</li>
                      <li>إجادة استخدام برامج المحاسبة</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
                      <li>Bachelor&apos;s degree in Accounting or equivalent</li>
                      <li>Proficiency in using accounting software</li>
                    </ul>

                    {/* Application Period */}
                    <div className="mt-8 bg-green-50 border-r-4 border-green-500 p-6 rounded-lg" dir="rtl">
                      <h3 className="text-xl font-bold mb-3">فترة التقديم:</h3>
                      <p className="text-gray-800 mb-1">
                        من 01/12/2025 إلى 30/12/2025
                      </p>
                      <h3 className="text-lg font-semibold mt-4 mb-1 text-gray-700">Application Period:</h3>
                      <p className="text-gray-700">
                        From 1/12/2025 to 30/12/2025
                      </p>
                    </div>

                    <div className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-lg mt-8" dir="rtl">
                      <h3 className="text-xl font-bold mb-4">خطوات التقديم:</h3>
                      <ol className="list-decimal list-inside space-y-3 text-gray-700">
                        <li>املأ نموذج التقديم بالكامل</li>
                        <li>قم برفع بطاقة الهوية (الوجه الأمامي والخلفي)</li>
                        <li>وافق على الشروط والأحكام</li>
                        <li>احصل على الكوبون الخاص بك فوراً</li>
                        <li>ستتلقى تفاصيل موعد المقابلة</li>
                      </ol>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg mt-4">
                      <h3 className="text-xl font-bold mb-4">Application Process:</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Complete the application form</li>
                        <li>Upload your National ID (front and back)</li>
                        <li>Agree to terms and conditions</li>
                        <li>Receive your coupon immediately</li>
                        <li>You will receive interview appointment details</li>
                      </ol>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-yellow-50 border-r-4 border-yellow-400 p-6 mb-8 rounded-lg" dir="rtl">
                    <p className="text-sm text-yellow-800 mb-2">
                      <strong>تنبيه أمني:</strong> هذا إعلان رسمي من وزارة التربية والتعليم المصرية. 
                      جميع المحتويات محمية ولا يمكن نسخها أو لصقها أو التقاط لقطات شاشة منها. 
                      يرجى التأكد من أنك تتقدم من خلال النطاق الرسمي فقط.
                    </p>
                    <p className="text-sm text-yellow-700">
                      <strong>Security Notice:</strong> This is an official advertisement from the Egyptian 
                      Ministry of Education. All content is protected and cannot be copied, pasted, or 
                      screenshotted. Please ensure you are applying through the official domain only.
                    </p>
                  </div>

                  {/* Social Sharing */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <SocialShare />
                  </div>

                  {/* Step-by-Step Guide */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 border-2 border-blue-200">
                    <h3 className="text-xl font-bold mb-4 text-center" dir="rtl">كيفية التقديم - How to Apply</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-3xl mb-2">📝</div>
                        <h4 className="font-semibold mb-2" dir="rtl">الخطوة 1: املأ النموذج</h4>
                        <p className="text-sm text-gray-600">Step 1: Fill the form</p>
                        <p className="text-xs text-gray-500 mt-2">Enter your details and upload ID</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-3xl mb-2">✅</div>
                        <h4 className="font-semibold mb-2" dir="rtl">الخطوة 2: احصل على الكوبون</h4>
                        <p className="text-sm text-gray-600">Step 2: Get your coupon</p>
                        <p className="text-xs text-gray-500 mt-2">Receive coupon immediately</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-3xl mb-2">📅</div>
                        <h4 className="font-semibold mb-2" dir="rtl">الخطوة 3: احضر المقابلة</h4>
                        <p className="text-sm text-gray-600">Step 3: Attend interview</p>
                        <p className="text-xs text-gray-500 mt-2">Bring your documents</p>
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="text-center">
                    <Link
                      href="/apply"
                      className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-5 px-12 rounded-xl text-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                      <span dir="rtl">ابدأ التقديم الآن</span>
                      <br />
                      <span className="text-lg">Apply Now</span>
                    </Link>
                    <p className="text-sm text-gray-600 mt-4" dir="rtl">
                      اضغط للبدء في التقديم - Click to start your application
                    </p>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <h3 className="font-bold mb-2">Secure</h3>
                    <p className="text-sm text-gray-600">SSL Encrypted</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <h3 className="font-bold mb-2">Official</h3>
                    <p className="text-sm text-gray-600">Ministry Verified</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="text-3xl mb-2">💳</div>
                    <h3 className="font-bold mb-2">Secure Payment</h3>
                    <p className="text-sm text-gray-600">Paymob Protected</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>

        <CopyrightFooter />
        <AIChatbot />
      </div>
    </>
  )
}

