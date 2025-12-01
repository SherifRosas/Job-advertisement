# 🔐 Google OAuth Setup - Step by Step

## Complete Guide (5-10 minutes)

### Step 1: Go to Google Cloud Console
1. Visit: **https://console.cloud.google.com**
2. Sign in with your Google account

### Step 2: Create Project
1. Click the **project dropdown** at the top (next to "Google Cloud")
2. Click **"New Project"**
3. Fill in:
   - **Project name:** `Job Advertisement System` (or any name)
   - **Location:** No organization (or select yours)
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

**Fill in the form:**
- **App name:** `Job Advertisement System`
- **User support email:** Your email
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

### Step 6: Copy Credentials
A popup will show:
- **Your Client ID** (long string)
- **Your Client secret** (also long string)

**Copy both!**

### Step 7: Update .env.local
1. Open `.env.local` file
2. Find:
   ```
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```
3. **Replace with your actual values:**
   ```env
   GOOGLE_CLIENT_ID="123456789-abcdefghijklmnop.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="GOCSPX-abcdefghijklmnopqrstuvwxyz"
   ```
4. **Save the file**

### Step 8: Test
After updating `.env.local`, restart your dev server:
```bash
npm run dev
```

Then try logging in with Gmail!

## ✅ Done!

Your Google OAuth is configured!

**Next step:** Update admin credentials and run the app!

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


