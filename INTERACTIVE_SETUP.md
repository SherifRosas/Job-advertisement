# 🎯 Interactive Setup Guide

## Current Status Check

Run this command to check your setup:
```bash
# Check if .env.local exists and is configured
```

## Step-by-Step Setup

### ✅ Step 1: Create .env.local

**If you haven't created it yet:**

1. Create a new file named `.env.local` in the root directory
2. Copy this content:

```env
# ============================================
# REQUIRED - Must Configure These
# ============================================

# Database URL (Get from Supabase/Neon)
DATABASE_URL="postgresql://username:password@host:port/database_name"

# Google OAuth (Get from Google Cloud Console)
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
```

### ✅ Step 2: Get Database (Choose One)

#### Option A: Supabase (Easiest - 5 minutes)

1. **Visit:** https://supabase.com/dashboard
2. **Click:** "New Project"
3. **Fill:**
   - Name: `job-advertisement`
   - Database Password: **SAVE THIS PASSWORD!**
   - Region: Choose closest
4. **Wait** 2 minutes
5. **Go to:** Settings → Database
6. **Copy:** Connection string (URI format)
7. **Paste** in `.env.local` as `DATABASE_URL`

**The URL looks like:**
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

#### Option B: Neon (Alternative)

1. **Visit:** https://neon.tech
2. **Sign up** (free)
3. **Create project**
4. **Copy connection string**
5. **Paste** in `.env.local`

### ✅ Step 3: Get Google OAuth (5 minutes)

1. **Visit:** https://console.cloud.google.com
2. **Create Project:**
   - Click project dropdown (top)
   - "New Project"
   - Name: `Job Advertisement`
   - Create
3. **Enable API:**
   - "APIs & Services" → "Library"
   - Search: `Google+ API`
   - Click "Enable"
4. **OAuth Consent Screen:**
   - "APIs & Services" → "OAuth consent screen"
   - User Type: External → Create
   - App name: `Job Advertisement System`
   - Your email
   - Save and Continue (3 times)
5. **Create Credentials:**
   - "APIs & Services" → "Credentials"
   - "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `Job Advertisement Web`
   - **Authorized redirect URIs:** Add:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Create
6. **Copy to .env.local:**
   - Copy "Client ID" → `GOOGLE_CLIENT_ID`
   - Copy "Client secret" → `GOOGLE_CLIENT_SECRET`

### ✅ Step 4: Update Admin Credentials

In `.env.local`, change:
```env
ADMIN_EMAIL="your-email@example.com"
ADMIN_PASSWORD="your-secure-password"
```

### ✅ Step 5: Initialize Database

Open terminal and run:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed with default settings
npm run db:seed
```

**Expected output:**
- ✅ Prisma Client generated
- ✅ Database schema pushed
- ✅ Default settings created

### ✅ Step 6: Start the App!

```bash
npm run dev
```

**You should see:**
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
```

**Open:** http://localhost:3000

## 🎉 Success Checklist

After starting the app, verify:

- [ ] Homepage loads at http://localhost:3000
- [ ] Can click "Apply Now"
- [ ] Gmail login works
- [ ] Admin login works at `/admin/login`
- [ ] No errors in terminal

## 🐛 Common Issues

### "Database connection error"
- ✅ Check `DATABASE_URL` format
- ✅ Verify password is correct
- ✅ Check database is running (Supabase/Neon)

### "Google OAuth error"
- ✅ Verify redirect URI matches exactly
- ✅ Check Client ID and Secret are correct
- ✅ Make sure Google+ API is enabled

### "Module not found"
- ✅ Run `npm install` again
- ✅ Delete `node_modules` and `.next`, then `npm install`

### "Prisma error"
- ✅ Run `npm run db:generate`
- ✅ Check `DATABASE_URL` is correct
- ✅ Try `npm run db:push` again

## 📞 Need More Help?

- See `GET_STARTED_NOW.md` for detailed steps
- Check `NEXT_STEPS_GUIDE.md` for troubleshooting
- Review terminal error messages

---

**Ready? Start with Step 1!** 🚀


