# 📋 STEP 1: Get Your Database (5 minutes)

## Let's Do This Together - One Step at a Time

### ✅ Step 1.1: Open Supabase
1. **Click this link:** https://supabase.com/dashboard
2. **Or copy and paste in browser:** `https://supabase.com/dashboard`

**What you'll see:** Supabase login/signup page

---

### ✅ Step 1.2: Sign Up or Sign In
- **If you don't have account:** Click "Start your project" → Sign up (use GitHub, Google, or Email)
- **If you have account:** Click "Sign in" → Login

**What you'll see:** Supabase dashboard

---

### ✅ Step 1.3: Create New Project
1. Look for **"New Project"** button (usually green, top right or center)
2. **Click it**

**What you'll see:** Project creation form

---

### ✅ Step 1.4: Fill Project Details
Fill in the form:

1. **Name:**
   - Type: `job-advertisement`
   - (Or any name you like)

2. **Database Password:**
   - **⚠️ IMPORTANT:** Create a strong password
   - Example: `MySecurePass123!@#`
   - **WRITE IT DOWN or SAVE IT!** You'll need it in a moment
   - (You'll need to enter it twice to confirm)

3. **Region:**
   - Choose the region closest to you
   - Examples: US East, US West, EU West, etc.

4. **Pricing Plan:**
   - Select **"Free"** (it's free!)

5. **Click:** "Create new project" button

**What you'll see:** "Setting up your project..." message

---

### ✅ Step 1.5: Wait for Setup
- **Wait 2-3 minutes** for the project to be created
- You'll see progress messages
- **Don't close the page!**

**What you'll see:** "Project is ready!" or dashboard loads

---

### ✅ Step 1.6: Go to Database Settings
Once project is ready:

1. Look at the **left sidebar menu**
2. Find and click **"Settings"** (gear icon ⚙️)
3. In the settings menu, click **"Database"**

**What you'll see:** Database settings page with connection info

---

### ✅ Step 1.7: Get Connection String
On the Database settings page:

1. Scroll down to find **"Connection string"** section
2. You'll see tabs: **"URI"**, **"JDBC"**, etc.
3. **Click the "URI" tab** (if not already selected)
4. You'll see a connection string that looks like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
5. **Click the "Copy" button** next to it (or select all and copy)

**⚠️ IMPORTANT:** The connection string has `[YOUR-PASSWORD]` in it. You need to replace this with the actual password you created in Step 1.4!

---

### ✅ Step 1.8: Update .env.local
1. **Open** `.env.local` file in your project
2. **Find** this line:
   ```
   DATABASE_URL="postgresql://username:password@host:port/database_name"
   ```
3. **Replace the entire line** with your copied connection string
4. **Replace `[YOUR-PASSWORD]`** with your actual password (no brackets!)
5. **Save the file**

**Example:**
If your connection string is:
```
postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

And your password is: `MySecurePass123!@#`

Then in `.env.local` it should be:
```env
DATABASE_URL="postgresql://postgres.abcdefghijklmnop:MySecurePass123!@#@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

---

### ✅ Step 1.9: Test the Connection
Run this command to test:
```bash
npm run db:push
```

**If successful:** You'll see "✔ Database schema pushed successfully"

**If error:** Check:
- Password is correct (no brackets)
- Connection string format is correct
- You replaced `[YOUR-PASSWORD]` with actual password

---

## 🎉 Step 1 Complete!

Your database is now configured!

**Tell me when you're done with Step 1, and I'll help you with Step 2 (Google OAuth)!**

---

## 🆘 Having Trouble?

**"I can't find the connection string"**
- Make sure you're in Settings → Database
- Scroll down on the page
- Look for "Connection string" section

**"I get an error when testing"**
- Double-check the password (no brackets)
- Make sure the connection string is complete
- Try copying it again

**"I forgot my password"**
- You can reset it in Supabase project settings
- Or create a new project

**Tell me what's happening and I'll help!** 💬


