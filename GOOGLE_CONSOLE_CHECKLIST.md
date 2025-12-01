# ✅ Google Console Checklist

## Your Next.js Configuration is CORRECT ✅

Your diagnostic shows:
- ✅ Google Client ID: Set
- ✅ Google Client Secret: Set  
- ✅ NextAuth Secret: Set
- ✅ NextAuth URL: `http://localhost:3000`
- ✅ Redirect URI: `http://localhost:3000/api/auth/callback/google`

**The issue is in Google Cloud Console configuration.**

---

## 🔍 Step-by-Step Google Console Check

### Step 1: Verify Redirect URI

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your **OAuth 2.0 Client ID**
4. Scroll to **Authorized redirect URIs**
5. **Verify you have EXACTLY:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```

**Important:**
- ✅ Must be `http://` (not `https://`)
- ✅ Must be `localhost:3000` (not `127.0.0.1`)
- ✅ Must include `/api/auth/callback/google`
- ✅ No trailing slash
- ✅ No extra spaces
- ✅ Case-sensitive

**If missing or different:**
1. Click **+ ADD URI**
2. Enter: `http://localhost:3000/api/auth/callback/google`
3. Click **SAVE**
4. Wait 1-2 minutes for changes to propagate

---

### Step 2: Check OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Verify the following:

**Required Fields:**
- ✅ **User Type**: External or Internal (must be selected)
- ✅ **App name**: Set (e.g., "Job Advertisement System")
- ✅ **User support email**: Set (e.g., sherifrosas.ai@gmail.com)
- ✅ **Developer contact information**: Set

**If in Testing Mode:**
- ✅ **Test users**: Add your Gmail address
  - Click **+ ADD USERS**
  - Enter your Gmail address
  - Click **ADD**
  - **Important**: Only test users can log in when in Testing mode

**Scopes:**
- ✅ Should include: `email`, `profile`, `openid`
- These are usually added automatically

---

### Step 3: Check Application Type

1. In your OAuth Client settings (Credentials page)
2. Verify:
   - ✅ **Application type**: "Web application"
   - ✅ **Authorized JavaScript origins**: Should include `http://localhost:3000`

---

## 🧪 After Making Changes

1. **Wait 1-2 minutes** for Google to update
2. **Clear browser cache/cookies** (or use incognito mode)
3. **Restart your development server** (if needed)
4. **Try logging in again**

---

## ❌ Common Mistakes

### Mistake 1: Wrong Protocol
- ❌ `https://localhost:3000/api/auth/callback/google`
- ✅ `http://localhost:3000/api/auth/callback/google`

### Mistake 2: Wrong Host
- ❌ `http://127.0.0.1:3000/api/auth/callback/google`
- ✅ `http://localhost:3000/api/auth/callback/google`

### Mistake 3: Trailing Slash
- ❌ `http://localhost:3000/api/auth/callback/google/`
- ✅ `http://localhost:3000/api/auth/callback/google`

### Mistake 4: Missing Path
- ❌ `http://localhost:3000`
- ✅ `http://localhost:3000/api/auth/callback/google`

### Mistake 5: Testing Mode Without Test User
- ❌ OAuth consent screen in Testing mode but no test users
- ✅ Add your Gmail as a test user

---

## 📋 Final Checklist

- [ ] Redirect URI in Google Console: `http://localhost:3000/api/auth/callback/google`
- [ ] Redirect URI matches EXACTLY (no trailing slash, correct protocol)
- [ ] OAuth consent screen configured (app name, email)
- [ ] If in Testing mode: Your Gmail added as test user
- [ ] Application type: Web application
- [ ] Authorized JavaScript origins: `http://localhost:3000`
- [ ] Waited 1-2 minutes after changes
- [ ] Cleared browser cache/cookies
- [ ] Tried login again

---

## 🆘 Still Not Working?

**Double-check:**
1. Copy the redirect URI from Google Console
2. Compare it character-by-character with: `http://localhost:3000/api/auth/callback/google`
3. Make sure there are no extra spaces or characters

**Check OAuth Consent Screen:**
1. Is it in "Testing" mode?
2. If yes, is your Gmail address in the test users list?
3. If no, try publishing it (if you can) or add yourself as a test user

**Try in Incognito Mode:**
- Open an incognito/private window
- Go to `http://localhost:3000/login`
- Try logging in
- This eliminates cache/cookie issues

---

## ✅ Expected Result

After fixing:
1. Click "Continue with Google"
2. Redirects to Google login page
3. After login, redirects to `/verify`
4. Shows email/phone verification page


