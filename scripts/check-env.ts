#!/usr/bin/env tsx

/**
 * Environment Variables Checker
 * Verifies all required environment variables are set
 */

const requiredVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'PAYMOB_API_KEY',
  'PAYMOB_INTEGRATION_ID',
  'PAYMOB_HMAC_SECRET',
  'OPENAI_API_KEY',
  'EMAIL_SERVICE_API_KEY',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_PHONE_NUMBER',
  'SECURITY_MARK_SECRET',
  'QR_CODE_SECRET',
  'ADMIN_GMAIL',
]

const optionalVars = [
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
  'EMAIL_SERVICE',
  'EMAIL_FROM',
  'FACEBOOK_ACCESS_TOKEN',
  'TWITTER_API_KEY',
  'TWITTER_API_SECRET',
  'LINKEDIN_CLIENT_ID',
  'LINKEDIN_CLIENT_SECRET',
  'NEXT_PUBLIC_GA_ID',
]

function checkEnv() {
  console.log('🔍 Checking environment variables...\n')

  let missing = 0
  let optional = 0

  console.log('Required Variables:')
  requiredVars.forEach((varName) => {
    const value = process.env[varName]
    if (value) {
      console.log(`  ✅ ${varName}`)
    } else {
      console.log(`  ❌ ${varName} - MISSING`)
      missing++
    }
  })

  console.log('\nOptional Variables:')
  optionalVars.forEach((varName) => {
    const value = process.env[varName]
    if (value) {
      console.log(`  ✅ ${varName}`)
    } else {
      console.log(`  ⚠️  ${varName} - Not set (optional)`)
      optional++
    }
  })

  console.log('\n' + '='.repeat(50))
  if (missing === 0) {
    console.log('✅ All required environment variables are set!')
    console.log(`⚠️  ${optional} optional variables are not set`)
    return 0
  } else {
    console.log(`❌ ${missing} required environment variable(s) are missing!`)
    console.log('Please set them in your .env.local file')
    return 1
  }
}

checkEnv()


