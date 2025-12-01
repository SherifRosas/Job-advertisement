# 🗄️ Database Setup - Step by Step

## Quick Option: Supabase (Free, 5 minutes)

### Step 1: Sign Up
1. Go to: **https://supabase.com/dashboard**
2. Click **"Start your project"** or **"Sign in"**
3. Sign up with:
   - GitHub (easiest)
   - Google
   - Email

### Step 2: Create Project
1. Click **"New Project"** button
2. Fill in:
   - **Name:** `job-advertisement` (or any name)
   - **Database Password:** 
     - Create a strong password
     - **⚠️ SAVE THIS PASSWORD!** You'll need it
     - Example: `MySecurePass123!@#`
   - **Region:** Choose closest to you
     - US East, US West, EU, etc.
3. Click **"Create new project"**
4. **Wait 2-3 minutes** for setup

### Step 3: Get Connection String
1. Once project is ready, go to **Settings** (gear icon, bottom left)
2. Click **"Database"** in the menu
3. Scroll down to **"Connection string"**
4. Find **"URI"** tab (not "Session mode")
5. **Copy the connection string**

**It looks like this:**
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Step 4: Update .env.local
1. Open `.env.local` file
2. Find this line:
   ```
   DATABASE_URL="postgresql://username:password@host:port/database_name"
   ```
3. **Replace it** with your copied connection string
4. **Important:** Replace `[YOUR-PASSWORD]` with the password you created
5. Save the file

**Example:**
```env
DATABASE_URL="postgresql://postgres.abcdefghijklmnop:[MySecurePass123!@#]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

### Step 5: Test Connection
Run this command:
```bash
npm run db:push
```

**If successful, you'll see:**
```
✔ Generated Prisma Client
✔ Database schema pushed successfully
```

**If error, check:**
- Password is correct (no brackets, just the password)
- Connection string format is correct
- Database is ready (wait a bit if just created)

## ✅ Done!

Your database is now configured!

**Next step:** Get Google OAuth (see `GOOGLE_OAUTH_SETUP.md`)

---

## Alternative: Neon Database

If you prefer Neon:

1. Go to: **https://neon.tech**
2. Sign up (free)
3. Create project
4. Copy connection string
5. Paste in `.env.local` as `DATABASE_URL`

Same process, different service!


