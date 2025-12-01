# 🎯 Step-by-Step: Get Your App Running

## Current Status ✅
- ✅ Project files created
- ✅ Dependencies installed
- ✅ Code ready

## What You Need to Do Now

### STEP 1: Create .env.local File (30 seconds)

**Option A: Use the helper script (Easiest)**
```bash
node create-env.js
```

**Option B: Create manually**
1. Create a new file named `.env.local` in the root folder
2. Copy the content from `INTERACTIVE_SETUP.md` (Step 1)

### STEP 2: Get Database URL (5 minutes)

**Go to Supabase:**
1. Visit: https://supabase.com/dashboard
2. Click "New Project"
3. Name: `job-advertisement`
4. Create a password (SAVE IT!)
5. Wait 2 minutes
6. Go to: Settings → Database
7. Copy "Connection string" (URI)
8. Paste in `.env.local` as `DATABASE_URL`

**The URL format:**
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### STEP 3: Get Google OAuth (5 minutes)

**Go to Google Cloud:**
1. Visit: https://console.cloud.google.com
2. Create new project: "Job Advertisement"
3. Enable "Google+ API"
4. Configure OAuth consent screen
5. Create OAuth 2.0 credentials
6. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Secret
8. Paste in `.env.local`

### STEP 4: Update Admin Credentials

In `.env.local`, change:
```env
ADMIN_EMAIL="your-email@example.com"
ADMIN_PASSWORD="your-secure-password"
```

### STEP 5: Initialize Database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### STEP 6: Start the App!

```bash
npm run dev
```

Visit: http://localhost:3000

## 🎉 Done!

Your app should now be running!

## Quick Test

1. **Homepage:** http://localhost:3000
2. **Admin:** http://localhost:3000/admin/login
   - Use your ADMIN_EMAIL and ADMIN_PASSWORD

## 📚 Need Help?

- **Detailed steps:** `INTERACTIVE_SETUP.md`
- **Quick start:** `GET_STARTED_NOW.md`
- **Troubleshooting:** `NEXT_STEPS_GUIDE.md`

---

**Start with STEP 1!** 🚀


