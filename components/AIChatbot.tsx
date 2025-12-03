'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from './LanguageContext'

export default function AIChatbot() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: isArabic
        ? 'مرحباً! أنا "نافير" - مساعدك الذكي لدعم طلبات التوظيف. يمكنني مساعدتك في:\n\n📋 الإجابة على أسئلة الوظيفة\n📝 شرح خطوات التقديم\n📅 معلومات عن المقابلات\n📄 المستندات المطلوبة\n\nكيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I\'m "Numerous" - your smart job application support assistant. I can help you with:\n\n📋 Job-related questions\n📝 Application process steps\n📅 Interview information\n📄 Required documents\n\nHow can I assist you today?',
    },
  ])
  
  // Suggested questions
  const suggestedQuestions = isArabic
    ? [
        'ما هي متطلبات الوظيفة؟',
        'كيف أقدّم طلب التوظيف؟',
        'ما هي المستندات المطلوبة للمقابلة؟',
        'ما هو موعد آخر يوم للتقديم؟',
        'أين ستكون المقابلة؟',
        'ما هي خطوات التقديم؟',
      ]
    : [
        'What are the job requirements?',
        'How do I submit my application?',
        'What documents do I need for the interview?',
        'When is the application deadline?',
        'Where will the interview be held?',
        'What are the application steps?',
      ]
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Update welcome message when language changes
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([
        {
          role: 'assistant',
          content: isArabic
            ? 'مرحباً! أنا "نافير" - مساعدك الذكي لدعم طلبات التوظيف. يمكنني مساعدتك في:\n\n📋 الإجابة على أسئلة الوظيفة\n📝 شرح خطوات التقديم\n📅 معلومات عن المقابلات\n📄 المستندات المطلوبة\n\nكيف يمكنني مساعدتك اليوم؟'
            : 'Hello! I\'m "Numerous" - your smart job application support assistant. I can help you with:\n\n📋 Job-related questions\n📝 Application process steps\n📅 Interview information\n📄 Required documents\n\nHow can I assist you today?',
        },
      ])
    }
  }, [isArabic, messages.length])
  
  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    handleSend(question)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (messageToSend?: string) => {
    const message = messageToSend || input.trim()
    if (!message || loading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: message }])
    setLoading(true)

    try {
      // Create abort controller for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      if (data.success && data.response) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response },
        ])
      } else {
        const errorMsg = isArabic
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.'
          : 'I apologize, but I encountered an error. Please try again later.'
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: errorMsg },
        ])
      }
    } catch (error: any) {
      // Handle timeout or network errors
      if (error.name === 'AbortError' || error.message?.includes('timeout')) {
        const timeoutMsg = isArabic
          ? 'استغرق الرد وقتاً طويلاً. يرجى المحاولة مرة أخرى أو مراجعة تفاصيل الإعلان على الصفحة الرئيسية.'
          : 'The response took too long. Please try again or review the job details on the home page.'
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: timeoutMsg },
        ])
      } else {
        const errorMsg = isArabic
          ? 'عذراً، حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.'
          : 'Sorry, there was a connection error. Please check your internet connection and try again.'
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: errorMsg },
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="font-bold text-lg">
              {isArabic ? 'المساعد الآلي' : 'AI Assistant'}
            </h3>
            <div className="flex items-center gap-2">
              {/* Contact Support - Phone */}
              <a
                href="tel:+201205465036"
                className="text-white hover:text-gray-200 transition-colors text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
                aria-label={isArabic ? 'اتصل بالدعم' : 'Call Support'}
                title={isArabic ? 'اتصل: 01205465036' : 'Call: 01205465036'}
              >
                📞
              </a>
              {/* Contact Support - Email */}
              <a
                href="mailto:optimumoptimum959@gmail.com"
                className="text-white hover:text-gray-200 transition-colors text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
                aria-label={isArabic ? 'راسل الدعم' : 'Email Support'}
                title="optimumoptimum959@gmail.com"
              >
                ✉️
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
                aria-label={isArabic ? 'إغلاق' : 'Close'}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => {
              const isUserMsg = msg.role === 'user'
              const isRtl = /[\u0600-\u06FF]/.test(msg.content)
              return (
                <div
                  key={idx}
                  className={`flex ${isUserMsg ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 ${
                      isUserMsg
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                    }`}
                    dir={isRtl ? 'rtl' : 'ltr'}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  </div>
                </div>
              )
            })}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Show suggested questions only when there's just the welcome message */}
            {messages.length === 1 && !loading && (
              <div className="space-y-2 mt-4">
                <p className="text-xs text-gray-500 font-medium px-2">
                  {isArabic ? 'اقتراحات الأسئلة:' : 'Suggested questions:'}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-left px-4 py-2 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-sm text-gray-700 hover:text-blue-700 shadow-sm hover:shadow-md"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4 bg-white rounded-b-xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={
                  isArabic
                    ? 'اكتب رسالتك...'
                    : 'Type your message...'
                }
                className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                dir={isArabic ? 'rtl' : 'ltr'}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-md hover:shadow-lg"
              >
                {isArabic ? 'إرسال' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-button-modern fixed bottom-6 right-6 w-20 h-20 rounded-full flex items-center justify-center z-50 group cursor-pointer"
        aria-label={isArabic ? 'فتح المساعد الآلي' : 'Open AI Assistant'}
      >
        <div className="relative w-full h-full rounded-full flex items-center justify-center">
          {isOpen ? (
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <>
              <svg
                className="w-10 h-10 text-white transform transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                <circle cx="9" cy="10" r="1.5" fill="white" opacity="0.9" />
                <circle cx="15" cy="10" r="1.5" fill="white" opacity="0.9" />
              </svg>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center border-2 border-white shadow-xl sparkle-icon">
                <span className="text-white text-xs">✨</span>
              </div>
            </>
          )}
        </div>
      </button>
    </>
  )
}


