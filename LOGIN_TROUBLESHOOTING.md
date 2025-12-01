# 🔧 Login Troubleshooting

## ❌ Issue: Cannot Login

### What to Check

1. **Browser Console (F12)**
   - Open Developer Tools (F12)
   - Go to "Console" tab
   - Look for red error messages
   - Share any errors you see

2. **Server Terminal**
   - Look at the terminal where `npm run dev` is running
   - Check for error messages
   - Look for database connection errors
   - Share any errors you see

3. **What Happens When You Click "Continue with Google"?**
   - Does it redirect to Google login?
   - Does it get stuck on a loading screen?
   - Does it show an error message?
   - Does it redirect back but not log you in?

---

## 🔍 Common Issues & Fixes

### Issue 1: Redirect Loop

**Symptoms:**
- Keeps redirecting between pages
- Never completes login

**Possible Causes:**
- Auth callback error
- Database connection issue
- Session not being created

**Fix:**
- Check if Supabase client is working
- Verify user creation in callback
- Check NEXTAUTH_SECRET is set

### Issue 2: Stuck on Google Login

**Symptoms:**
- Redirects to Google
- Selects account
- Approves permissions
- But doesn't redirect back

**Possible Causes:**
- Redirect URI mismatch
- NEXTAUTH_URL incorrect
- Google OAuth configuration issue

**Fix:**
- Check Google Console → Credentials
- Verify redirect URI: `http://localhost:3000/api/auth/callback/google`
- Check NEXTAUTH_URL in .env.local

### Issue 3: Error After Google Approval

**Symptoms:**
- Redirects back from Google
- Shows error page
- Or redirects to error

**Possible Causes:**
- Auth callback error
- User creation failing
- Database error

**Fix:**
- Check server logs for errors
- Verify Supabase connection
- Check if user table exists

### Issue 4: No Redirect to Google

**Symptoms:**
- Click "Continue with Google"
- Nothing happens
- Button doesn't work

**Possible Causes:**
- JavaScript error
- signIn function not working
- Network error

**Fix:**
- Check browser console for errors
- Verify NextAuth is configured
- Check network tab for failed requests

---

## 🧪 Debug Steps

### Step 1: Check Browser Console

1. Open Developer Tools (F12)
2. Go to Console tab
3. Click "Continue with Google"
4. Look for errors
5. Share what you see

### Step 2: Check Network Tab

1. Open Developer Tools (F12)
2. Go to Network tab
3. Click "Continue with Google"
4. Look for failed requests (red)
5. Check the response

### Step 3: Check Server Logs

1. Look at terminal where server is running
2. Click "Continue with Google"
3. Look for error messages
4. Share what you see

### Step 4: Check Supabase

1. Go to Supabase dashboard
2. Check Table Editor → users table
3. See if any user was created
4. Check for errors

---

## 🔧 Quick Fixes to Try

### Fix 1: Restart Server

```bash
# Stop server (Ctrl+C)
# Restart
npm run dev
```

### Fix 2: Clear Browser Cache

1. Hard refresh: `Ctrl+F5`
2. Or clear cache and cookies
3. Try login again

### Fix 3: Check Environment Variables

Verify in `.env.local`:
- `GOOGLE_CLIENT_ID` is set
- `GOOGLE_CLIENT_SECRET` is set
- `NEXTAUTH_SECRET` is set
- `NEXTAUTH_URL` is set to `http://localhost:3000`

### Fix 4: Check Google Console

1. Go to Google Cloud Console
2. Check OAuth credentials
3. Verify redirect URI matches exactly:
   `http://localhost:3000/api/auth/callback/google`

---

## 💬 What to Share

**To help debug, please share:**

1. **What happens when you click "Continue with Google"?**
   - Describe the exact behavior

2. **Browser console errors (F12 → Console)**
   - Copy any red error messages

3. **Server terminal errors**
   - Copy any error messages

4. **Network errors (F12 → Network)**
   - Any failed requests?

5. **Supabase dashboard**
   - Is a user created in the users table?

---

## 🎯 Expected Behavior

**Normal login flow:**
1. Click "Continue with Google"
2. Redirects to Google login page
3. Select Google account
4. Approve permissions
5. Redirects back to `/verify` page
6. User is logged in
7. User record created in Supabase

**If any step fails, that's where the issue is!**

---

## 🆘 Still Having Issues?

**Share:**
- What step fails
- Error messages you see
- What you've tried

**I'll help you fix it! 🔧**


