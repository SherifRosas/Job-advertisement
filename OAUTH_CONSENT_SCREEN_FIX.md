# ✅ OAuth Consent Screen Configuration

## Your Redirect URI is CORRECT! ✅

Your Google Console shows:
- ✅ Redirect URI: `http://localhost:3000/api/auth/callback/google` ✓
- ✅ Client ID matches your configuration ✓
- ✅ Client Secret is enabled ✓

**The issue is most likely the OAuth Consent Screen configuration.**

---

## 🔍 Check OAuth Consent Screen

### Step 1: Navigate to OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **OAuth consent screen**

### Step 2: Check Publishing Status

Look at the top of the page. You'll see one of these:

#### Option A: "Testing" Status
- ⚠️ **This means only test users can log in!**
- You MUST add your Gmail address as a test user
- Follow steps below to add test user

#### Option B: "In production" Status
- ✅ Anyone can log in
- If you see this, the consent screen should work
- Check that required fields are filled

---

## 🔧 If in "Testing" Mode - Add Test User

### Step 1: Find Test Users Section

1. On the OAuth consent screen page
2. Scroll down to find **"Test users"** section
3. Or look for a tab/section labeled **"Test users"**

### Step 2: Add Your Gmail

1. Click **"+ ADD USERS"** button
2. Enter your Gmail address: `sherifrosas.ai@gmail.com`
3. Click **"ADD"** or **"SAVE"**
4. Your email should appear in the test users list

### Step 3: Verify

- ✅ Your Gmail address should be listed under "Test users"
- ✅ Status should show as active/enabled

---

## ✅ Required OAuth Consent Screen Fields

Make sure these are filled:

1. **User Type**: 
   - External (for anyone) or Internal (for Google Workspace)
   - Must be selected

2. **App information**:
   - ✅ App name: "Job Advertisement System" (or similar)
   - ✅ User support email: sherifrosas.ai@gmail.com
   - ✅ App logo: (optional)

3. **App domain** (optional but recommended):
   - Homepage URL: `http://localhost:3000`
   - Privacy policy URL: (optional)
   - Terms of service URL: (optional)

4. **Authorized domains**:
   - Should include `localhost` (automatically added from redirect URI)

5. **Developer contact information**:
   - ✅ Email: sherifrosas.ai@gmail.com

6. **Scopes**:
   - Should include: `email`, `profile`, `openid`
   - These are usually added automatically

---

## 🧪 After Adding Test User

1. **Wait 1-2 minutes** for Google to update
2. **Clear browser cache/cookies**:
   - Press `Ctrl+Shift+Delete`
   - Or use incognito/private mode
3. **Go to**: `http://localhost:3000/login`
4. **Click**: "Continue with Google"
5. **Expected**: Should redirect to Google login page
6. **After login**: Should redirect to `/verify`

---

## ❌ Common Issues

### Issue 1: "Access blocked: This app's request is invalid"
**Cause**: OAuth consent screen not configured or missing test user

**Fix**:
- Complete OAuth consent screen setup
- If in Testing mode, add your Gmail as test user
- Wait 1-2 minutes after changes

### Issue 2: "Error 400: redirect_uri_mismatch"
**Cause**: Redirect URI doesn't match (but yours is correct!)

**Fix**:
- Double-check redirect URI matches exactly
- Wait 5 minutes for Google to update (can take time)

### Issue 3: "Error 403: access_denied"
**Cause**: User not authorized (not in test users list if in Testing mode)

**Fix**:
- Add your Gmail to test users list
- Or publish the app (if you can)

---

## 📋 Quick Checklist

- [ ] OAuth consent screen is configured
- [ ] App name is set
- [ ] Support email is set
- [ ] If in Testing mode: Your Gmail added as test user
- [ ] Waited 1-2 minutes after changes
- [ ] Cleared browser cache/cookies
- [ ] Tried login again

---

## 🆘 Still Not Working?

**Check these:**

1. **Test User Email**:
   - Is it the EXACT email you're using to log in?
   - No typos?
   - Same email as in your Google account?

2. **Publishing Status**:
   - If in Testing mode, only test users can log in
   - If you want anyone to log in, you need to publish (requires verification)

3. **Wait Time**:
   - Google says changes can take "five minutes to a few hours"
   - Try waiting 5-10 minutes if it just changed

4. **Try Incognito Mode**:
   - Open incognito/private window
   - Go to `http://localhost:3000/login`
   - Try logging in
   - This eliminates cache/cookie issues

---

## ✅ Expected Result

After fixing:
1. Click "Continue with Google"
2. Redirects to Google login page
3. You see consent screen (if first time)
4. After approving, redirects to `/verify`
5. Shows email/phone verification page


