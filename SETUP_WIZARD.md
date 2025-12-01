# 🧙 Setup Wizard - Step by Step

## Step 1: Database Setup (Required) ⚠️

You need a PostgreSQL database. Here are free options:

### Option A: Supabase (Recommended - Easiest)
1. Go to https://supabase.com
2. Click "Start your project" (free)
3. Sign up with GitHub/Google
4. Click "New Project"
5. Fill in:
   - Name: `job-advertisement`
   - Database Password: (create a strong password - save it!)
   - Region: Choose closest to you
6. Wait 2 minutes for setup
7. Go to "Settings" → "Database"
8. Find "Connection string" → "URI"
9. Copy the connection string
10. Paste it in `.env.local` as `DATABASE_URL`

### Option B: Neon (Alternative)
1. Go to https://neon.tech
2. Sign up (free)
3. Create project
4. Copy connection string
5. Paste in `.env.local`

**After getting database URL, update `.env.local`:**
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres"
```

## Step 2: Google OAuth Setup (Required) ⚠️

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com

2. **Create or Select Project:**
   - Click project dropdown at top
   - Click "New Project"
   - Name: `Job Advertisement System`
   - Click "Create"

3. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - If prompted, configure consent screen first:
     - User Type: External
     - App name: Job Advertisement System
     - User support email: your email
     - Developer contact: your email
     - Click "Save and Continue" through steps
   - Back to credentials:
     - Application type: Web application
     - Name: Job Advertisement Web Client
     - Authorized redirect URIs: 
       - Add: `http://localhost:3000/api/auth/callback/google`
     - Click "Create"

5. **Copy Credentials:**
   - Copy "Client ID"
   - Copy "Client secret"
   - Paste in `.env.local`:
     ```env
     GOOGLE_CLIENT_ID="paste-client-id-here"
     GOOGLE_CLIENT_SECRET="paste-client-secret-here"
     ```

## Step 3: Update Admin Credentials

Edit `.env.local` and change:
```env
ADMIN_EMAIL="your-admin-email@example.com"
ADMIN_PASSWORD="your-secure-password"
```

## Step 4: Initialize Database

Run these commands:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with default settings
npm run db:seed
```

## Step 5: Start the Application

```bash
npm run dev
```

Open: http://localhost:3000

## ✅ You're Done!

The app should now be running. You can:
- Visit homepage
- Test login with Gmail
- Access admin at `/admin/login`

## 🎯 What Works Now

✅ Application form
✅ Database operations  
✅ Admin dashboard
✅ Basic authentication
✅ Content protection

## ⚠️ What Needs External Services (Optional)

These will log to console until configured:
- Email verification (shows code in console)
- SMS verification (shows code in console)
- Payment (simulated mode available)
- AI features (basic fallback)

You can add these services later!

---

**Need help? Check `NEXT_STEPS_GUIDE.md` for detailed troubleshooting.**


