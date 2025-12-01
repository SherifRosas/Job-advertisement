# Required Configuration & Credentials

This document lists all the information, credentials, and configurations you need to provide for the application to run successfully.

---

## 🔐 Critical Information (Required for Core Functionality)

### 1. Admin Gmail for Advertisement Reactivation
- **Gmail Address**: `sherifrosas.ai@gmail.com`
- **Purpose**: 
  - Receives QR code when advertisement is closed
  - Required for Gmail authentication during reactivation
  - Must match the Gmail used for reactivation
- **Status**: Advertisement is permanently closed and can only be reactivated with this Gmail + QR code

### 2. Database Configuration
- **Database Type**: PostgreSQL
- **Required Information**:
  - Database host/URL
  - Database name
  - Database username
  - Database password
  - Port (default: 5432)
- **Format**: `postgresql://username:password@host:port/database_name`
- **Note**: You can use local PostgreSQL or a cloud service (AWS RDS, Supabase, etc.)

### 3. Google OAuth (Gmail Login)
- **Required**:
  - Google Client ID
  - Google Client Secret
  - Authorized redirect URIs
- **How to Get**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or select existing
  3. Enable Google+ API
  4. Create OAuth 2.0 credentials
  5. Add authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
- **Note**: Required for applicant Gmail login

---

## 💳 Payment Gateway (Paymob)

### Paymob Credentials
- **API Key**: Your Paymob API key
- **Integration ID**: Your Paymob integration ID
- **HMAC Secret**: For webhook verification
- **How to Get**:
  1. Sign up at [Paymob](https://paymob.com/)
  2. Get your API credentials from dashboard
  3. Set up webhook URL: `https://yourdomain.com/api/payments/callback`
- **Note**: This is the Egyptian payment gateway for processing 1,000 EGP payments

---

## 🤖 AI Services

### OpenAI API
- **API Key**: Your OpenAI API key
- **Purpose**: 
  - AI data verification
  - AI chatbot responses
  - AI-generated promotional content
  - Automated messaging
- **How to Get**:
  1. Sign up at [OpenAI](https://platform.openai.com/)
  2. Generate API key from dashboard
- **Note**: Required for all AI features

---

## 📧 Email Service

### Email Provider (SendGrid or Resend)
**Option 1: SendGrid**
- **API Key**: Your SendGrid API key
- **From Email**: Verified sender email address
- **How to Get**: Sign up at [SendGrid](https://sendgrid.com/)

**Option 2: Resend**
- **API Key**: Your Resend API key
- **From Email**: Verified sender email address
- **How to Get**: Sign up at [Resend](https://resend.com/)

**Purpose**:
- Email verification codes
- Payment receipts
- Interview reminders
- Selection notifications
- QR code delivery to admin Gmail

---

## 📱 SMS Service (Twilio)

### Twilio Credentials
- **Account SID**: Your Twilio Account SID
- **Auth Token**: Your Twilio Auth Token
- **Phone Number**: Your Twilio phone number
- **How to Get**:
  1. Sign up at [Twilio](https://www.twilio.com/)
  2. Get credentials from dashboard
  3. Purchase a phone number
- **Purpose**: Phone verification via SMS

---

## 🌐 Domain & URL Configuration

### Application URLs
- **Application URL**: `https://yourdomain.com` (or `http://localhost:3000` for development)
- **API Base URL**: `https://yourdomain.com/api`
- **Admin Panel URL**: `https://yourdomain.com/admin`
- **Payment Callback URL**: `https://yourdomain.com/api/payments/callback`
- **OAuth Callback URL**: `https://yourdomain.com/api/auth/callback/google`

### Domain Requirements
- **SSL Certificate**: Required for HTTPS (production)
- **Domain Verification**: For official Ministry domain
- **DNS Configuration**: Point domain to hosting server

---

## 🔒 Security Secrets

### Application Secrets
- **NEXTAUTH_SECRET**: Random secret string (generate using: `openssl rand -base64 32`)
- **SECURITY_MARK_SECRET**: Secret for generating security marks
- **QR_CODE_SECRET**: Secret for QR code encryption/decryption
- **Database Encryption Key**: If encrypting sensitive data

**How to Generate**:
```bash
# Generate random secrets
openssl rand -base64 32
```

---

## 📊 Analytics & Tracking

### Google Analytics (Optional but Recommended)
- **Measurement ID**: GA4 Measurement ID (format: G-XXXXXXXXXX)
- **How to Get**: Create property in [Google Analytics](https://analytics.google.com/)

### Social Media API Keys (For Promotion)

**Facebook**
- **Access Token**: Facebook Graph API access token
- **Page ID**: Your Facebook page ID
- **How to Get**: [Facebook Developers](https://developers.facebook.com/)

**Twitter/X**
- **API Key**: Twitter API key
- **API Secret**: Twitter API secret
- **Access Token**: Twitter access token
- **Access Token Secret**: Twitter access token secret
- **How to Get**: [Twitter Developer Portal](https://developer.twitter.com/)

**LinkedIn**
- **Client ID**: LinkedIn OAuth client ID
- **Client Secret**: LinkedIn OAuth client secret
- **How to Get**: [LinkedIn Developers](https://www.linkedin.com/developers/)

---

## 🏦 Bank Account Information (For Settings)

### Bank Account Details
- **Bank Name**: (e.g., "National Bank of Egypt")
- **Account Number**: Bank account number for payments
- **Account Holder Name**: Name on the account
- **Bank Details**: Additional bank information
- **Note**: This will be displayed to applicants for bank transfer option

---

## 📋 Advertisement Settings

### Initial Advertisement Configuration
- **Advertisement Start Date**: When the advertisement goes live
- **Selection Deadline**: Within 1 month of publication
- **Interview Location**: Physical or online location for interviews
- **Job Title**: "Financial Accounts Manager"
- **Job Description**: Full job description text
- **Job Requirements**: List of requirements

---

## 🎨 Branding Assets

### Official Logos
- **Ministry Logo**: Already in `Official-logo/` folder
  - `28629918-c2a3-4e84-b855-0bd30046e219.jfif`
  - `c184a4ff-03f5-4548-9ffe-4fc723b9acc4.jfif`
- **Additional Assets** (if needed):
  - Favicon
  - Social media preview images
  - Email template logos

---

## 📝 Content & Translations

### Bilingual Content
- **Arabic Content**: Modern Standard Arabic translations
  - Job description
  - Form labels
  - Error messages
  - Email templates
  - Legal pages (Terms, Privacy)
- **English Content**: English translations
  - Same content as Arabic but in English

### Legal Pages Content
- **Terms of Service**: Full terms and conditions text
- **Privacy Policy**: Complete privacy policy text
- **Copyright Notice**: Copyright text for footer

---

## 🔧 Development vs Production

### Development Environment
- **Database**: Local PostgreSQL or cloud (free tier OK)
- **URL**: `http://localhost:3000`
- **SSL**: Not required
- **Email**: Can use test email service or development mode
- **SMS**: Can use Twilio test credentials

### Production Environment
- **Database**: Production PostgreSQL (recommended: managed service)
- **URL**: Your official domain with HTTPS
- **SSL**: Required (Let's Encrypt or paid certificate)
- **Email**: Production email service account
- **SMS**: Production Twilio account
- **Monitoring**: Error tracking (Sentry, etc.)
- **Backup**: Database backup strategy

---

## 📦 Environment Variables Template

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database_name"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="https://yourdomain.com"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Paymob
PAYMOB_API_KEY="your-paymob-api-key"
PAYMOB_INTEGRATION_ID="your-integration-id"
PAYMOB_HMAC_SECRET="your-hmac-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Email Service (SendGrid or Resend)
EMAIL_SERVICE_API_KEY="your-email-api-key"
EMAIL_FROM="noreply@yourdomain.com"

# Twilio
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Security
SECURITY_MARK_SECRET="your-security-mark-secret"
QR_CODE_SECRET="your-qr-code-secret"

# Admin Gmail for Reactivation
ADMIN_GMAIL="sherifrosas.ai@gmail.com"

# Social Media (Optional)
FACEBOOK_ACCESS_TOKEN="your-facebook-token"
TWITTER_API_KEY="your-twitter-key"
TWITTER_API_SECRET="your-twitter-secret"
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-secret"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## ✅ Checklist: What You Need to Provide

### Critical (Required for Launch)
- [ ] Admin Gmail: `sherifrosas.ai@gmail.com` ✅ (You provided)
- [ ] Database connection string
- [ ] Google OAuth credentials (Client ID & Secret)
- [ ] Paymob credentials (API Key, Integration ID, HMAC Secret)
- [ ] OpenAI API key
- [ ] Email service API key (SendGrid or Resend)
- [ ] Twilio credentials (Account SID, Auth Token, Phone Number)
- [ ] Application domain/URL
- [ ] Security secrets (NEXTAUTH_SECRET, SECURITY_MARK_SECRET, QR_CODE_SECRET)

### Important (For Full Functionality)
- [ ] Bank account details (for settings)
- [ ] Advertisement dates and deadlines
- [ ] Interview location
- [ ] Job description and requirements
- [ ] Arabic and English content/translations
- [ ] Terms of Service text
- [ ] Privacy Policy text

### Optional (For Enhanced Features)
- [ ] Google Analytics ID
- [ ] Social media API keys (Facebook, Twitter, LinkedIn)
- [ ] Additional branding assets

---

## 🚀 Next Steps

1. **Gather all credentials** from the checklist above
2. **Set up accounts** for services you don't have yet:
   - Paymob account
   - OpenAI account
   - Email service account
   - Twilio account
   - Google Cloud Console project
3. **Create `.env.local` file** with all environment variables
4. **Provide the information** so we can configure the application
5. **Test each service** to ensure credentials work

---

## 📞 Questions?

If you need help with:
- Setting up any of these services
- Understanding what a credential is for
- Finding where to get specific credentials
- Configuring the environment

Just ask!

---

**Note**: Keep all credentials secure. Never commit `.env.local` to version control. Use environment variables in production hosting.

**Last Updated**: Now
**Status**: Ready for configuration


