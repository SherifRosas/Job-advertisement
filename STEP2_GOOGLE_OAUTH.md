# 🔐 Step 2: Google OAuth Setup

## Quick Overview

We'll set up Google OAuth so applicants can log in with their Gmail accounts.

**Time:** 5-10 minutes  
**Difficulty:** Easy  
**Required:** Google account

---

## 📋 Step-by-Step Instructions

### Step 1: Go to Google Cloud Console

1. **Visit:** https://console.cloud.google.com
2. **Sign in** with your Google account

### Step 2: Create a New Project

1. Click the **project dropdown** at the top (next to "Google Cloud")
2. Click **"New Project"**
3. Fill in:
   - **Project name:** `Job Advertisement System` (or any name you like)
   - **Location:** No organization (or select yours if you have one)
4. Click **"Create"**
5. **Wait a few seconds** for project creation
6. **Select the new project** from dropdown (if not auto-selected)

### Step 3: Enable Google+ API

1. In the left menu, go to **"APIs & Services"** → **"Library"**
2. In the search box, type: `Google+ API`
3. Click on **"Google+ API"** result
4. Click the blue **"Enable"** button
5. Wait for it to enable (few seconds)

### Step 4: Configure OAuth Consent Screen

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. **User Type:** Select **"External"**
3. Click **"Create"**

**Fill in the form (Step 1):**
- **App name:** `Job Advertisement System`
- **User support email:** Your email (sherifrosas.ai@gmail.com)
- **Developer contact information:** Your email
- Click **"Save and Continue"**

**Scopes (Step 2):**
- Click **"Save and Continue"** (no changes needed)

**Test users (Step 3):**
- Click **"Save and Continue"** (no changes needed)

**Summary (Step 4):**
- Click **"Back to Dashboard"**

### Step 5: Create OAuth Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** (top)
3. Select **"OAuth client ID"**

**If asked to configure consent screen:**
- You already did this, just click through

**Create OAuth client ID:**
- **Application type:** Select **"Web application"**
- **Name:** `Job Advertisement Web Client`
- **Authorized JavaScript origins:** Leave empty (or add `http://localhost:3000`)
- **Authorized redirect URIs:** Click **"+ ADD URI"**
  - Enter EXACTLY: `http://localhost:3000/api/auth/callback/google`
  - ⚠️ **Must match exactly!** (no trailing slash, correct port)
4. Click **"Create"**

### Step 6: Copy Your Credentials

A popup will show:
- **Your Client ID** (a long string ending in `.apps.googleusercontent.com`)
- **Your Client secret** (a long secret string; keep it private)

**⚠️ IMPORTANT: Copy both immediately!**  
You won't be able to see the secret again.

### Step 7: Update .env.local

1. **Open `.env.local` file** in your project
2. **Find these lines:**
   ```env
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```
3. **Replace with your actual values (example format only):**
   ```env
   GOOGLE_CLIENT_ID="123456789-yourclientid.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
   ```
4. **Save the file**

---

## ✅ Done!

Your Google OAuth is configured!

**Next:** We'll test it and continue with other setup steps.

---

## 🐛 Troubleshooting

**"Redirect URI mismatch" error:**
- Check redirect URI in Google Console matches exactly
- Should be: `http://localhost:3000/api/auth/callback/google`
- No trailing slash, correct port (3000)

**"Invalid client" error:**
- Verify Client ID and Secret are correct
- Check for extra spaces when copying
- Make sure Google+ API is enabled

**Can't find OAuth consent screen:**
- Make sure you selected "External" user type
- Complete all 4 steps of consent screen setup

---

## 💬 Tell Me When Done

After you've:
1. ✅ Created the project
2. ✅ Enabled Google+ API
3. ✅ Configured OAuth consent screen
4. ✅ Created OAuth credentials
5. ✅ Updated .env.local

**Tell me:** "I completed Google OAuth setup" or "I have the credentials"

I'll help you verify it works!


