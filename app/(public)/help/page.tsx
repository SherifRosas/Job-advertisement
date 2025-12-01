'use client'

import Link from 'next/link'
import { useState } from 'react'

interface FAQItem {
  question: string
  questionAr: string
  answer: string
  answerAr: string
}

const faqs: FAQItem[] = [
  {
    question: 'How do I apply for this position?',
    questionAr: 'كيف أتقدم لهذه الوظيفة؟',
    answer: 'You need to: 1) Login with your Gmail account, 2) Verify your email and phone number, 3) Fill out the application form and upload your National ID, 4) Complete the payment of 1,000 EGP, 5) Download your coupon and attend the interview.',
    answerAr: 'تحتاج إلى: 1) تسجيل الدخول بحساب Gmail الخاص بك، 2) التحقق من بريدك الإلكتروني ورقم هاتفك، 3) ملء نموذج الطلب وتحميل بطاقة الهوية، 4) إكمال الدفع 1000 جنيه، 5) تحميل الكوبون الخاص بك وحضور المقابلة.',
  },
  {
    question: 'What documents do I need?',
    questionAr: 'ما هي المستندات التي أحتاجها؟',
    answer: 'You need to upload both sides of your National ID card (front and back) during the application process. You will also need to bring official documents to the interview.',
    answerAr: 'تحتاج إلى تحميل جانبي بطاقة الهوية (الوجه الأمامي والخلفي) أثناء عملية التقديم. ستحتاج أيضًا إلى إحضار المستندات الرسمية إلى المقابلة.',
  },
  {
    question: 'How much is the application fee?',
    questionAr: 'كم رسوم التقديم؟',
    answer: 'The application fee is 1,000 EGP. This fee must be paid before you can receive your interview coupon.',
    answerAr: 'رسوم التقديم هي 1000 جنيه. يجب دفع هذه الرسوم قبل أن تتمكن من الحصول على كوبون المقابلة الخاص بك.',
  },
  {
    question: 'What payment methods are accepted?',
    questionAr: 'ما هي طرق الدفع المقبولة؟',
    answer: 'We accept credit cards, debit cards, mobile wallets, and bank transfers through our secure payment gateway.',
    answerAr: 'نقبل بطاقات الائتمان والخصم والمحافظ الإلكترونية والتحويلات البنكية من خلال بوابة الدفع الآمنة لدينا.',
  },
  {
    question: 'When will I receive my interview appointment?',
    questionAr: 'متى سأحصل على موعد المقابلة؟',
    answer: 'After successful payment, you will immediately receive your coupon and interview appointment details. The interview is typically scheduled 7 days after payment.',
    answerAr: 'بعد الدفع الناجح، ستحصل فورًا على الكوبون وتفاصيل موعد المقابلة. عادة ما يتم جدولة المقابلة بعد 7 أيام من الدفع.',
  },
  {
    question: 'What if I have technical issues?',
    questionAr: 'ماذا لو واجهت مشاكل تقنية؟',
    answer: 'If you encounter any technical issues, please contact our support team. You can also use the AI chatbot on the website for immediate assistance.',
    answerAr: 'إذا واجهت أي مشاكل تقنية، يرجى الاتصال بفريق الدعم. يمكنك أيضًا استخدام روبوت المحادثة الذكي على الموقع للحصول على مساعدة فورية.',
  },
  {
    question: 'Can I edit my application after submission?',
    questionAr: 'هل يمكنني تعديل طلبي بعد التقديم؟',
    answer: 'Once submitted, you cannot edit your application. However, your form data is automatically saved as a draft every 30 seconds, so you can resume if you need to complete it later.',
    answerAr: 'بمجرد التقديم، لا يمكنك تعديل طلبك. ومع ذلك، يتم حفظ بيانات النموذج تلقائيًا كمسودة كل 30 ثانية، حتى تتمكن من متابعة العمل إذا كنت بحاجة إلى إكماله لاحقًا.',
  },
  {
    question: 'How do I check my application status?',
    questionAr: 'كيف أتحقق من حالة طلبي؟',
    answer: 'You can check your application status by visiting the Status page after logging in. It will show your payment status, selection status, and interview details.',
    answerAr: 'يمكنك التحقق من حالة طلبك عن طريق زيارة صفحة الحالة بعد تسجيل الدخول. ستعرض حالة الدفع وحالة الاختيار وتفاصيل المقابلة.',
  },
]

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
          <p className="text-xl text-gray-600 mb-2">المساعدة والدعم</p>
          <p className="text-gray-600">
            Find answers to common questions and get support
          </p>
          <p className="text-gray-600 text-sm">ابحث عن إجابات للأسئلة الشائعة واحصل على الدعم</p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-6 text-sm">الأسئلة الشائعة</p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-sm text-gray-600 mt-1">{faq.questionAr}</p>
                  </div>
                  <span className="text-2xl text-gray-400 ml-4">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 mb-2">{faq.answer}</p>
                    <p className="text-gray-700 text-sm">{faq.answerAr}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
          <p className="text-gray-600 mb-6 text-sm">اتصل بالدعم</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">📧 Email Support</h3>
              <p className="text-sm text-gray-700">support@education.gov.eg</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">💬 Live Chat</h3>
              <p className="text-sm text-gray-700">Use the AI chatbot on any page</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold mb-2">🕒 Support Hours</h3>
              <p className="text-sm text-gray-700">Sunday - Thursday: 9 AM - 5 PM</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold mb-2">🔒 Security Issues</h3>
              <p className="text-sm text-gray-700">security@education.gov.eg</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/apply"
              className="p-4 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/status"
              className="p-4 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition-colors"
            >
              Check Status
            </Link>
            <Link
              href="/"
              className="p-4 bg-gray-600 text-white rounded-lg text-center hover:bg-gray-700 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

