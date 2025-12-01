# 🔍 OAuth Diagnostic Steps

## Step 1: Check Configuration

Visit this URL in your browser:
```
http://localhost:3000/api/test-oauth
```

This will show:
- ✅ Whether Google Client ID is set
- ✅ Whether Google Client Secret is set
- ✅ Whether NextAuth Secret is set
- ✅ What redirect URI should be configured

**Expected redirect URI:**
```
http://localhost:3000/api/auth/callback/google
```

---

## Step 2: Verify Google Console Settings

### A. Redirect URI
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Click your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, verify you have:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   - Must match EXACTLY (case-sensitive)
   - No trailing slash
   - Must be `http://` not `https://`
   - Must be `localhost` not `127.0.0.1`

### B. OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. Verify:
   - ✅ App name is set
   - ✅ Support email is set
   - ✅ If in **Testing** mode, add your Gmail as test user
   - ✅ Scopes include: `email`, `profile`, `openid`

### C. Application Type
1. In your OAuth Client settings:
   - ✅ Application type: **Web application**
   - ✅ Authorized JavaScript origins: `http://localhost:3000`

---

## Step 3: Check Environment Variables

Open `.env.local` and verify:
```env
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
```

**Important:**
- No extra spaces or quotes
- Values match Google Console exactly
- Restart server after changes

---

## Step 4: Test the Flow

1. **Clear browser cache/cookies** (or use incognito)
2. Go to: `http://localhost:3000/login`
3. Open browser console (F12)
4. Click "Continue with Google"
5. Watch console for errors
6. Check Network tab for failed requests

---

## Step 5: Check Server Logs

Look at your server terminal for:
- NextAuth initialization errors
- Database connection errors
- Missing environment variable warnings

---

## Common Issues & Fixes

### Issue: "redirect_uri_mismatch"
**Cause:** Redirect URI in Google Console doesn't match what NextAuth uses

**Fix:**
1. Check `/api/test-oauth` for expected redirect URI
2. Copy that exact URI
3. Add it to Google Console → Authorized redirect URIs
4. Wait 1-2 minutes
5. Try again

### Issue: "access_denied"
**Cause:** OAuth consent screen not configured or user not authorized

**Fix:**
1. Go to OAuth consent screen
2. Complete all required fields
3. If in Testing mode, add your email as test user
4. Save and wait

### Issue: "invalid_client"
**Cause:** Client ID or Secret incorrect

**Fix:**
1. Verify credentials in Google Console
2. Copy exact values to `.env.local`
3. Restart server
4. Try again

### Issue: Error persists after fixing
**Fix:**
1. Clear browser cache/cookies
2. Restart development server
3. Wait 2-3 minutes for Google to update
4. Try in incognito mode

---

## Diagnostic Checklist

- [ ] Visit `/api/test-oauth` - all values show as configured?
- [ ] Redirect URI in Google Console matches exactly
- [ ] OAuth consent screen configured
- [ ] Test user added (if in Testing mode)
- [ ] `.env.local` has correct values
- [ ] Server restarted after `.env.local` changes
- [ ] Browser cache cleared
- [ ] Waited 1-2 minutes after Google Console changes
- [ ] Checked server terminal for errors
- [ ] Checked browser console for errors

---

## Still Not Working?

**Share these details:**
1. Output from `/api/test-oauth`
2. Screenshot of redirect URIs in Google Console
3. OAuth consent screen status (Testing/Published)
4. Any errors from browser console
5. Any errors from server terminal


