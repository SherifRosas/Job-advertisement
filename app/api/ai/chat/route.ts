import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const SYSTEM_PROMPT = `You are a helpful AI assistant for the Egyptian Ministry of Education job advertisement system. 
You help applicants with questions about the Accounts Manager position.

Key information:
- Position: Accounts Manager (مدير حسابات)
- Organization: Egyptian Ministry of Education (وزارة التربية والتعليم المصرية)
- Application Period: From 1/12/2025 to 30/12/2025
- Required Experience: Experience in accounting management, preparing financial reports, and supervising the finance team
- Qualifications: Bachelor's degree in Accounting or equivalent, proficiency in using accounting software
- Interview Period: 15/12/2025 to 31/12/2025, 10:00 AM to 2:00 PM (excluding Thursdays, Fridays, Saturdays)
- Interview Location: Egyptian Ministry of Education - Cairo/Giza (near the Pyramids) - https://maps.google.com/?q=29.976688,31.309752

Be helpful, professional, and provide accurate information. If you don't know something, say so.
Respond in the same language as the user's question (Arabic or English). If the question is in Arabic, respond in Arabic. If in English, respond in English.`

// Smart fallback answers for common questions
function getFallbackAnswer(message: string): string | null {
  const lowerMessage = message.toLowerCase()
  const isArabic = /[\u0600-\u06FF]/.test(message)

  // Common questions patterns
  const patterns: Array<{ keywords: string[]; answer: { ar: string; en: string } }> = [
    {
      keywords: ['application', 'apply', 'تقديم', 'طلب'],
      answer: {
        ar: 'يمكنك التقديم من خلال النموذج الموجود على الصفحة الرئيسية. فترة التقديم من 1/12/2025 إلى 30/12/2025.',
        en: 'You can apply through the form on the home page. Application period is from 1/12/2025 to 30/12/2025.',
      },
    },
    {
      keywords: ['interview', 'مقابلة', 'موعد'],
      answer: {
        ar: 'ستكون المقابلات من 15/12/2025 إلى 31/12/2025، من الساعة 10 صباحاً حتى 2 ظهراً، باستثناء الخميس والجمعة والسبت. الموقع: وزارة التربية والتعليم - القاهرة/الجيزة (قرب الأهرامات).',
        en: 'Interviews will be from 15/12/2025 to 31/12/2025, from 10:00 AM to 2:00 PM, excluding Thursdays, Fridays, and Saturdays. Location: Egyptian Ministry of Education - Cairo/Giza (near the Pyramids).',
      },
    },
    {
      keywords: ['requirements', 'qualifications', 'متطلبات', 'مؤهلات'],
      answer: {
        ar: 'المتطلبات: درجة بكالوريوس في المحاسبة أو ما يعادلها، وإجادة استخدام برامج المحاسبة. الخبرة المطلوبة: خبرة في إدارة الحسابات، وإعداد التقارير المالية، والإشراف على الفريق المالي.',
        en: 'Requirements: Bachelor\'s degree in Accounting or equivalent, and proficiency in using accounting software. Required experience: Experience in accounting management, preparing financial reports, and supervising the finance team.',
      },
    },
    {
      keywords: ['location', 'address', 'مكان', 'عنوان'],
      answer: {
        ar: 'موقع المقابلة: وزارة التربية والتعليم - القاهرة/الجيزة (قرب الأهرامات). رابط الخريطة: https://maps.google.com/?q=29.976688,31.309752',
        en: 'Interview location: Egyptian Ministry of Education - Cairo/Giza (near the Pyramids). Map link: https://maps.google.com/?q=29.976688,31.309752',
      },
    },
    {
      keywords: ['hello', 'hi', 'مرحبا', 'السلام'],
      answer: {
        ar: 'مرحباً! كيف يمكنني مساعدتك اليوم بخصوص وظيفة مدير الحسابات بوزارة التربية والتعليم؟',
        en: 'Hello! How can I help you today regarding the Accounts Manager position at the Egyptian Ministry of Education?',
      },
    },
  ]

  for (const pattern of patterns) {
    if (pattern.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return isArabic ? pattern.answer.ar : pattern.answer.en
    }
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const isArabic = /[\u0600-\u06FF]/.test(message)

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      // Try fallback answer first
      const fallbackAnswer = getFallbackAnswer(message)
      if (fallbackAnswer) {
        return NextResponse.json({
          success: true,
          response: fallbackAnswer,
        })
      }

      // Generic fallback
      const fallbackResponse = isArabic
        ? 'مرحباً! للأسف، خدمة المساعد الآلي غير متاحة حالياً. يرجى مراجعة تفاصيل الإعلان على الصفحة الرئيسية أو التواصل مع الدعم.'
        : 'Hello! Unfortunately, the AI assistant is not available at the moment. Please review the job details on the home page or contact support.'

      return NextResponse.json({
        success: true,
        response: fallbackResponse,
      })
    }

    // Try fallback answer first (faster and free)
    const fallbackAnswer = getFallbackAnswer(message)
    if (fallbackAnswer) {
      return NextResponse.json({
        success: true,
        response: fallbackAnswer,
      })
    }

    // Initialize OpenAI client with timeout
    const openai = new OpenAI({
      apiKey: apiKey,
      timeout: 10000, // 10 second timeout
      maxRetries: 1,
    })

    // Create a promise with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 8000) // 8 second timeout
    })

    // Call OpenAI API with timeout protection
    const completionPromise = openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
      max_tokens: 200, // Reduced tokens for faster response
      temperature: 0.7,
    })

    let completion
    try {
      completion = await Promise.race([completionPromise, timeoutPromise]) as any
    } catch (timeoutError: any) {
      // Timeout or API error - use fallback
      const fallbackAnswer = getFallbackAnswer(message)
      if (fallbackAnswer) {
        return NextResponse.json({
          success: true,
          response: fallbackAnswer,
        })
      }

      const timeoutResponse = isArabic
        ? 'عذراً، استغرق الرد وقتاً طويلاً. يرجى المحاولة مرة أخرى أو مراجعة تفاصيل الإعلان على الصفحة الرئيسية.'
        : 'Sorry, the response took too long. Please try again or review the job details on the home page.'

      return NextResponse.json({
        success: true,
        response: timeoutResponse,
      })
    }

    const response = completion.choices[0]?.message?.content || (isArabic
      ? 'عذراً، لم أتمكن من إنشاء رد. يرجى المحاولة مرة أخرى.'
      : 'I apologize, but I could not generate a response. Please try again.')

    return NextResponse.json({
      success: true,
      response,
    })
  } catch (error: any) {
    console.error('Chat error:', error)

    const isArabic = /[\u0600-\u06FF]/.test(error.message || '')

    // Try fallback answer
    const fallbackAnswer = getFallbackAnswer(error.message || '')
    if (fallbackAnswer) {
      return NextResponse.json({
        success: true,
        response: fallbackAnswer,
      })
    }

    const errorResponse = isArabic
      ? 'عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقاً أو مراجعة تفاصيل الإعلان على الصفحة الرئيسية.'
      : 'I apologize, but I encountered an error. Please try again later or review the job details on the home page.'

    return NextResponse.json({
      success: true, // Return success even on error to show message
      response: errorResponse,
    })
  }
}


