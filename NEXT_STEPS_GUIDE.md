# Next Steps Guide - Getting Started

## 🚀 Quick Start (Step by Step)

### Step 1: Set Up Environment Variables

1. **Create `.env.local` file** in the root directory:
```bash
# Copy the example file
cp .env.local.example .env.local
```

2. **Open `.env.local`** and fill in the required values:

#### Minimum Required (to get started):
```env
# Database (you can use a free PostgreSQL service like Supabase or Neon)
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth (generate a random secret)
NEXTAUTH_SECRET="your-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (get from https://console.cloud.google.com/)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Admin Gmail (for QR code reactivation)
ADMIN_GMAIL="sherifrosas.ai@gmail.com"

# Security Secrets (generate random strings)
SECURITY_MARK_SECRET="your-security-secret"
QR_CODE_SECRET="your-qr-secret"
```

#### Optional (can add later):
```env
# Paymob (for payments - can test without it first)
PAYMOB_API_KEY=""
PAYMOB_INTEGRATION_ID=""
PAYMOB_HMAC_SECRET=""

# OpenAI (for AI features - can test without it)
OPENAI_API_KEY=""

# Email Service (for sending emails - can test without it)
EMAIL_SERVICE_API_KEY=""
EMAIL_FROM="noreply@yourdomain.com"

# SMS Service (for SMS - can test without it)
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_PHONE_NUMBER=""
```

### Step 2: Set Up Database

#### Option A: Use a Free Cloud Database (Recommended for Testing)

1. **Sign up for a free PostgreSQL service:**
   - [Supabase](https://supabase.com/) - Free tier available
   - [Neon](https://neon.tech/) - Free tier available
   - [Railway](https://railway.app/) - Free tier available

2. **Get your connection string** from the service dashboard
3. **Add it to `.env.local`** as `DATABASE_URL`

#### Option B: Use Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database:
```sql
CREATE DATABASE job_advertisement;
```
3. Add connection string to `.env.local`

### Step 3: Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with default settings
npm run db:seed
```

### Step 4: Set Up Google OAuth (For Gmail Login)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set Application type: "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret to `.env.local`

### Step 5: Generate Security Secrets

Run these commands to generate random secrets:

```bash
# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate SECURITY_MARK_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate QR_CODE_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the outputs to your `.env.local` file.

### Step 6: Set Admin Credentials

Add to `.env.local`:
```env
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
```

### Step 7: Run the Application

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 8: Test the Application

#### Test as Applicant:
1. Visit homepage
2. Click "Apply Now"
3. Login with Gmail
4. Verify email (check console for code if email not configured)
5. Verify phone (check console for code if SMS not configured)
6. Fill application form
7. Upload National ID images
8. Submit application

#### Test as Admin:
1. Go to `/admin/login`
2. Login with admin credentials
3. View dashboard
4. Manage applications
5. Test selection
6. Test advertisement closure

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npm run db:studio
# This opens Prisma Studio - if it works, database is connected
```

### Environment Variables Not Loading
- Make sure file is named `.env.local` (not `.env`)
- Restart the dev server after changing `.env.local`
- Check for typos in variable names

### Google OAuth Not Working
- Verify redirect URI matches exactly
- Check Client ID and Secret are correct
- Make sure Google+ API is enabled

### Payment Not Working
- Payment will work in "simulated mode" without Paymob
- For real payments, configure Paymob credentials
- Check payment callback URL in Paymob dashboard

## 📋 Checklist

Before running:
- [ ] `.env.local` file created
- [ ] `DATABASE_URL` configured
- [ ] `NEXTAUTH_SECRET` set
- [ ] Google OAuth credentials added
- [ ] Security secrets generated
- [ ] Admin credentials set
- [ ] Database initialized (`npm run db:push`)
- [ ] Database seeded (`npm run db:seed`)

## 🎯 What Works Without External Services

You can test most features without external services:
- ✅ Application form
- ✅ Database operations
- ✅ Admin dashboard
- ✅ Content protection
- ✅ Basic authentication

These need external services (but have fallbacks):
- ⚠️ Email verification (logs to console if not configured)
- ⚠️ SMS verification (logs to console if not configured)
- ⚠️ Payment (simulated mode available)
- ⚠️ AI features (basic fallback available)

## 🚀 Next Steps After Basic Setup

1. **Test the complete flow** as both applicant and admin
2. **Configure Paymob** for real payments
3. **Set up OpenAI** for AI features
4. **Configure email service** for email sending
5. **Set up Twilio** for SMS
6. **Deploy to production** (see `DEPLOYMENT.md`)

## 💡 Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Utilities
npm run lint             # Check code quality
```

## 📞 Need Help?

- Check `REQUIRED_CONFIGURATION.md` for detailed configuration
- See `SETUP_GUIDE.md` for setup instructions
- Review `DEPLOYMENT.md` for production deployment
- Check console logs for error messages

---

**You're ready to start!** Begin with Step 1 and work through each step. The application will work with minimal configuration, and you can add external services gradually.


