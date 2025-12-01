# 📋 OAuth Consent Screen Setup Guide

## ✅ Required Fields to Fill

### 1. App Information

**App name:**
```
Job Advertisement System
```
✅ Already filled correctly

**User support email:**
```
sherifrosas.ai@gmail.com
```
✅ Already filled correctly

**App logo:**
- Optional for Testing mode
- Required for Production mode
- Upload a square logo (120x120px, JPG/PNG/BMP, max 1MB)
- Can skip for now if in Testing mode

---

### 2. App Domain

**Application home page:**
```
http://localhost:3000
```
OR (if you have a production domain):
```
https://yourdomain.com
```

**Application privacy policy link:**
```
http://localhost:3000/privacy
```
OR (if you have a production domain):
```
https://yourdomain.com/privacy
```

**Application Terms of Service link:**
```
http://localhost:3000/terms
```
OR (if you have a production domain):
```
https://yourdomain.com/terms
```

**⚠️ Important:** For localhost, you can use `http://localhost:3000` even though it's not a real domain. Google allows this for development.

---

### 3. Authorised Domains

**For localhost development:**
- You don't need to add `localhost` here
- Google automatically allows `localhost` for OAuth
- This section is mainly for production domains

**For production (later):**
- Add your actual domain (e.g., `yourdomain.com`)
- Must verify domain ownership in Google Search Console
- Can add up to 100 domains

**For now (localhost):**
- Leave this section empty or skip it
- Focus on getting it working locally first

---

### 4. Developer Contact Information

**Email addresses:**
```
sherifrosas.ai@gmail.com
```
- Add your email here
- Google will notify you about project changes
- Can add multiple emails (comma-separated)

---

## 🎯 Quick Setup Steps

### Step 1: Fill Required Fields

1. **App name:** ✅ Already filled
2. **User support email:** ✅ Already filled
3. **Application home page:** `http://localhost:3000`
4. **Application privacy policy link:** `http://localhost:3000/privacy`
5. **Application Terms of Service link:** `http://localhost:3000/terms`
6. **Developer contact information:** `sherifrosas.ai@gmail.com`

### Step 2: Skip Optional Fields (For Now)

- **App logo:** Skip (optional for Testing mode)
- **Authorised domains:** Skip (localhost doesn't need this)

### Step 3: Save and Continue

1. Click **"SAVE AND CONTINUE"** at the bottom
2. Go through the next screens
3. Make sure you're in **"Testing"** mode (not Production)

### Step 4: Add Test Users (CRITICAL!)

If you're in **"Testing"** mode:

1. Go to **"Test users"** section
2. Click **"ADD USERS"**
3. Add your Gmail address: `sherifrosas.ai@gmail.com`
4. Click **"ADD"**
5. **This is required!** Without this, you can't test OAuth

---

## 📋 Complete Checklist

Before testing OAuth:

- [ ] App name filled: `Job Advertisement System`
- [ ] User support email: `sherifrosas.ai@gmail.com`
- [ ] Application home page: `http://localhost:3000`
- [ ] Privacy policy link: `http://localhost:3000/privacy`
- [ ] Terms of Service link: `http://localhost:3000/terms`
- [ ] Developer contact email: `sherifrosas.ai@gmail.com`
- [ ] **If Testing mode:** Your Gmail added to "Test users"
- [ ] **Redirect URI in Credentials:** `http://localhost:3000/api/auth/callback/google`
- [ ] Clicked "SAVE" on all pages

---

## 🔍 Verify Your Setup

### Check OAuth Consent Screen Status

1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Check **"Publishing status"**:
   - **"Testing"** = Good for development (requires test users)
   - **"In production"** = For public use (requires verification)

### Check Test Users (If Testing Mode)

1. Scroll to **"Test users"** section
2. Verify your email is listed: `sherifrosas.ai@gmail.com`
3. If not, click **"ADD USERS"** and add it

### Check Redirect URI

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your OAuth 2.0 Client ID
3. Check **"Authorized redirect URIs"**:
   - Must have: `http://localhost:3000/api/auth/callback/google`
   - Exact match, no trailing slash

---

## ⚠️ Common Mistakes

1. **Missing Test User**
   - If in Testing mode, you MUST add your email to "Test users"
   - Without this, Google will reject OAuth requests

2. **Wrong Redirect URI**
   - Must be exactly: `http://localhost:3000/api/auth/callback/google`
   - No `https://`, no trailing slash, no `127.0.0.1`

3. **Not Saving Changes**
   - After filling fields, click "SAVE AND CONTINUE"
   - Wait 1-2 minutes for changes to propagate

4. **Using Production Mode Too Early**
   - Stay in "Testing" mode for development
   - Production requires domain verification

---

## ✅ After Setup

1. **Wait 2 minutes** for Google to process changes
2. **Clear browser cache** (or use incognito)
3. **Restart dev server** (Ctrl+C, then `npm run dev`)
4. **Try login again**
5. **Check terminal** for `signIn callback called` log

---

## 🆘 Still Having Issues?

If OAuth still doesn't work after setup:

1. **Double-check Test Users** (if Testing mode)
2. **Verify Redirect URI** is exactly correct
3. **Check browser console** (F12) for errors
4. **Check server terminal** for error messages
5. **Try incognito mode** to rule out cache issues

---

## 📝 Summary

**Minimum Required Fields:**
- App name ✅
- User support email ✅
- Application home page: `http://localhost:3000`
- Privacy policy: `http://localhost:3000/privacy`
- Terms of Service: `http://localhost:3000/terms`
- Developer email: `sherifrosas.ai@gmail.com`
- **Test user email** (if Testing mode): `sherifrosas.ai@gmail.com`

Fill these out, save, add yourself as a test user, and try again! 🚀

