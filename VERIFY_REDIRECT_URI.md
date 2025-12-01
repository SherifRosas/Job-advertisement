# 🔍 Verify Redirect URI - Critical Step

## ❌ Current Issue

You're still seeing `error=google`, which means Google is rejecting the OAuth request **before** it reaches your server.

**The redirect URI is the #1 cause of this error.**

## ✅ Step-by-Step Verification

### Step 1: Go to Google Cloud Console

1. Open: https://console.cloud.google.com/apis/credentials
2. Make sure you're in the **correct project**
3. Find your **OAuth 2.0 Client ID** (the one with your Client ID)

### Step 2: Click on Your OAuth Client ID

Click on the OAuth 2.0 Client ID to open its details.

### Step 3: Check "Authorized redirect URIs"

Scroll down to the **"Authorized redirect URIs"** section.

**You MUST see exactly this:**
```
http://localhost:3000/api/auth/callback/google
```

**Check these details:**
- ✅ Starts with `http://` (NOT `https://`)
- ✅ Uses `localhost:3000` (NOT `127.0.0.1:3000`)
- ✅ Path is exactly `/api/auth/callback/google`
- ✅ NO trailing slash at the end
- ✅ NO extra spaces or characters

### Step 4: If It's Missing or Wrong

**If the redirect URI is missing or different:**

1. **Click "ADD URI"** (or edit the existing one)
2. **Type exactly:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```
3. **Double-check:**
   - No `https://`
   - No trailing slash
   - Exact path
4. **Click "SAVE"**
5. **Wait 2-3 minutes** for Google to process the change

### Step 5: Verify Client ID Matches

**While you're in the OAuth Client details:**

1. **Copy the Client ID** (starts with numbers like `655273695546-...`)
2. **Check your `.env.local` file:**
   ```bash
   GOOGLE_CLIENT_ID=655273695546-...
   ```
3. **They must match exactly!**

**If they don't match:**
- Update `.env.local` with the correct Client ID
- Restart dev server: `Ctrl+C`, then `npm run dev`

### Step 6: Verify Client Secret Matches

1. **In Google Console, click "RESET SECRET"** (if needed, or view existing)
2. **Copy the Client Secret** (starts with `GOCSPX-...`)
3. **Check your `.env.local` file:**
   ```bash
   GOOGLE_CLIENT_SECRET=GOCSPX-...
   ```
4. **They must match exactly!**

**If they don't match:**
- Update `.env.local` with the correct Client Secret
- Restart dev server: `Ctrl+C`, then `npm run dev`

---

## 🔍 Common Mistakes

### ❌ Wrong Redirect URI Examples:

```
https://localhost:3000/api/auth/callback/google  ← Wrong: https
http://127.0.0.1:3000/api/auth/callback/google   ← Wrong: 127.0.0.1
http://localhost:3000/api/auth/callback/google/  ← Wrong: trailing slash
http://localhost:3000/api/auth/callback/Google   ← Wrong: capital G
http://localhost:3000/api/auth/callback/google   ← Correct! ✅
```

### ❌ Multiple Redirect URIs:

If you have multiple redirect URIs listed:
- Keep the correct one: `http://localhost:3000/api/auth/callback/google`
- Remove any incorrect ones
- Don't have duplicates

---

## ✅ Correct Configuration Checklist

Before testing again, verify:

- [ ] Redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- [ ] No `https://` in redirect URI
- [ ] No trailing slash in redirect URI
- [ ] Client ID in `.env.local` matches Google Console
- [ ] Client Secret in `.env.local` matches Google Console
- [ ] Changes saved in Google Console
- [ ] Waited 2-3 minutes after saving
- [ ] Restarted dev server after `.env.local` changes
- [ ] Test user added: `sherifrosas.ai@gmail.com`
- [ ] Using the same email to test login

---

## 🧪 Test After Verification

1. **Clear browser cache** (or use incognito)
2. **Go to:** http://localhost:3000/login
3. **Click:** "Continue with Google"
4. **Watch terminal** for: `signIn callback called`

**If you see that log, it's working!** ✅

---

## 🆘 Still Not Working?

If redirect URI is correct but still getting `error=google`:

1. **Double-check test user:**
   - Must be exactly: `sherifrosas.ai@gmail.com`
   - Same email you're using to login

2. **Check OAuth Consent Screen:**
   - Go to: https://console.cloud.google.com/apis/credentials/consent
   - Verify it's in "Testing" mode
   - Verify test user is listed

3. **Try different browser:**
   - Use incognito/private mode
   - Or try Chrome/Firefox/Edge

4. **Check for typos:**
   - Client ID has no extra spaces
   - Client Secret has no extra spaces
   - Redirect URI is exactly correct

5. **Wait longer:**
   - Google changes can take 5-10 minutes
   - Try again after waiting

---

## 📝 Quick Verification Command

**After checking Google Console, verify your app config:**

Visit: http://localhost:3000/api/test-oauth

Should show:
```json
{
  "hasGoogleClientId": true,
  "hasGoogleClientSecret": true,
  "redirectUri": "http://localhost:3000/api/auth/callback/google"
}
```

**If any are `false` or different, fix them!**

---

## 🎯 Most Important

**The redirect URI must be EXACTLY:**
```
http://localhost:3000/api/auth/callback/google
```

**One character difference = OAuth failure!**

Double-check this first, then test again! 🚀

