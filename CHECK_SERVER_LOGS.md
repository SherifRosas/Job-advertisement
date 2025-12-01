# 🔍 How to Check Server Logs for OAuth

## 📍 Where to Look

**SERVER TERMINAL** - The terminal where you run `npm run dev`

---

## 🧪 Step-by-Step Test

### Step 1: Find Your Server Terminal

Look for the terminal window that shows:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in X.XXs
```

**This is your development server terminal.**

### Step 2: Clear Terminal (Optional)

Clear the terminal to make new logs easier to see:
- **Windows PowerShell**: `Clear-Host` or `cls`
- **Command Prompt**: `cls`
- **Or just scroll up** to see recent logs

### Step 3: Test Login

1. **Go to browser**: `http://localhost:3000/login`
2. **Click**: "Continue with Google"
3. **IMMEDIATELY watch your SERVER terminal**

### Step 4: Look for Logs

**Watch for these logs in SERVER terminal:**

---

## ✅ Success Logs (OAuth Working)

### Log 1: Callback Reached
```
signIn callback called: { provider: 'google', email: 'your@email.com', hasAccount: true }
```
**Meaning**: OAuth flow reached your server ✅

### Log 2: User Created (New User)
```
User created successfully: 550e8400-e29b-41d4-a716-446655440000
```
**Meaning**: New user was created in database ✅

### Log 2: User Updated (Existing User)
```
User updated successfully: 550e8400-e29b-41d4-a716-446655440000
```
**Meaning**: Existing user was updated ✅

---

## ❌ Failure Logs (OAuth Not Working)

### No Logs Appear
**Meaning**: OAuth flow didn't reach your server
**Possible causes**:
- Google rejected the request
- Redirect URI mismatch
- OAuth consent screen issue
- Network error

### Error Creating User
```
Error creating user: [error details]
```
**Meaning**: OAuth worked, but database failed
**Check**: Database connection, Supabase credentials

### Error Updating User
```
Error updating user: [error details]
```
**Meaning**: OAuth worked, but database update failed
**Check**: Database connection, Supabase credentials

---

## 📋 What to Report

After testing, tell me:

1. **Do you see `signIn callback called`?**
   - ✅ Yes → OAuth is working!
   - ❌ No → OAuth isn't reaching your server

2. **What other logs do you see?**
   - User created/updated?
   - Any errors?
   - Any other messages?

3. **What happens in browser?**
   - Does it redirect to Google?
   - Does it show an error?
   - Does it redirect back?

---

## 🔍 Example: Full Successful Flow

**Server Terminal:**
```
signIn callback called: { provider: 'google', email: 'user@gmail.com', hasAccount: true }
User created successfully: 550e8400-e29b-41d4-a716-446655440000
```

**Browser:**
- Redirects to Google login
- After login, redirects to `/verify`
- Shows email/phone verification page

---

## 🔍 Example: OAuth Failed

**Server Terminal:**
```
(No new logs appear)
```

**Browser:**
- Shows error: `error=google`
- Stays on login page
- Error message displayed

---

## 💡 Pro Tips

1. **Keep terminal visible**: Don't minimize it while testing
2. **Watch in real-time**: Click button, immediately watch terminal
3. **Compare with browser**: Check both server terminal and browser console
4. **Clear before testing**: Makes it easier to see new logs

---

## 🆘 Can't Find Server Terminal?

**If you can't find where you ran `npm run dev`:**

1. **Check if server is running**:
   - Go to `http://localhost:3000`
   - If page loads, server is running
   - Find the terminal that started it

2. **Restart server**:
   - Stop current server (Ctrl+C)
   - Run `npm run dev` again
   - Watch this terminal

3. **Check all terminal windows**:
   - You might have multiple terminals open
   - Find the one showing Next.js startup

---

## ✅ Summary

- **Server Terminal**: Where `signIn callback called` appears
- **Watch it**: While clicking "Continue with Google"
- **Report back**: What logs you see (or don't see)

This will help identify if OAuth is working or not! 🚀


