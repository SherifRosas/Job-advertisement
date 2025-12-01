# 📍 Where to Look for OAuth Logs

## 🔍 Server Terminal vs Browser Console

### Server Terminal (Where to Look)
- **Location**: The terminal where you run `npm run dev`
- **Shows**: Server-side logs, NextAuth callbacks, database operations
- **Logs you'll see**:
  - `signIn callback called: { provider: 'google', ... }`
  - `User created successfully: ...`
  - `User updated successfully: ...`
  - Any database errors

### Browser Console (Different Location)
- **Location**: Press F12 in browser → Console tab
- **Shows**: Client-side JavaScript logs, network errors
- **Logs you'll see**:
  - `Login button clicked, starting Google OAuth...`
  - `signIn result: ...`
  - OAuth error messages
  - Network request errors

---

## 📋 Step-by-Step: Finding Server Terminal

### Step 1: Identify Your Server Terminal

**Look for the terminal that shows:**
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in X.XXs
```

**This is your development server terminal.**

### Step 2: Keep It Visible

- Don't close this terminal
- Keep it open and visible
- Watch it while testing login

### Step 3: Test Login

1. Go to: `http://localhost:3000/login`
2. Click "Continue with Google"
3. **Watch the SERVER terminal** (not browser console)

### Step 4: Look for Logs

**In SERVER terminal, you should see:**
```
signIn callback called: { provider: 'google', email: 'your@email.com', hasAccount: true }
User created successfully: abc-123-def-456
```
or
```
signIn callback called: { provider: 'google', email: 'your@email.com', hasAccount: true }
User updated successfully: abc-123-def-456
```

---

## 🔍 What Each Log Means

### ✅ `signIn callback called`
- **Meaning**: OAuth flow reached your server
- **Good sign**: Google redirected back successfully
- **Next**: Check if user creation/update worked

### ✅ `User created successfully`
- **Meaning**: New user was created in database
- **Good sign**: Everything is working!

### ✅ `User updated successfully`
- **Meaning**: Existing user was updated
- **Good sign**: Everything is working!

### ❌ No logs at all
- **Meaning**: OAuth flow didn't reach your server
- **Possible causes**:
  - Google rejected the request
  - Redirect URI mismatch
  - OAuth consent screen issue
  - Network error

### ❌ `Error creating user` or `Error updating user`
- **Meaning**: OAuth worked, but database operation failed
- **Check**: Database connection, Supabase credentials

---

## 🧪 Testing Checklist

When testing login:

- [ ] Server terminal is open and visible
- [ ] Click "Continue with Google"
- [ ] Watch SERVER terminal (not browser)
- [ ] Look for `signIn callback called`
- [ ] Check if user was created/updated
- [ ] Note any error messages

---

## 📸 Example Server Terminal Output

**Successful login:**
```
signIn callback called: { provider: 'google', email: 'user@gmail.com', hasAccount: true }
User created successfully: 550e8400-e29b-41d4-a716-446655440000
```

**Existing user:**
```
signIn callback called: { provider: 'google', email: 'user@gmail.com', hasAccount: true }
User updated successfully: 550e8400-e29b-41d4-a716-446655440000
```

**Error:**
```
signIn callback called: { provider: 'google', email: 'user@gmail.com', hasAccount: true }
Error creating user: [error details]
```

**No callback (OAuth failed):**
```
(No logs appear - OAuth didn't reach your server)
```

---

## 💡 Pro Tips

1. **Keep both terminals visible**:
   - Server terminal (for server logs)
   - Browser console (for client logs)

2. **Clear terminal before testing**:
   - Clear the server terminal
   - Easier to see new logs

3. **Watch in real-time**:
   - Click the button
   - Immediately watch server terminal
   - Logs appear as OAuth processes

4. **Compare with browser console**:
   - Server terminal: Server-side flow
   - Browser console: Client-side flow
   - Both together show the full picture

---

## 🆘 Still Can't Find It?

**If you can't find your server terminal:**

1. **Check if server is running**:
   - Go to `http://localhost:3000`
   - If page loads, server is running
   - Find the terminal that started it

2. **Restart server**:
   - Stop current server (Ctrl+C)
   - Run `npm run dev` again
   - Watch this terminal

3. **Check multiple terminals**:
   - You might have multiple terminals open
   - Find the one showing Next.js startup

---

## ✅ Summary

- **Server Terminal**: Where `signIn callback called` appears
- **Browser Console**: Where client-side logs appear
- **Both are useful**: Check both for complete picture

Good luck! 🚀


