# 🆘 Help Guide - I'm Here to Help!

## 🎯 What Do You Need Help With?

### 1️⃣ "I don't know where to start"
**→ Start here:**
- Open `STEP_BY_STEP.md` - Simplest guide
- Follow each step one by one
- Don't skip steps!

### 2️⃣ "I need to create .env.local"
**→ Already done!** ✅
- The file was created automatically
- Just need to update 4 values inside it

### 3️⃣ "I need a database"
**→ Get free database (5 minutes):**

**Option A: Supabase (Easiest)**
1. Go to: https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - Name: `job-advertisement`
   - Password: (create one, SAVE IT!)
4. Wait 2 minutes
5. Go to: Settings → Database
6. Copy "Connection string" (URI)
7. Paste in `.env.local` as `DATABASE_URL`

**The URL looks like:**
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### 4️⃣ "I need Google OAuth"
**→ Get from Google Cloud (5 minutes):**

1. **Go to:** https://console.cloud.google.com
2. **Create Project:**
   - Click project dropdown (top left)
   - "New Project"
   - Name: `Job Advertisement`
   - Click "Create"
3. **Enable API:**
   - "APIs & Services" → "Library"
   - Search: `Google+ API`
   - Click "Enable"
4. **OAuth Consent Screen:**
   - "APIs & Services" → "OAuth consent screen"
   - User Type: External → Create
   - App name: `Job Advertisement System`
   - Your email
   - Click "Save and Continue" 3 times
5. **Create Credentials:**
   - "APIs & Services" → "Credentials"
   - "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Web application**
   - Name: `Job Advertisement Web`
   - **Authorized redirect URIs:** Add this EXACTLY:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Click "Create"
6. **Copy to .env.local:**
   - Copy "Client ID" → paste as `GOOGLE_CLIENT_ID`
   - Copy "Client secret" → paste as `GOOGLE_CLIENT_SECRET`

### 5️⃣ "I updated .env.local, what's next?"
**→ Run these commands:**

```bash
# Step 1: Generate Prisma client
npm run db:generate

# Step 2: Create database tables
npm run db:push

# Step 3: Add default settings
npm run db:seed

# Step 4: Start the app!
npm run dev
```

Then open: http://localhost:3000

### 6️⃣ "I'm getting errors"
**→ Common fixes:**

**Database Error:**
- Check `DATABASE_URL` format is correct
- Verify password is right
- Make sure database is running

**Google OAuth Error:**
- Check redirect URI matches exactly
- Verify Client ID and Secret
- Make sure Google+ API is enabled

**Module Not Found:**
```bash
npm install
```

**Prisma Error:**
```bash
npm run db:generate
npm run db:push
```

### 7️⃣ "I want to test without external services"
**→ You can!**

The app works with minimal setup:
- ✅ Database (required)
- ✅ Google OAuth (required for login)
- ⚠️ Email/SMS (optional - codes show in console)
- ⚠️ Payment (optional - simulated mode)
- ⚠️ AI (optional - basic fallback)

### 8️⃣ "I want to see what's configured"
**→ Check your setup:**

The system will show you what's configured when you run commands.

### 9️⃣ "I'm stuck on a specific step"
**→ Tell me which step:**
- Step 1: Creating .env.local
- Step 2: Getting database
- Step 3: Getting Google OAuth
- Step 4: Running commands
- Step 5: Starting the app

I'll help you with that specific step!

## 📋 Quick Checklist

Before running `npm run dev`:

- [ ] `.env.local` file exists
- [ ] `DATABASE_URL` updated (from Supabase/Neon)
- [ ] `GOOGLE_CLIENT_ID` updated (from Google Cloud)
- [ ] `GOOGLE_CLIENT_SECRET` updated (from Google Cloud)
- [ ] `ADMIN_EMAIL` changed to your email
- [ ] `ADMIN_PASSWORD` changed to your password
- [ ] Ran `npm run db:push`
- [ ] Ran `npm run db:seed`

## 🎯 Recommended Order

1. **Read:** `STEP_BY_STEP.md` (simplest)
2. **Follow:** Each step in order
3. **Test:** Run `npm run dev`
4. **Verify:** App loads at http://localhost:3000

## 💬 What Specific Help Do You Need?

Tell me:
- "I need help with database"
- "I need help with Google OAuth"
- "I'm getting [specific error]"
- "I don't understand step X"

I'll guide you through it! 🚀


