# 🔍 Checking Login Error

## ❌ Error: "Login failed. Please check console for details."

### What to Check

1. **Browser Console (F12 → Console tab)**
   - Look for error messages
   - Look for "Login exception:" logs
   - Copy any red error messages

2. **Server Terminal**
   - Look for error messages
   - Check if NextAuth is initializing
   - Look for database connection errors

3. **Network Tab (F12 → Network tab)**
   - Click "Continue with Google"
   - Look for requests to `/api/auth/signin/google`
   - Check if request fails (red)
   - Check response status code

---

## 🔧 Common Causes

### Cause 1: NextAuth Not Initialized

**Symptoms:**
- Error in console about NextAuth
- API route not found

**Fix:**
- Check if `/api/auth/[...nextauth]/route.ts` exists
- Verify NextAuth is properly configured

### Cause 2: Missing Environment Variables

**Symptoms:**
- "Configuration error"
- "Missing credentials"

**Fix:**
- Check `.env.local` has all required variables
- Restart server after updating `.env.local`

### Cause 3: Google OAuth Configuration

**Symptoms:**
- "Invalid client"
- "Redirect URI mismatch"

**Fix:**
- Check Google Console → Credentials
- Verify redirect URI matches exactly

### Cause 4: Database Connection Error

**Symptoms:**
- Error in auth callback
- User creation failing

**Fix:**
- Check Supabase connection
- Verify credentials in `.env.local`

---

## 📋 What to Share

**Please share:**

1. **Browser Console Error:**
   - Copy the exact error message
   - Include the full stack trace if available

2. **Server Terminal Error:**
   - Any error messages when you click login
   - Any build/compilation errors

3. **Network Request:**
   - Status code of `/api/auth/signin/google` request
   - Response body if available

---

## 🧪 Quick Test

**Try this:**
1. Open browser console (F12)
2. Click "Continue with Google"
3. Immediately check console
4. Copy all error messages
5. Share them with me

---

## 💡 Expected Console Output

**If working:**
```
Login button clicked, starting Google OAuth...
signIn result: { ok: true, url: 'https://accounts.google.com/...' }
Redirecting to: https://accounts.google.com/...
```

**If failing:**
```
Login button clicked, starting Google OAuth...
Login exception: [error message]
Full error details: [error object]
```

---

## 🆘 Still Need Help?

**Share the exact error message from console and I'll fix it!**


