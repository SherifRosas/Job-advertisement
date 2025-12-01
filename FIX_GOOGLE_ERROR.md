# 🔧 Fix: `error=google` in URL

## 🔍 Error Details

From console:
- **Error**: `google`
- **Description**: `No description`
- **Full URL**: `http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fverify&error=google`

This means Google OAuth is returning an error to NextAuth.

---

## ✅ Configuration Verified

All your configuration is correct:
- ✅ Redirect URI: `http://localhost:3000/api/auth/callback/google`
- ✅ Client ID: Matches
- ✅ Client Secret: Enabled
- ✅ OAuth Consent Screen: In production
- ✅ User Type: External

---

## 🔧 Solutions to Try

### Solution 1: Clear Error from URL

The error might be cached in the URL. Try:

1. **Go to clean URL:**
   ```
   http://localhost:3000/login
   ```
   (Without `?error=google`)

2. **Or clear browser cache:**
   - Press `Ctrl+Shift+Delete`
   - Clear cookies and cache
   - Try again

### Solution 2: Use Incognito Mode

1. Press `Ctrl+Shift+N` (Chrome) or `Ctrl+Shift+P` (Firefox)
2. Go to: `http://localhost:3000/login`
3. Click "Continue with Google"
4. This eliminates cache/cookie issues

### Solution 3: Wait for Google to Update

Google says: **"It may take five minutes to a few hours for settings to take effect"**

If you just:
- Added redirect URI
- Changed OAuth consent screen
- Updated credentials

**Wait 5-10 minutes** and try again.

### Solution 4: Check Server Logs

When you click "Continue with Google", check your server terminal for:

```
signIn callback called: { provider: 'google', email: '...', hasAccount: true }
```

**If you see this:**
- ✅ OAuth flow is working
- ✅ The callback is being reached
- Issue might be in user creation/update

**If you DON'T see this:**
- ❌ OAuth flow isn't reaching the callback
- ❌ Google might be rejecting the request
- Wait longer or check Google Console again

### Solution 5: Verify Redirect URI One More Time

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Click your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, verify:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
5. **Copy it exactly** - check for:
   - No trailing slash
   - No extra spaces
   - Exact match

### Solution 6: Check Authorized JavaScript Origins

1. In your OAuth Client settings
2. Under **Authorized JavaScript origins**
3. Make sure you have:
   ```
   http://localhost:3000
   ```
4. If missing, add it and save

---

## 🧪 Test Steps

1. **Clear browser cache/cookies** (or use incognito)
2. **Go to**: `http://localhost:3000/login` (clean URL)
3. **Open browser console** (F12)
4. **Open server terminal** (to see logs)
5. **Click "Continue with Google"**
6. **Watch for:**
   - Does it redirect to Google?
   - What happens in browser console?
   - What appears in server terminal?

---

## 📋 What to Check

### Browser Console (F12)
- Any new error messages?
- Does it show redirect to Google?
- Network tab: Status of `/api/auth/signin/google`?

### Server Terminal
- Do you see `signIn callback called`?
- Any error messages?
- NextAuth initialization messages?

### Google Login Page
- Does it redirect to Google login?
- What error does Google show (if any)?
- Can you log in successfully?

---

## ❌ If Still Failing

**Share these details:**

1. **What happens when you click the button?**
   - Redirects to Google?
   - Shows error immediately?
   - Nothing happens?

2. **Browser console (F12 → Console)**
   - Any new errors?
   - Network tab: Status code of `/api/auth/signin/google`?

3. **Server terminal**
   - Do you see `signIn callback called`?
   - Any error messages?

4. **Google Console**
   - Screenshot of redirect URIs
   - When was it last modified?

---

## 💡 Common Last Issues

### Issue: Still shows `error=google` after waiting
**Fix:**
- Try in incognito mode
- Clear all browser data
- Wait 10-15 minutes
- Check if redirect URI is saved in Google Console

### Issue: Redirects to Google but shows error there
**Fix:**
- Check what error Google shows
- Verify OAuth consent screen is complete
- Check if scopes are added

### Issue: Nothing happens when clicking button
**Fix:**
- Check browser console for JavaScript errors
- Check if server is running
- Check Network tab for failed requests

---

## ✅ Expected Success Flow

1. Click "Continue with Google"
2. Redirects to Google login page
3. Enter credentials and approve
4. Redirects back to `/verify`
5. Shows email/phone verification page
6. Server shows: `signIn callback called`

Good luck! 🚀


