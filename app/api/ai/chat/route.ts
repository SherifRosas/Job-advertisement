import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const SYSTEM_PROMPT = `You are "Numerous" (نافير), a helpful AI support assistant for the Egyptian Ministry of Education job advertisement system. 
Your role is to help applicants with questions about the Accounts Manager position and the application process.

Key Job Information:
- Position: Accounts Manager (مدير حسابات)
- Organization: Egyptian Ministry of Education (وزارة التربية والتعليم المصرية)
- Application Period: From 1/12/2025 to 30/12/2025
- Required Experience: Experience in accounting management, preparing financial reports, and supervising the finance team
- Qualifications: Bachelor's degree in Accounting or equivalent, proficiency in using accounting software
- Interview Period: 15/12/2025 to 31/12/2025, 10:00 AM to 2:00 PM (excluding Thursdays, Fridays, Saturdays)
- Interview Location: Egyptian Ministry of Education - Cairo/Giza (near the Pyramids) - https://maps.google.com/?q=29.976688,31.309752

Your responsibilities:
- Answer questions about job requirements and qualifications
- Explain the application process step-by-step
- Provide information about interviews (dates, times, location)
- Help with document requirements
- Clarify payment and coupon procedures
- Assist with any job-related inquiries

Be helpful, professional, and clear. Always respond in the same language as the user's question (Arabic or English).`

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
      keywords: ['interview', 'مقابلة', 'موعد', 'مقابله', 'مقابلات', 'معلومات عن المقابله', 'معلومات عن المقابلة', 'interview information', 'interview details'],
      answer: {
        ar: 'معلومات المقابلة:\n\n📅 الفترة: من 15/12/2025 إلى 31/12/2025\n⏰ الوقت: من الساعة 10 صباحاً حتى 2 ظهراً\n🚫 الأيام المستثناة: الخميس والجمعة والسبت\n📍 الموقع: وزارة التربية والتعليم - القاهرة/الجيزة (قرب الأهرامات)\n🗺️ رابط الخريطة: https://maps.google.com/?q=29.976688,31.309752\n\nيرجى الحضور في الموعد المحدد مع المستندات المطلوبة.',
        en: 'Interview Information:\n\n📅 Period: From 15/12/2025 to 31/12/2025\n⏰ Time: From 10:00 AM to 2:00 PM\n🚫 Excluded Days: Thursdays, Fridays, and Saturdays\n📍 Location: Egyptian Ministry of Education - Cairo/Giza (near the Pyramids)\n🗺️ Map Link: https://maps.google.com/?q=29.976688,31.309752\n\nPlease arrive at the scheduled time with required documents.',
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
        ar: 'مرحباً! أنا "نافير" - مساعدك الذكي لدعم طلبات التوظيف. كيف يمكنني مساعدتك اليوم؟',
        en: 'Hello! I\'m "Numerous" - your smart job application support assistant. How can I help you today?',
      },
    },
    {
      keywords: ['steps', 'process', 'خطوات', 'عملية'],
      answer: {
        ar: 'خطوات التقديم:\n\n1️⃣ املأ نموذج التقديم بالكامل\n2️⃣ قم برفع بطاقة الهوية (الوجه الأمامي والخلفي)\n3️⃣ وافق على الشروط والأحكام\n4️⃣ احصل على الكوبون الخاص بك فوراً\n5️⃣ ستتلقى تفاصيل موعد المقابلة\n\nهل تحتاج مساعدة في أي خطوة محددة؟',
        en: 'Application steps:\n\n1️⃣ Complete the application form\n2️⃣ Upload your National ID (front and back)\n3️⃣ Agree to terms and conditions\n4️⃣ Receive your coupon immediately\n5️⃣ You will receive interview appointment details\n\nDo you need help with any specific step?',
      },
    },
    {
      keywords: ['documents', 'papers', 'مستندات', 'أوراق'],
      answer: {
        ar: 'المستندات المطلوبة:\n\n📄 بطاقة الهوية الوطنية (الوجه الأمامي والخلفي)\n📄 المستندات الرسمية (ستُطلب في يوم المقابلة)\n\nتأكد من أن صور بطاقة الهوية واضحة ويمكن قراءتها.',
        en: 'Required documents:\n\n📄 National ID card (front and back)\n📄 Official documents (will be requested on interview day)\n\nMake sure ID card photos are clear and readable.',
      },
    },
    {
      keywords: ['payment', 'pay', 'دفع', 'دفعة'],
      answer: {
        ar: 'معلومات الدفع:\n\n💰 المبلغ: 1,000 جنيه مصري\n💳 طرق الدفع: بطاقات الائتمان/الخصم، المحافظ الإلكترونية، التحويل البنكي\n🔒 آمن ومحمي بواسطة Paymob\n\nبعد الدفع الناجح، ستحصل على الكوبون فوراً.',
        en: 'Payment information:\n\n💰 Amount: 1,000 Egyptian Pounds\n💳 Payment methods: Credit/Debit cards, Mobile wallets, Bank transfer\n🔒 Secure and protected by Paymob\n\nAfter successful payment, you will receive your coupon immediately.',
      },
    },
  ]

  // Check patterns - use more flexible matching
  for (const pattern of patterns) {
    // Check if any keyword appears in the message (case-insensitive, handles variations)
    const matches = pattern.keywords.some((keyword) => {
      const normalizedKeyword = keyword.toLowerCase().trim()
      const messageWithoutDiacritics = isArabic 
        ? message.replace(/[\u064B-\u065F\u0670]/g, '').toLowerCase()
        : lowerMessage
      return lowerMessage.includes(normalizedKeyword) || 
             messageWithoutDiacritics.includes(normalizedKeyword) ||
             message.toLowerCase().includes(keyword.toLowerCase())
    })
    
    if (matches) {
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

    // ALWAYS try fallback answer first (faster, free, and more reliable)
    const fallbackAnswer = getFallbackAnswer(message)
    if (fallbackAnswer) {
      // Return immediately - no API call needed
      return NextResponse.json({
        success: true,
        response: fallbackAnswer,
      })
    }

    // Only use OpenAI for questions not covered by fallback
    // Use shorter timeout for faster response
    const openai = new OpenAI({
      apiKey: apiKey,
      timeout: 5000, // Reduced to 5 second timeout
      maxRetries: 0, // No retries for faster failure
    })

    // Create a promise with shorter timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 4000) // 4 second timeout
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


