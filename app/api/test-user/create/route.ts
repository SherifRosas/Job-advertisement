import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import crypto from 'crypto'

// Create a test user for development (bypasses OAuth)
export async function POST(request: NextRequest) {
  try {
    const { email, name, phoneNumber } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email)
    
    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: 'User already exists',
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          emailVerified: existingUser.emailVerified,
          phoneVerified: existingUser.phoneVerified,
        },
      })
    }

    // Create new test user
    const userId = crypto.randomUUID()
    const userData = {
      id: userId,
      email: email,
      name: name || 'Test User',
      emailVerified: true, // Auto-verify for test users
      phoneVerified: phoneNumber ? true : false,
      phoneNumber: phoneNumber || null,
    }

    const newUser = await db.createUser(userData)

    return NextResponse.json({
      success: true,
      message: 'Test user created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        emailVerified: newUser.emailVerified,
        phoneVerified: newUser.phoneVerified,
      },
    })
  } catch (error: any) {
    console.error('Error creating test user:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create test user' },
      { status: 500 }
    )
  }
}

