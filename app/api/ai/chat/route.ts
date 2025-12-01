import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: true,
        response: 'I apologize, but the AI assistant is not currently configured. Please contact support for assistance.',
      })
    }

    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.'

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


