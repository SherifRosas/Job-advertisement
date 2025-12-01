# 🚀 GET STARTED NOW - Follow These Steps

## ✅ Step 1: Create `.env.local` File

**Create a new file** named `.env.local` in the root directory and paste this:

```env
# Database - YOU MUST REPLACE THIS
DATABASE_URL="postgresql://username:password@host:port/database_name"

# NextAuth (Already set for you!)
NEXTAUTH_SECRET="iPrQ5q55KIZ7bCxu6wOIA9NoYlEZ1hIgEXiGOataS2Q="
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth - YOU MUST GET THESE
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Security Secrets (Already set for you!)
SECURITY_MARK_SECRET="4joOVzq9/7YRihtaawSL6xR/IFyStPIurn6yaZtUlRE="
QR_CODE_SECRET="7j34U0wxW46iMbsYtgj0IcDmSN1PPLNYf46jRGNqABY="

# Admin
ADMIN_GMAIL="sherifrosas.ai@gmail.com"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"

# Optional (can leave empty for now)
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

## ✅ Step 2: Get Database URL (5 minutes)

### Quick Option: Supabase (Free)

1. **Visit:** https://supabase.com
2. **Click:** "Start your project"
3. **Sign up** (free, use GitHub/Google)
4. **Click:** "New Project"
5. **Fill in:**
   - Name: `job-advertisement`
   - Database Password: (create and **SAVE IT**)
   - Region: Choose closest
6. **Wait 2 minutes** for setup
7. **Go to:** Settings → Database
8. **Find:** "Connection string" → "URI"
9. **Copy** the connection string
10. **Paste** in `.env.local` replacing `DATABASE_URL`

**Example format:**
```
DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

## ✅ Step 3: Get Google OAuth (5 minutes)

1. **Visit:** https://console.cloud.google.com
2. **Create Project:**
   - Click project dropdown → "New Project"
   - Name: `Job Advertisement`
   - Click "Create"
3. **Enable API:**
   - Go to "APIs & Services" → "Library"
   - Search "Google+ API" → Click "Enable"
4. **Configure Consent Screen:**
   - Go to "APIs & Services" → "OAuth consent screen"
   - User Type: External → Create
   - App name: `Job Advertisement System`
   - User support email: your email
   - Click "Save and Continue" (3 times)
5. **Create Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `Job Advertisement Web`
   - **Authorized redirect URIs:** Add this:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Click "Create"
6. **Copy Credentials:**
   - Copy "Client ID" → paste in `.env.local` as `GOOGLE_CLIENT_ID`
   - Copy "Client secret" → paste in `.env.local` as `GOOGLE_CLIENT_SECRET`

## ✅ Step 4: Initialize Database

Open terminal in this folder and run:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with default settings
npm run db:seed
```

## ✅ Step 5: Start the App!

```bash
npm run dev
```

**Open:** http://localhost:3000

## 🎉 You're Done!

The app is now running! You can:
- ✅ Visit homepage
- ✅ Test Gmail login
- ✅ Access admin at `/admin/login` (use ADMIN_EMAIL and ADMIN_PASSWORD from `.env.local`)

## 📝 Quick Checklist

Before running `npm run dev`, make sure:
- [ ] `.env.local` file created
- [ ] `DATABASE_URL` updated with real database
- [ ] `GOOGLE_CLIENT_ID` updated
- [ ] `GOOGLE_CLIENT_SECRET` updated
- [ ] Ran `npm run db:push`
- [ ] Ran `npm run db:seed`

## 🆘 Having Issues?

- **Database connection error?** Check your `DATABASE_URL` format
- **Google OAuth not working?** Verify redirect URI matches exactly
- **Can't find .env.local?** Make sure it's in the root folder (same as package.json)

---

**Need more help?** See `SETUP_WIZARD.md` for detailed instructions!


