# ✅ Final OAuth Test Checklist

## ✅ What's Already Done

- ✅ Publishing status: **Testing**
- ✅ User type: **External**
- ✅ Test user added: **sherifrosas.ai@gmail.com**
- ✅ OAuth Consent Screen configured

## 🔍 Final Verification Steps

### Step 1: Verify Redirect URI

**Go to:** https://console.cloud.google.com/apis/credentials

1. Click on your **OAuth 2.0 Client ID**
2. Scroll to **"Authorized redirect URIs"**
3. **Must have exactly:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```
4. **If missing:**
   - Click "ADD URI"
   - Paste: `http://localhost:3000/api/auth/callback/google`
   - Click "SAVE"
   - Wait 1-2 minutes

### Step 2: Verify Environment Variables

**Check `.env.local` file has:**

```bash
GOOGLE_CLIENT_ID=655273695546-qlsle4a...
GOOGLE_CLIENT_SECRET=GOCSPX-...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

**Verify they're loaded:**
- Visit: http://localhost:3000/api/test-oauth
- Should show all `true` values

### Step 3: Restart Dev Server

1. **Stop server:** Press `Ctrl+C` in terminal
2. **Start server:** `npm run dev`
3. **Wait for:** "Ready on http://localhost:3000"

### Step 4: Clear Browser Cache

- **Option 1:** Use incognito/private mode
- **Option 2:** Clear cache for `localhost:3000`
- **Option 3:** Hard refresh: `Ctrl+Shift+R` (Windows)

### Step 5: Test OAuth Login

1. **Go to:** http://localhost:3000/login
2. **Click:** "Continue with Google"
3. **Select/Enter:** `sherifrosas.ai@gmail.com`
4. **Grant permissions** (if asked)
5. **Should redirect to:** `/verify` page

### Step 6: Check Terminal Logs

**Watch your server terminal for:**

**✅ Success indicators:**
```
POST /api/auth/signin/google 200
GET /api/auth/signin/google?callbackUrl=/verify 302
signIn callback called: { provider: 'google', email: 'sherifrosas.ai@gmail.com', hasAccount: true }
User created successfully: [user-id]
GET /verify 200
```

**❌ Error indicators:**
```
GET /login?error=google 200
```
(No `signIn callback called` log)

---

## 🎯 Expected Flow

1. **Click "Continue with Google"**
   - Button shows "Loading..."
   - Redirects to Google login page

2. **Google Login Page**
   - Shows "Job Advertisement System" (your app name)
   - Select/enter: `sherifrosas.ai@gmail.com`
   - Click "Continue" or "Allow"

3. **Google Redirects Back**
   - URL: `http://localhost:3000/api/auth/callback/google?code=...`
   - NextAuth processes the callback
   - Terminal shows: `signIn callback called`

4. **Redirect to Verify Page**
   - URL: `http://localhost:3000/verify`
   - Shows email/phone verification form
   - **This means OAuth worked!** ✅

---

## 🆘 Troubleshooting

### If you still see `error=google`:

1. **Double-check redirect URI:**
   - Must be exactly: `http://localhost:3000/api/auth/callback/google`
   - No trailing slash
   - No `https://`
   - No `127.0.0.1`

2. **Verify test user:**
   - Must be: `sherifrosas.ai@gmail.com`
   - Same email you're using to login

3. **Check environment variables:**
   - Visit: http://localhost:3000/api/test-oauth
   - All should be `true`

4. **Wait for Google:**
   - Changes can take 1-2 minutes to propagate
   - Try again after waiting

5. **Clear everything:**
   - Clear browser cache
   - Restart dev server
   - Try incognito mode

### If `signIn callback called` doesn't appear:

- Google is still rejecting the request
- Check redirect URI one more time
- Verify test user email matches exactly
- Check browser console (F12) for errors

### If you get redirected but see errors:

- Check terminal for error messages
- Check browser console (F12)
- Verify Supabase connection is working
- Check database tables exist

---

## ✅ Success Criteria

You'll know OAuth is working when:

- ✅ No `error=google` in URL
- ✅ Terminal shows `signIn callback called`
- ✅ Redirects to `/verify` page
- ✅ No error messages on verify page
- ✅ Can see your email in the verification form

---

## 📝 Quick Test Command

**After setup, test with:**

1. Open: http://localhost:3000/login
2. Click: "Continue with Google"
3. Login with: `sherifrosas.ai@gmail.com`
4. Watch terminal for: `signIn callback called`

**If you see that log, OAuth is working!** 🎉

---

## 🎯 Next Steps After OAuth Works

Once OAuth is working:

1. **Test email verification**
2. **Test phone verification**
3. **Test application form**
4. **Test payment flow**
5. **Test admin dashboard**

But first, let's get OAuth working! 🚀

---

## 📋 Final Checklist

Before testing:

- [ ] Redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- [ ] Test user added: `sherifrosas.ai@gmail.com`
- [ ] Environment variables loaded (check `/api/test-oauth`)
- [ ] Dev server running
- [ ] Browser cache cleared (or incognito)
- [ ] Ready to test!

**Go ahead and test now!** Let me know what you see in the terminal! 🚀
