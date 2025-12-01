import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a helpful AI assistant for the Egyptian Ministry of Education job advertisement system. 
You help applicants with questions about the Financial Accounts Manager position.

Key information:
- Position: Financial Accounts Manager
- Organization: Egyptian Ministry of Education
- Application fee: 1,000 EGP
- Payment methods: Credit card, debit card, mobile wallet, bank transfer
- Selection process: Within one month of advertisement publication
- Requirements: Bachelor's degree in Accounting/Finance, 5+ years experience

Be helpful, professional, and provide accurate information. If you don't know something, say so.
Respond in both Arabic and English when appropriate.`

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    // For now, return a simple static response without calling OpenAI
    const response = `
${SYSTEM_PROMPT}

سؤالك / Your question:
${message}

إجابة توضيحية: تم استلام سؤالك بخصوص إعلان وظيفة مدير الحسابات بوزارة التربية والتعليم. 
يرجى مراجعة تفاصيل الإعلان على الصفحة الرئيسية ونموذج التقديم للمزيد من المعلومات.

Clarification: Your question about the Accounts Manager job posting at the Egyptian Ministry of Education was received.
Please review the job details on the home page and the application form for more information.
`.trim()

    return NextResponse.json({
      success: true,
      response,
    })
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json({
      success: true,
      response: 'I apologize, but I encountered an error. Please try again later or contact support.',
    })
  }
}


