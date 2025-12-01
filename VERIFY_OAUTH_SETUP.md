# ✅ Verify Google OAuth Setup

## 🔍 Step-by-Step Verification

### 1. **Check Redirect URI in Google Console**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, verify you have EXACTLY:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   - ✅ Must start with `http://` (not `https://`)
   - ✅ Must be `localhost:3000` (not `127.0.0.1`)
   - ✅ Must include `/api/auth/callback/google`
   - ✅ No trailing slash
   - ✅ No extra spaces

### 2. **Check OAuth Consent Screen**

1. Go to **APIs & Services** → **OAuth consent screen**
2. Verify:
   - ✅ **User Type**: External or Internal (should be set)
   - ✅ **App name**: Set (e.g., "Job Advertisement System")
   - ✅ **User support email**: Set (e.g., sherifrosas.ai@gmail.com)
   - ✅ **Developer contact information**: Set
   - ✅ **Scopes**: Should include `email`, `profile`, `openid`
   - ✅ **Test users** (if in Testing mode): Add your Gmail address

### 3. **Check Credentials in `.env.local`**

Verify your `.env.local` file has:
```env
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
```

**Important:**
- ✅ Client ID should end with `.apps.googleusercontent.com`
- ✅ No extra quotes or spaces
- ✅ Values match Google Console exactly

### 4. **Check Application Type**

In Google Console → Credentials → Your OAuth Client:
- ✅ **Application type**: Should be "Web application"
- ✅ **Authorized JavaScript origins**: Should include `http://localhost:3000`

### 5. **Wait for Propagation**

After making changes:
- ⏱️ Wait 1-2 minutes for Google to update
- 🔄 Restart your development server
- 🧹 Clear browser cache/cookies

---

## 🧪 Test Steps

1. **Clear URL Error:**
   - Go to: `http://localhost:3000/login` (without any `?error=` parameters)
   - Or refresh the page after the error is cleared

2. **Test Login:**
   - Click "Continue with Google"
   - Should redirect to Google login page
   - After login, should redirect to `/verify`

3. **Check Browser Console:**
   - Open F12 → Console
   - Look for any errors
   - Check Network tab for failed requests

---

## ❌ Common Issues

### Issue: "redirect_uri_mismatch"
**Fix:** Verify redirect URI matches exactly in Google Console

### Issue: "access_denied"
**Fix:** 
- Check OAuth consent screen is configured
- If in Testing mode, add your email as test user
- Check scopes are added

### Issue: "invalid_client"
**Fix:**
- Verify Client ID and Secret in `.env.local`
- Restart server after updating `.env.local`
- Check credentials match Google Console

### Issue: Still showing error after fixing
**Fix:**
- Clear browser cache/cookies
- Use incognito/private mode
- Restart development server
- Wait 2-3 minutes for Google to update

---

## 📋 Quick Checklist

- [ ] Redirect URI added: `http://localhost:3000/api/auth/callback/google`
- [ ] OAuth consent screen configured
- [ ] Test user added (if in Testing mode)
- [ ] Client ID and Secret in `.env.local`
- [ ] `NEXTAUTH_URL` set to `http://localhost:3000`
- [ ] Server restarted after `.env.local` changes
- [ ] Browser cache cleared
- [ ] Waited 1-2 minutes after Google Console changes

---

## 🆘 Still Not Working?

**Share these details:**
1. Exact redirect URI from Google Console
2. OAuth consent screen status (Testing/Published)
3. Any error messages from browser console
4. Network tab showing the failed request


