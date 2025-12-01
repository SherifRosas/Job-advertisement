'use client'

import Link from 'next/link'
import Image from 'next/image'
import SocialShare from '@/components/SocialShare'
import { useLanguage } from './LanguageContext'

export default function HomeContent({ isClosed }: { isClosed: boolean }) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  if (isClosed) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-red-700 mb-4">
            {isArabic ? 'تم إغلاق الإعلان' : 'Advertisement Closed'}
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            {isArabic
              ? 'تم إغلاق هذا الإعلان الوظيفي ولم يعد يستقبل طلبات جديدة.'
              : 'This job advertisement has been closed and is no longer accepting applications.'}
          </p>
          <p className="text-gray-600">
            {isArabic
              ? 'قد يتم إعادة تفعيل الإعلان في المستقبل. يرجى المتابعة لاحقاً.'
              : 'The advertisement may be reactivated in the future. Please check back later.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Job Advertisement */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            {/* Title with logos pushed to far left and far right */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/Official-logo/28629918-c2a3-4e84-b855-0bd30046e219.jfif"
                  alt="Ministry of Education Logo Left"
                  fill
                  className="object-contain"
                />
              </div>
              <h1
                className="flex-1 text-3xl md:text-4xl font-bold text-gray-900 text-center leading-snug"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {isArabic
                  ? 'مدير حسابات بوزارة التربية والتعليم المصرية'
                  : 'Accounts Manager at the Egyptian Ministry of Education'}
              </h1>
              <div className="relative w-12 h-12">
                <Image
                  src="/Official-logo/c184a4ff-03f5-4548-9ffe-4fc723b9acc4.jfif"
                  alt="Ministry of Education Logo Right"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-lg md:text-2xl text-gray-700 mb-4">
              {isArabic
                ? 'Accounts Manager at the Egyptian Ministry of Education'
                : 'مدير حسابات بوزارة التربية والتعليم المصرية'}
            </p>
            <div
              className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-semibold"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic ? 'إعلان رسمي - Official Advertisement' : 'Official Advertisement - إعلان رسمي'}
            </div>
          </div>

          {/* Job Description */}
          <div className="prose max-w-none mb-8">
            <h2
              className="text-2xl font-bold mb-4"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic ? 'وصف الوظيفة' : 'Job Description'}
            </h2>
            <p
              className="text-gray-700 leading-relaxed mb-4"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic
                ? 'إعلان لتعيين مدير حسابات بوزارة التربية والتعليم المصرية. يتولى مدير الحسابات مسؤولية إدارة الحسابات، وإعداد التقارير المالية، والإشراف على الفريق المالي لضمان دقة وسلامة البيانات المالية.'
                : 'Job posting for an Accounts Manager at the Egyptian Ministry of Education. The Accounts Manager will be responsible for managing accounts, preparing financial reports, and supervising the finance team to ensure accuracy and integrity of financial data.'}
            </p>

            {/* Required Experience */}
            <h3
              className="text-xl font-bold mt-6 mb-3"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic ? 'الخبرة المطلوبة:' : 'Required Experience:'}
            </h3>
            <ul
              className="list-disc list-inside space-y-3 text-gray-700"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <li>
                {isArabic
                  ? 'خبرة في إدارة الحسابات'
                  : 'Experience in accounting management'}
              </li>
              <li>
                {isArabic
                  ? 'خبرة في إعداد التقارير المالية'
                  : 'Experience in preparing financial reports'}
              </li>
              <li>
                {isArabic
                  ? 'خبرة في الإشراف على الفريق المالي'
                  : 'Experience supervising the finance team'}
              </li>
            </ul>

            {/* Qualifications */}
            <h3
              className="text-xl font-bold mt-6 mb-3"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic ? 'المؤهلات:' : 'Qualifications:'}
            </h3>
            <ul
              className="list-disc list-inside space-y-3 text-gray-700"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <li>
                {isArabic
                  ? 'درجة بكالوريوس في المحاسبة أو ما يعادلها'
                  : "Bachelor's degree in Accounting or equivalent"}
              </li>
              <li>
                {isArabic
                  ? 'إجادة استخدام برامج المحاسبة'
                  : 'Proficiency in using accounting software'}
              </li>
            </ul>

            {/* Application Period */}
            <div
              className="mt-8 bg-green-50 border-r-4 border-green-500 p-6 rounded-lg"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <h3 className="text-xl font-bold mb-3">
                {isArabic ? 'فترة التقديم:' : 'Application Period:'}
              </h3>
              <p className="text-gray-800 mb-1">
                {isArabic
                  ? 'من 01/12/2025 إلى 30/12/2025'
                  : 'From 1/12/2025 to 30/12/2025'}
              </p>
            </div>

            <div
              className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-lg mt-8"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <h3 className="text-xl font-bold mb-4">
                {isArabic ? 'خطوات التقديم:' : 'Application Steps:'}
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  {isArabic
                    ? 'املأ نموذج التقديم بالكامل'
                    : 'Complete the application form'}
                </li>
                <li>
                  {isArabic
                    ? 'قم برفع بطاقة الهوية (الوجه الأمامي والخلفي)'
                    : 'Upload your National ID (front and back)'}
                </li>
                <li>
                  {isArabic
                    ? 'وافق على الشروط والأحكام'
                    : 'Agree to terms and conditions'}
                </li>
                <li>
                  {isArabic
                    ? 'احصل على الكوبون الخاص بك فوراً'
                    : 'Receive your coupon immediately'}
                </li>
                <li>
                  {isArabic
                    ? 'ستتلقى تفاصيل موعد المقابلة'
                    : 'Receive interview appointment details'}
                </li>
              </ol>
            </div>
          </div>

          {/* Security Notice */}
          <div
            className="bg-yellow-50 border-r-4 border-yellow-400 p-6 mb-8 rounded-lg"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <p className="text-sm text-yellow-800 mb-2">
              <strong>
                {isArabic ? 'تنبيه أمني:' : 'Security Notice:'}
              </strong>{' '}
              {isArabic
                ? 'هذا إعلان رسمي من وزارة التربية والتعليم المصرية. جميع المحتويات محمية ولا يمكن نسخها أو لصقها أو التقاط لقطات شاشة منها. يرجى التأكد من أنك تتقدم من خلال النطاق الرسمي فقط.'
                : 'This is an official advertisement from the Egyptian Ministry of Education. All content is protected and cannot be copied, pasted, or screenshotted. Please ensure you are applying through the official domain only.'}
            </p>
          </div>

          {/* Social Sharing */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <SocialShare />
          </div>

          {/* Step-by-Step Guide */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 border-2 border-blue-200">
            <h3
              className="text-xl font-bold mb-4 text-center"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic ? 'كيفية التقديم' : 'How to Apply'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">📝</div>
                <h4
                  className="font-semibold mb-2"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {isArabic ? 'الخطوة 1: املأ النموذج' : 'Step 1: Fill the form'}
                </h4>
                <p className="text-xs text-gray-500 mt-2">
                  {isArabic
                    ? 'أدخل بياناتك وقم برفع بطاقة الهوية'
                    : 'Enter your details and upload ID'}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">✅</div>
                <h4
                  className="font-semibold mb-2"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {isArabic
                    ? 'الخطوة 2: احصل على الكوبون'
                    : 'Step 2: Get your coupon'}
                </h4>
                <p className="text-xs text-gray-500 mt-2">
                  {isArabic
                    ? 'استلم الكوبون فوراً بعد إرسال الطلب'
                    : 'Receive your coupon immediately'}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl mb-2">📅</div>
                <h4
                  className="font-semibold mb-2"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {isArabic
                    ? 'الخطوة 3: احضر المقابلة'
                    : 'Step 3: Attend interview'}
                </h4>
                <p className="text-xs text-gray-500 mt-2">
                  {isArabic
                    ? 'أحضر المستندات المطلوبة في موعد المقابلة'
                    : 'Bring your documents to the interview'}
                </p>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="text-center">
            <Link
              href="/apply"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-5 px-12 rounded-xl text-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic ? 'ابدأ التقديم الآن' : 'Apply Now'}
              </span>
            </Link>
            <p
              className="text-sm text-gray-600 mt-4"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic
                ? 'اضغط للبدء في التقديم'
                : 'Click to start your application'}
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-bold mb-2">
              {isArabic ? 'آمن' : 'Secure'}
            </h3>
            <p className="text-sm text-gray-600">
              {isArabic ? 'مشفّر ببروتوكول SSL' : 'SSL Encrypted'}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-bold mb-2">
              {isArabic ? 'رسمي' : 'Official'}
            </h3>
            <p className="text-sm text-gray-600">
              {isArabic ? 'موثّق من الوزارة' : 'Ministry Verified'}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-2">💳</div>
            <h3 className="font-bold mb-2">
              {isArabic ? 'دفع آمن' : 'Secure Payment'}
            </h3>
            <p className="text-sm text-gray-600">
              {isArabic ? 'محمي بواسطة Paymob' : 'Paymob Protected'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


