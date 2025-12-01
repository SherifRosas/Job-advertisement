const fs = require('fs');
const path = require('path');

const envContent = `# ============================================
# REQUIRED - Must Configure These
# ============================================

# Database URL (Get from Supabase/Neon)
# Visit: https://supabase.com or https://neon.tech
DATABASE_URL="postgresql://username:password@host:port/database_name"

# Google OAuth (Get from Google Cloud Console)
# Visit: https://console.cloud.google.com
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ============================================
# PRE-CONFIGURED - Already Set For You
# ============================================

NEXTAUTH_SECRET="iPrQ5q55KIZ7bCxu6wOIA9NoYlEZ1hIgEXiGOataS2Q="
NEXTAUTH_URL="http://localhost:3000"
SECURITY_MARK_SECRET="4joOVzq9/7YRihtaawSL6xR/IFyStPIurn6yaZtUlRE="
QR_CODE_SECRET="7j34U0wxW46iMbsYtgj0IcDmSN1PPLNYf46jRGNqABY="
ADMIN_GMAIL="sherifrosas.ai@gmail.com"

# ============================================
# ADMIN CREDENTIALS - Change These!
# ============================================

ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"

# ============================================
# OPTIONAL - Can Leave Empty For Now
# ============================================

PAYMOB_API_KEY=""
PAYMOB_INTEGRATION_ID=""
PAYMOB_HMAC_SECRET=""
OPENAI_API_KEY=""
EMAIL_SERVICE_API_KEY=""
EMAIL_FROM=""
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_PHONE_NUMBER=""
FACEBOOK_ACCESS_TOKEN=""
TWITTER_API_KEY=""
TWITTER_API_SECRET=""
LINKEDIN_CLIENT_ID=""
LINKEDIN_CLIENT_SECRET=""
NEXT_PUBLIC_GA_ID=""
`;

const envPath = path.join(__dirname, '.env.local');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists!');
  console.log('   Not overwriting. If you want to recreate it, delete it first.');
} else {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('');
  console.log('📝 Next steps:');
  console.log('   1. Open .env.local and update:');
  console.log('      - DATABASE_URL (get from Supabase/Neon)');
  console.log('      - GOOGLE_CLIENT_ID (get from Google Cloud)');
  console.log('      - GOOGLE_CLIENT_SECRET (get from Google Cloud)');
  console.log('      - ADMIN_EMAIL and ADMIN_PASSWORD (change these!)');
  console.log('');
  console.log('   2. Then run:');
  console.log('      npm run db:push');
  console.log('      npm run db:seed');
  console.log('      npm run dev');
  console.log('');
  console.log('📖 See INTERACTIVE_SETUP.md for detailed instructions');
}


