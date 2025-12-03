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
        <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-8 glass-effect">
        <h2 className="text-3xl font-bold text-red-400 mb-4">
          {isArabic ? 'تم إغلاق الإعلان' : 'Advertisement Closed'}
        </h2>
        <p className="text-lg text-white mb-4 font-medium">
          {isArabic
            ? 'تم إغلاق هذا الإعلان الوظيفي ولم يعد يستقبل طلبات جديدة.'
            : 'This job advertisement has been closed and is no longer accepting applications.'}
        </p>
        <p className="text-white">
          {isArabic
            ? 'قد يتم إعادة تفعيل الإعلان في المستقبل. يرجى المتابعة لاحقاً.'
            : 'The advertisement may be reactivated in the future. Please check back later.'}
        </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10">
      {/* Job Advertisement */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative glass-effect rounded-3xl shadow-2xl p-8 md:p-12 mb-10 overflow-hidden fantasy-glow fantasy-glow-hover magical-glow transition-all duration-700">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 shimmer-effect pointer-events-none opacity-30" />
          
          {/* Animated gradient background with depth */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 via-black to-gray-900 animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,_rgba(0,0,0,0.4)_0%,_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,_rgba(31,41,55,0.4)_0%,_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(0,0,0,0.2)_0%,_transparent_70%)]" />
          </div>
          
          {/* Enhanced floating particles with more sophistication */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-3 h-3 bg-gray-700 rounded-full pulse-soft float-animation" style={{ animationDelay: '0s' }} />
            <div className="absolute top-40 right-20 w-2 h-2 bg-gray-600 rounded-full pulse-soft float-animation" style={{ animationDelay: '1.5s' }} />
            <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-gray-800 rounded-full pulse-soft float-animation" style={{ animationDelay: '3s' }} />
            <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-gray-900/500 rounded-full pulse-soft float-animation" style={{ animationDelay: '4.5s' }} />
            <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-gray-700 rounded-full pulse-soft float-animation" style={{ animationDelay: '6s' }} />
          </div>
          
          {/* Subtle border glow effect */}
          <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none" />
          <div className="absolute inset-[1px] rounded-3xl border border-black/5 pointer-events-none" />

          <div className="relative">
           <div className="text-center mb-8">
            {/* Title with logos pushed to far left and far right */}
            <div className="flex items-center justify-between gap-4 md:gap-8 mb-6">
              <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 transform hover:scale-110 hover:rotate-3 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative w-full h-full">
                  <Image
                    src="/Official-logo/28629918-c2a3-4e84-b855-0bd30046e219.jfif"
                    alt="Ministry of Education Logo Left"
                    width={96}
                    height={96}
                    className="object-contain drop-shadow-2xl filter brightness-110 w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-white/10 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
              </div>
              <h1
                className="flex-1 text-3xl md:text-5xl lg:text-6xl font-black text-center leading-tight bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                <span className="relative z-10">
                  {isArabic
                    ? 'مدير حسابات بوزارة التربية والتعليم المصرية'
                    : 'Accounts Manager at the Egyptian Ministry of Education'}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 bg-clip-text text-transparent blur-sm opacity-30" aria-hidden="true">
                  {isArabic
                    ? 'مدير حسابات بوزارة التربية والتعليم المصرية'
                    : 'Accounts Manager at the Egyptian Ministry of Education'}
                </span>
              </h1>
              <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 transform hover:scale-110 hover:-rotate-3 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative w-full h-full">
                  <Image
                    src="/Official-logo/c184a4ff-03f5-4548-9ffe-4fc723b9acc4.jfif"
                    alt="Ministry of Education Logo Right"
                    width={96}
                    height={96}
                    className="object-contain drop-shadow-2xl filter brightness-110 w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-white/10 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </div>
            <p className="text-lg md:text-2xl text-white mb-8 font-bold text-center tracking-tight">
              {isArabic
                ? 'Accounts Manager at the Egyptian Ministry of Education'
                : 'مدير حسابات بوزارة التربية والتعليم المصرية'}
            </p>
            <div
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-full text-sm font-extrabold shadow-2xl hover:shadow-[0_15px_40px_rgba(255,215,0,0.5)] transform hover:scale-110 transition-all duration-500 border-2 border-yellow-400 hover:border-yellow-300 relative overflow-hidden group"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="text-xl relative z-10">◆</span>
              <span className="relative z-10 tracking-wide">
                {isArabic ? 'إعلان رسمي - Official Advertisement' : 'Official Advertisement - إعلان رسمي'}
              </span>
              <span className="text-xl relative z-10">◆</span>
            </div>
          </div>

          {/* Job Description */}
          <div className="prose max-w-none mb-8 mt-10">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <span className="relative z-10">{isArabic ? 'وصف الوظيفة' : 'Job Description'}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-clip-text text-transparent blur-sm opacity-30" aria-hidden="true">
                {isArabic ? 'وصف الوظيفة' : 'Job Description'}
              </span>
            </h2>
            <p
              className="text-white leading-relaxed mb-4 text-lg font-medium"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic
                ? 'إعلان لتعيين مدير حسابات بوزارة التربية والتعليم المصرية. يتولى مدير الحسابات مسؤولية إدارة الحسابات، وإعداد التقارير المالية، والإشراف على الفريق المالي لضمان دقة وسلامة البيانات المالية.'
                : 'Job posting for an Accounts Manager at the Egyptian Ministry of Education. The Accounts Manager will be responsible for managing accounts, preparing financial reports, and supervising the finance team to ensure accuracy and integrity of financial data.'}
            </p>

            {/* Required Experience */}
            <h3
              className="text-2xl md:text-3xl font-extrabold mt-10 mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-3xl">▸</span>
                {isArabic ? 'الخبرة المطلوبة:' : 'Required Experience:'}
              </span>
            </h3>
            <ul
              className="list-none space-y-3 text-white pl-0"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <li className="flex items-start gap-4 group hover:bg-gray-700/10 p-3 rounded-lg transition-all duration-300">
                <span className="text-3xl mt-1 group-hover:scale-110 transition-transform duration-300">💼</span>
                <span className="text-white font-semibold text-lg group-hover:text-gray-100 transition-colors">{isArabic
                  ? 'خبرة في إدارة الحسابات'
                  : 'Experience in accounting management'}</span>
              </li>
              <li className="flex items-start gap-4 group hover:bg-gray-700/10 p-3 rounded-lg transition-all duration-300">
                <span className="text-3xl mt-1 group-hover:scale-110 transition-transform duration-300">📊</span>
                <span className="text-white font-semibold text-lg group-hover:text-gray-100 transition-colors">{isArabic
                  ? 'خبرة في إعداد التقارير المالية'
                  : 'Experience in preparing financial reports'}</span>
              </li>
              <li className="flex items-start gap-4 group hover:bg-gray-700/10 p-3 rounded-lg transition-all duration-300">
                <span className="text-3xl mt-1 group-hover:scale-110 transition-transform duration-300">👥</span>
                <span className="text-white font-semibold text-lg group-hover:text-gray-100 transition-colors">{isArabic
                  ? 'خبرة في الإشراف على الفريق المالي'
                  : 'Experience supervising the finance team'}</span>
              </li>
            </ul>

            {/* Qualifications */}
            <h3
              className="text-2xl md:text-3xl font-extrabold mt-10 mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-3xl">▸</span>
                {isArabic ? 'المؤهلات:' : 'Qualifications:'}
              </span>
            </h3>
            <ul
              className="list-none space-y-3 text-white pl-0"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <li className="flex items-start gap-4 group hover:bg-gray-700/10 p-3 rounded-lg transition-all duration-300">
                <span className="text-3xl mt-1 group-hover:scale-110 transition-transform duration-300">🎓</span>
                <span className="text-white font-semibold text-lg group-hover:text-gray-100 transition-colors">{isArabic
                  ? 'درجة بكالوريوس في المحاسبة أو ما يعادلها'
                  : "Bachelor's degree in Accounting or equivalent"}</span>
              </li>
              <li className="flex items-start gap-4 group hover:bg-gray-700/10 p-3 rounded-lg transition-all duration-300">
                <span className="text-3xl mt-1 group-hover:scale-110 transition-transform duration-300">💻</span>
                <span className="text-white font-semibold text-lg group-hover:text-gray-100 transition-colors">{isArabic
                  ? 'إجادة استخدام برامج المحاسبة'
                  : 'Proficiency in using accounting software'}</span>
              </li>
            </ul>

            {/* Application Period */}
            <div
              className="mt-10 bg-gradient-to-br from-white via-gray-50 to-white border-l-4 border-black p-8 rounded-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 relative overflow-hidden group"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative z-10">
                {isArabic ? 'فترة التقديم:' : 'Application Period:'}
              </h3>
              <p className="text-white mb-1 text-xl font-bold relative z-10 flex items-center gap-3">
                <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">📅</span>
                <span>{isArabic
                  ? 'من 01/12/2025 إلى 30/12/2025'
                  : 'From 1/12/2025 to 30/12/2025'}</span>
              </p>
            </div>

            <div
              className="bg-gradient-to-br from-white via-gray-50 to-white border-l-4 border-black p-8 rounded-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 mt-10 relative overflow-hidden group"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <h3 className="text-2xl md:text-3xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative z-10">
                {isArabic ? 'خطوات التقديم:' : 'Application Steps:'}
              </h3>
              <ol className="list-none space-y-5 text-white pl-0 relative z-10">
                <li className="flex items-start gap-4 bg-gray-800/70 p-4 rounded-xl hover:bg-gray-700 hover:shadow-lg transition-all duration-300 group/item border border-gray-700 hover:border-gray-500">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-full flex items-center justify-center font-extrabold text-base shadow-lg group-hover/item:scale-110 transition-transform duration-300">1</span>
                  <span className="flex-1">{isArabic
                    ? 'املأ نموذج التقديم بالكامل'
                    : 'Complete the application form'}</span>
                </li>
                <li className="flex items-start gap-4 bg-gray-800/70 p-4 rounded-xl hover:bg-gray-700 hover:shadow-lg transition-all duration-300 group/item border border-gray-700 hover:border-gray-500">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-full flex items-center justify-center font-extrabold text-base shadow-lg group-hover/item:scale-110 transition-transform duration-300">2</span>
                  <span className="flex-1 text-white font-semibold text-lg group-hover/item:text-gray-100 transition-colors">{isArabic
                    ? 'قم برفع بطاقة الهوية (الوجه الأمامي والخلفي)'
                    : 'Upload your National ID (front and back)'}</span>
                </li>
                <li className="flex items-start gap-4 bg-gray-800/70 p-4 rounded-xl hover:bg-gray-700 hover:shadow-lg transition-all duration-300 group/item border border-gray-700 hover:border-gray-500">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-full flex items-center justify-center font-extrabold text-base shadow-lg group-hover/item:scale-110 transition-transform duration-300">3</span>
                  <span className="flex-1 text-white font-semibold text-lg group-hover/item:text-gray-100 transition-colors">{isArabic
                    ? 'وافق على الشروط والأحكام'
                    : 'Agree to terms and conditions'}</span>
                </li>
                <li className="flex items-start gap-4 bg-gray-800/70 p-4 rounded-xl hover:bg-gray-700 hover:shadow-lg transition-all duration-300 group/item border border-gray-700 hover:border-gray-500">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-full flex items-center justify-center font-extrabold text-base shadow-lg group-hover/item:scale-110 transition-transform duration-300">4</span>
                  <span className="flex-1 text-white font-semibold text-lg group-hover/item:text-gray-100 transition-colors">{isArabic
                    ? 'احصل على الكوبون الخاص بك فوراً'
                    : 'Receive your coupon immediately'}</span>
                </li>
                <li className="flex items-start gap-4 bg-gray-800/70 p-4 rounded-xl hover:bg-gray-700 hover:shadow-lg transition-all duration-300 group/item border border-gray-700 hover:border-gray-500">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-full flex items-center justify-center font-extrabold text-base shadow-lg group-hover/item:scale-110 transition-transform duration-300">5</span>
                  <span className="flex-1 text-white font-semibold text-lg group-hover/item:text-gray-100 transition-colors">{isArabic
                    ? 'ستتلقى تفاصيل موعد المقابلة'
                    : 'Receive interview appointment details'}</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Security Notice */}
          <div
            className="bg-gradient-to-br from-white via-gray-50 to-white border-l-4 border-gray-900 p-8 mb-10 rounded-2xl shadow-2xl relative overflow-hidden group"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <p className="text-sm md:text-base text-white mb-2 font-semibold relative z-10">
              <strong className="text-xl flex items-center gap-3 mb-2">
                <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">🔒</span>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">{isArabic ? 'تنبيه أمني:' : 'Security Notice:'}</span>
              </strong>{' '}
              {isArabic
                ? 'هذا إعلان رسمي من وزارة التربية والتعليم المصرية. جميع المحتويات محمية ولا يمكن نسخها أو لصقها أو التقاط لقطات شاشة منها. يرجى التأكد من أنك تتقدم من خلال النطاق الرسمي فقط.'
                : 'This is an official advertisement from the Egyptian Ministry of Education. All content is protected and cannot be copied, pasted, or screenshotted. Please ensure you are applying through the official domain only.'}
            </p>
          </div>

          {/* Social Sharing */}
          <div className="mb-8 p-6 bg-gray-900/50 rounded-lg">
            <SocialShare />
          </div>

          {/* Step-by-Step Guide */}
          <div className="bg-gradient-to-br from-white via-gray-50 to-white p-10 rounded-3xl mb-10 border-2 border-gray-300 shadow-2xl hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative z-10"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic ? 'كيفية التقديم' : 'How to Apply'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="text-center p-8 glass-effect rounded-2xl shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 border-2 border-white/30 hover:border-white/50 relative overflow-hidden group/item">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                <div className="text-6xl mb-5 transform hover:scale-125 transition-transform duration-500 relative z-10">📝</div>
                <h4
                  className="font-black mb-4 text-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative z-10"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {isArabic ? 'الخطوة 1: املأ النموذج' : 'Step 1: Fill the form'}
                </h4>
                <p className="text-base text-white mt-2 font-semibold relative z-10">
                  {isArabic
                    ? 'أدخل بياناتك وقم برفع بطاقة الهوية'
                    : 'Enter your details and upload ID'}
                </p>
              </div>
              <div className="text-center p-8 glass-effect rounded-2xl shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 border-2 border-white/30 hover:border-white/50 relative overflow-hidden group/item">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                <div className="text-6xl mb-5 transform hover:scale-125 transition-transform duration-500 relative z-10">✅</div>
                <h4
                  className="font-black mb-4 text-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative z-10"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {isArabic
                    ? 'الخطوة 2: احصل على الكوبون'
                    : 'Step 2: Get your coupon'}
                </h4>
                <p className="text-base text-white mt-2 font-semibold relative z-10">
                  {isArabic
                    ? 'استلم الكوبون فوراً بعد إرسال الطلب'
                    : 'Receive your coupon immediately'}
                </p>
              </div>
              <div className="text-center p-8 glass-effect rounded-2xl shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 border-2 border-white/30 hover:border-white/50 relative overflow-hidden group/item">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                <div className="text-6xl mb-5 transform hover:scale-125 transition-transform duration-500 relative z-10">📅</div>
                <h4
                  className="font-black mb-4 text-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative z-10"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {isArabic
                    ? 'الخطوة 3: احضر المقابلة'
                    : 'Step 3: Attend interview'}
                </h4>
                <p className="text-base text-white mt-2 font-semibold relative z-10">
                  {isArabic
                    ? 'أحضر المستندات المطلوبة في موعد المقابلة'
                    : 'Bring your documents to the interview'}
                </p>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="text-center mt-10">
            <Link
              href="/apply"
              className="inline-block bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white font-black py-7 px-20 rounded-2xl text-xl md:text-2xl lg:text-3xl transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] transform hover:scale-110 hover:-translate-y-3 relative overflow-hidden group border-2 border-gray-800 hover:border-gray-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-4 tracking-tight" dir={isArabic ? 'rtl' : 'ltr'}>
                <span className="text-3xl transform group-hover:rotate-12 transition-transform duration-300">◆</span>
                <span className="font-black">{isArabic ? 'ابدأ التقديم الآن' : 'Apply Now'}</span>
                <span className="text-3xl transform group-hover:-rotate-12 transition-transform duration-300">◆</span>
              </span>
            </Link>
            <p
              className="text-sm text-white mt-4"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic
                ? 'اضغط للبدء في التقديم'
                : 'Click to start your application'}
            </p>
          </div>
          </div>
        </div>
      </div>

        {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-2xl shadow-2xl p-8 text-center hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 border-2 border-white/30 hover:border-white/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-6xl mb-5 transform hover:scale-125 transition-transform duration-500 relative z-10">🔒</div>
            <h3 className="font-black mb-3 text-2xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative z-10">
              {isArabic ? 'آمن' : 'Secure'}
            </h3>
            <p className="text-base text-white font-semibold relative z-10">
              {isArabic ? 'مشفّر ببروتوكول SSL' : 'SSL Encrypted'}
            </p>
          </div>
          <div className="glass-effect rounded-2xl shadow-2xl p-8 text-center hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 border-2 border-white/30 hover:border-white/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-6xl mb-5 transform hover:scale-125 transition-transform duration-500 relative z-10">✅</div>
            <h3 className="font-black mb-3 text-2xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative z-10">
              {isArabic ? 'رسمي' : 'Official'}
            </h3>
            <p className="text-base text-white font-semibold relative z-10">
              {isArabic ? 'موثّق من الوزارة' : 'Ministry Verified'}
            </p>
          </div>
          <div className="glass-effect rounded-2xl shadow-2xl p-8 text-center hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 border-2 border-white/30 hover:border-white/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-6xl mb-5 transform hover:scale-125 transition-transform duration-500 relative z-10">💳</div>
            <h3 className="font-black mb-3 text-2xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative z-10">
              {isArabic ? 'دفع آمن' : 'Secure Payment'}
            </h3>
            <p className="text-base text-white font-semibold relative z-10">
              {isArabic ? 'محمي بواسطة Paymob' : 'Paymob Protected'}
            </p>
          </div>
        </div>
    </div>
  )
}


