# 🧪 Testing Google OAuth

## ✅ Configuration Verified

- ✅ Google Client ID: Configured
- ✅ Google Client Secret: Configured
- ✅ NextAuth Secret: Configured
- ✅ NextAuth URL: http://localhost:3000

---

## 🧪 Test Steps

### 1. Wait for Server to Start

The dev server is starting. Wait for:
```
✓ Ready in [time]
○ Local: http://localhost:3000
```

### 2. Open Browser

1. **Go to:** http://localhost:3000
2. **You should see:** The landing page with "Apply Now" or "Login" button

### 3. Test Google Login

1. **Click:** "Login" or "Sign in with Google" button
2. **You should be redirected to:** Google OAuth consent screen
3. **Select your Google account**
4. **Click:** "Allow" or "Continue"
5. **You should be redirected back to:** Your application

### 4. Verify Login Success

After logging in, you should:
- ✅ See your name/email displayed
- ✅ Be able to access the application form
- ✅ See a "Logout" button

---

## ✅ Success Indicators

**If everything works:**
- ✅ Redirects to Google login page
- ✅ Shows consent screen with your app name
- ✅ Redirects back after approval
- ✅ User is logged in
- ✅ Can access protected pages

---

## ❌ Common Issues

### "Redirect URI mismatch"

**Error:** `redirect_uri_mismatch`

**Fix:**
1. Go to Google Cloud Console → Credentials
2. Edit your OAuth client
3. Check "Authorized redirect URIs":
   - Should be: `http://localhost:3000/api/auth/callback/google`
   - No trailing slash
   - Correct port (3000)

### "Invalid client"

**Error:** `invalid_client`

**Fix:**
1. Check `.env.local` file
2. Verify Client ID and Secret are correct
3. No extra spaces
4. Quotes are correct

### "Access blocked"

**Error:** `access_denied`

**Fix:**
1. OAuth consent screen might need verification
2. For testing, add your email as a test user
3. Go to: OAuth consent screen → Test users → Add your email

---

## 🎯 What to Test

1. **Login Flow:**
   - [ ] Click login button
   - [ ] Redirects to Google
   - [ ] Select account
   - [ ] Approve permissions
   - [ ] Redirects back
   - [ ] User logged in

2. **User Creation:**
   - [ ] Check database (Supabase Table Editor)
   - [ ] New user record created
   - [ ] Email matches Google account

3. **Session:**
   - [ ] Refresh page - still logged in
   - [ ] Logout works
   - [ ] Can login again

---

## 💬 Tell Me

After testing, tell me:
- **"It works!"** → Great! Let's continue!
- **"I see [error]"** → I'll help fix it!
- **"Login page doesn't appear"** → Let's check the routes!

---

## 🚀 Next Steps After Testing

Once Google OAuth works:
1. ✅ Continue with other setup steps
2. ✅ Test the full application flow
3. ✅ Configure other services (Paymob, OpenAI, etc.)

**Let's test it! 🎉**


