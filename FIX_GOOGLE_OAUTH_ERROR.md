# 🔧 Fix Google OAuth Error: `error=google`

## ❌ Error: `error=google` in URL

This error means Google OAuth is rejecting the authentication request. This is typically a **configuration issue** in Google Cloud Console.

---

## 🔍 Common Causes

### 1. **Redirect URI Mismatch** (Most Common)

**Problem:** The redirect URI in your Google OAuth credentials doesn't match what NextAuth is using.

**Fix:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, add these EXACT URLs:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   For production, also add:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```
5. **Save** the changes
6. Wait 1-2 minutes for changes to propagate

---

### 2. **OAuth Consent Screen Not Configured**

**Problem:** The OAuth consent screen isn't set up or published.

**Fix:**
1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** (for testing) or **Internal** (for Google Workspace)
3. Fill in required fields:
   - **App name**: Job Advertisement System
   - **User support email**: sherifrosas.ai@gmail.com
   - **Developer contact information**: sherifrosas.ai@gmail.com
4. Add scopes (if needed):
   - `email`
   - `profile`
   - `openid`
5. Add test users (if in Testing mode):
   - Add your Gmail address
6. **Save and Continue** through all steps
7. If in Testing mode, you may need to publish or add test users

---

### 3. **Invalid Client ID or Secret**

**Problem:** The credentials in `.env.local` don't match Google Console.

**Fix:**
1. Go to **APIs & Services** → **Credentials**
2. Find your OAuth 2.0 Client ID
3. Copy the **Client ID** and **Client Secret**
4. Update `.env.local`:
   ```env
   GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```
5. **Restart your development server** after updating

---

### 4. **API Not Enabled**

**Problem:** Google+ API or Identity API not enabled.

**Fix:**
1. Go to **APIs & Services** → **Library**
2. Search for "Google+ API" or "Identity API"
3. Click **Enable** if not already enabled
4. Wait a few minutes for activation

---

## ✅ Step-by-Step Fix

### Step 1: Verify Redirect URI

**In Google Cloud Console:**
1. Go to [Credentials](https://console.cloud.google.com/apis/credentials)
2. Click your OAuth 2.0 Client ID
3. Check **Authorized redirect URIs** includes:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
4. If missing, add it and **Save**

### Step 2: Verify OAuth Consent Screen

**In Google Cloud Console:**
1. Go to [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)
2. Verify it's configured:
   - App name set
   - Support email set
   - Scopes added (email, profile, openid)
3. If in Testing mode, add your email as a test user

### Step 3: Verify Credentials

**In `.env.local`:**
```env
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
```

**Verify:**
- Client ID matches Google Console
- Client Secret matches Google Console
- No extra spaces or quotes
- Restart server after changes

### Step 4: Test Again

1. Clear browser cookies for `localhost:3000`
2. Restart your development server
3. Try logging in again

---

## 🧪 Quick Test

**Check if redirect URI is correct:**
1. Open browser console (F12)
2. Click "Continue with Google"
3. Check the URL you're redirected to
4. It should be: `https://accounts.google.com/o/oauth2/v2/auth?...`
5. After Google login, it should redirect to: `http://localhost:3000/api/auth/callback/google?...`

**If you see a Google error page:**
- Check the error message on Google's page
- Common: "redirect_uri_mismatch" → Fix redirect URI
- Common: "access_denied" → Check OAuth consent screen

---

## 📋 Checklist

- [ ] Redirect URI added: `http://localhost:3000/api/auth/callback/google`
- [ ] OAuth consent screen configured
- [ ] Test user added (if in Testing mode)
- [ ] Client ID and Secret match `.env.local`
- [ ] Server restarted after `.env.local` changes
- [ ] Browser cookies cleared
- [ ] Google+ API or Identity API enabled

---

## 🆘 Still Not Working?

**Check Google Cloud Console:**
1. Go to **APIs & Services** → **Credentials**
2. Click your OAuth 2.0 Client ID
3. Check **Application type**: Should be "Web application"
4. Check **Authorized JavaScript origins**: Should include `http://localhost:3000`

**Check Server Logs:**
- Look for NextAuth errors
- Check if credentials are being read correctly

**Check Browser Console:**
- Look for any JavaScript errors
- Check Network tab for failed requests

---

## 💡 Pro Tip

**For local development:**
- Use `http://localhost:3000` (not `https://`)
- Make sure port matches (3000)
- Don't use trailing slashes in redirect URI

**For production:**
- Use your actual domain
- Must use `https://`
- Update both redirect URI and `NEXTAUTH_URL`

---

## 📞 Need More Help?

Share:
1. The exact error message from Google (if any)
2. Your redirect URI configuration from Google Console
3. Your OAuth consent screen status (Testing/Published)
4. Any errors in server terminal


