# 🔧 Fix: Google OAuth `error=google` Issue

## ❌ Current Problem

From your terminal logs, I can see:
```
POST /api/auth/signin/google 200
GET /api/auth/signin/google?callbackUrl=/verify 302
GET /login?callbackUrl=...&error=google 200  ← ERROR HERE
```

**Critical observation:** The `signIn callback called` log is **NOT appearing**, which means Google is rejecting the OAuth request **BEFORE** it reaches your server.

## 🔍 Root Causes

The `error=google` typically means one of these:

1. **Redirect URI Mismatch** (Most Common)
   - The redirect URI in Google Console doesn't match exactly
   - Must be: `http://localhost:3000/api/auth/callback/google` (exact match, no trailing slash)

2. **OAuth Consent Screen Issues**
   - App is in "Testing" mode but your email isn't added as a test user
   - App is "In production" but verification is incomplete

3. **Client ID/Secret Issues**
   - Client ID or Secret is incorrect
   - Credentials are for a different project

4. **Domain Verification**
   - If using custom domain, it's not verified

## ✅ Step-by-Step Fix

### Step 1: Verify Redirect URI (CRITICAL)

**In Google Cloud Console:**

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth 2.0 Client ID
3. Check **"Authorized redirect URIs"** section
4. **Must have EXACTLY this:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   - ✅ No trailing slash
   - ✅ Must be `http://` (not `https://`)
   - ✅ Must be `localhost:3000` (not `127.0.0.1:3000`)
   - ✅ Must be `/api/auth/callback/google` (exact path)

5. **If it's missing or different:**
   - Click "ADD URI"
   - Paste: `http://localhost:3000/api/auth/callback/google`
   - Click "SAVE"
   - **Wait 1-2 minutes** for changes to propagate

### Step 2: Check OAuth Consent Screen

**In Google Cloud Console:**

1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Check **"Publishing status"**:
   
   **If "Testing":**
   - Scroll to "Test users" section
   - Click "ADD USERS"
   - Add your Gmail address (the one you're using to test)
   - Click "ADD"
   - **You MUST add your email here!**

   **If "In production":**
   - Make sure all required fields are filled
   - App name, support email, etc.

### Step 3: Verify Environment Variables

**Check your `.env.local` file:**

```bash
GOOGLE_CLIENT_ID=655273695546-qlsle4a...  # Your full client ID
GOOGLE_CLIENT_SECRET=GOCSPX-...           # Your full client secret
NEXTAUTH_SECRET=...                       # Your secret
NEXTAUTH_URL=http://localhost:3000       # Must match redirect URI domain
```

**Verify they're loaded:**
- Visit: http://localhost:3000/api/test-oauth
- Check if all values show `true`

### Step 4: Test Again

1. **Clear browser cache/cookies** for `localhost:3000`
2. **Restart dev server** (Ctrl+C, then `npm run dev`)
3. **Try login again**
4. **Check terminal** for `signIn callback called` log

## 🔍 Diagnostic Tools

### Check OAuth Config

Visit: http://localhost:3000/api/test-oauth

Should show:
```json
{
  "hasGoogleClientId": true,
  "hasGoogleClientSecret": true,
  "hasNextAuthSecret": true,
  "hasNextAuthUrl": true,
  "redirectUri": "http://localhost:3000/api/auth/callback/google"
}
```

### Check Server Logs

After clicking "Continue with Google", watch your terminal for:

**✅ If working:**
```
signIn callback called: { provider: 'google', email: '...', hasAccount: true }
User created successfully: [id]
```

**❌ If NOT working:**
```
GET /login?error=google 200
```
(No `signIn callback called` log)

## 🎯 Most Likely Fix

Based on your logs, the most likely issue is:

**Redirect URI mismatch or missing test user**

### Quick Fix:

1. **Go to Google Console:** https://console.cloud.google.com/apis/credentials
2. **Click your OAuth Client ID**
3. **In "Authorized redirect URIs":**
   - Remove any existing `localhost` entries
   - Add: `http://localhost:3000/api/auth/callback/google`
   - Click "SAVE"
4. **Go to OAuth Consent Screen:** https://console.cloud.google.com/apis/credentials/consent
5. **If "Testing" mode:**
   - Add your Gmail to "Test users"
6. **Wait 2 minutes**
7. **Clear browser cache**
8. **Try again**

## 📋 Checklist

Before testing, verify:

- [ ] Redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- [ ] No trailing slash in redirect URI
- [ ] If "Testing" mode: Your email is in "Test users"
- [ ] `.env.local` has correct `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- [ ] `.env.local` has `NEXTAUTH_URL=http://localhost:3000`
- [ ] Dev server restarted after `.env.local` changes
- [ ] Browser cache cleared
- [ ] Using the same Gmail account that's in "Test users" (if Testing mode)

## 🆘 Still Not Working?

If after all steps you still see `error=google`:

1. **Check browser console** (F12) for any JavaScript errors
2. **Check server terminal** for any error messages
3. **Try incognito mode** (to rule out cache/cookie issues)
4. **Verify Client ID matches** in Google Console and `.env.local`
5. **Check if OAuth consent screen** has all required fields filled

## 📝 Expected Flow (When Working)

1. Click "Continue with Google"
2. Redirect to Google login page
3. Select/enter Gmail account
4. Grant permissions
5. Redirect back to: `http://localhost:3000/verify`
6. Terminal shows: `signIn callback called: { provider: 'google', ... }`
7. User created/updated in database
8. Verification page loads

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ No `error=google` in URL
- ✅ Terminal shows `signIn callback called`
- ✅ Redirects to `/verify` page
- ✅ No error messages on login page

Try the steps above and let me know what happens! 🚀

