# 🔧 OAuth Consent Screen: Localhost Solution

## ❌ Problem

Google doesn't allow `localhost` in these fields:
- Application home page
- Application privacy policy link
- Application Terms of Service link

Error: "Invalid URL: cannot contain a local host domain"

## ✅ Solutions

### Solution 1: Leave Empty (Testing Mode) - RECOMMENDED

**For Testing mode, these fields might be optional:**

1. **Try leaving them empty**
2. **Click "SAVE AND CONTINUE"**
3. **If it allows you to proceed, you're good!**

**Why this works:**
- Testing mode is more lenient
- These fields are mainly for production/public apps
- OAuth redirect URI can still use `localhost`

---

### Solution 2: Use ngrok (Get Public URL)

**If fields are required, use ngrok to get a public URL:**

#### Step 1: Install ngrok

```bash
# Download from: https://ngrok.com/download
# Or use npm:
npm install -g ngrok
```

#### Step 2: Start ngrok tunnel

```bash
# In a new terminal:
ngrok http 3000
```

#### Step 3: Get your public URL

You'll see something like:
```
Forwarding: https://abc123.ngrok.io -> http://localhost:3000
```

#### Step 4: Use ngrok URL in Google Console

**Application home page:**
```
https://abc123.ngrok.io
```

**Application privacy policy link:**
```
https://abc123.ngrok.io/privacy
```

**Application Terms of Service link:**
```
https://abc123.ngrok.io/terms
```

**⚠️ Note:** ngrok URL changes each time you restart (unless you have a paid plan). You'll need to update Google Console each time.

---

### Solution 3: Use Placeholder Domain (Not Recommended)

**If you have a domain (even if not set up yet):**

1. Use your actual domain (e.g., `yourdomain.com`)
2. Fill in the fields with your domain
3. Later, when you deploy, update to real URLs

**Example:**
- Application home page: `https://yourdomain.com`
- Privacy policy: `https://yourdomain.com/privacy`
- Terms: `https://yourdomain.com/terms`

**⚠️ Warning:** This might cause issues if users click these links before you deploy.

---

## 🎯 Recommended Approach

### For Development (Testing Mode):

1. **Try leaving fields empty first**
   - Click "SAVE AND CONTINUE"
   - If it works, you're done!

2. **If fields are required:**
   - Use ngrok to get a public URL
   - Fill in the fields with ngrok URLs
   - Remember to update if ngrok URL changes

3. **For Production (later):**
   - Use your actual domain
   - Verify domain in Google Search Console
   - Update all URLs to production domain

---

## 📋 Quick Steps (Using ngrok)

### 1. Install ngrok

```bash
# Option 1: Download from https://ngrok.com/download
# Option 2: npm install -g ngrok
```

### 2. Start Your Dev Server

```bash
npm run dev
```

### 3. Start ngrok (New Terminal)

```bash
ngrok http 3000
```

### 4. Copy ngrok URL

You'll see:
```
Forwarding: https://abc123.ngrok.io -> http://localhost:3000
```

Copy: `https://abc123.ngrok.io`

### 5. Fill in Google Console

**Application home page:**
```
https://abc123.ngrok.io
```

**Application privacy policy link:**
```
https://abc123.ngrok.io/privacy
```

**Application Terms of Service link:**
```
https://abc123.ngrok.io/terms
```

### 6. Also Update Redirect URI

**In Credentials → OAuth 2.0 Client ID:**

Add redirect URI:
```
https://abc123.ngrok.io/api/auth/callback/google
```

**Keep both:**
- `http://localhost:3000/api/auth/callback/google` (for localhost)
- `https://abc123.ngrok.io/api/auth/callback/google` (for ngrok)

### 7. Save and Test

1. Save in Google Console
2. Wait 2 minutes
3. Try login again

---

## ⚠️ Important Notes

### About ngrok:

- **Free plan:** URL changes each restart
- **Paid plan:** Can get fixed domain
- **Security:** ngrok URLs are public (anyone can access)
- **Rate limits:** Free plan has limits

### About Testing Mode:

- **Test users required:** Must add your email
- **Limited access:** Only test users can login
- **No verification needed:** Can use localhost/ngrok

### About Production Mode:

- **Domain verification required:** Must verify in Google Search Console
- **Public access:** Anyone can login
- **Must use real domain:** Cannot use localhost or ngrok

---

## 🎯 Best Practice

**For now (Development):**

1. **Try leaving fields empty** (if Testing mode allows)
2. **If required, use ngrok**
3. **Focus on getting OAuth working**
4. **Worry about production URLs later**

**For later (Production):**

1. Get a real domain
2. Deploy your app
3. Verify domain in Google Search Console
4. Update all URLs in OAuth Consent Screen
5. Switch to Production mode

---

## ✅ Checklist

- [ ] Try leaving App Domain fields empty first
- [ ] If required, install ngrok
- [ ] Start ngrok tunnel: `ngrok http 3000`
- [ ] Copy ngrok URL
- [ ] Fill in Google Console with ngrok URLs
- [ ] Add ngrok redirect URI to Credentials
- [ ] Save all changes
- [ ] Wait 2 minutes
- [ ] Test OAuth login

---

## 🆘 Still Having Issues?

If you can't proceed:

1. **Check if you're in Testing mode** (more lenient)
2. **Try using a placeholder domain** (your future domain)
3. **Contact Google Support** if fields are blocking you
4. **Focus on redirect URI first** (that's the critical one)

The redirect URI (`http://localhost:3000/api/auth/callback/google`) is the most important - that one CAN use localhost!

---

## 📝 Summary

**Quick Fix:**
1. Try leaving App Domain fields empty
2. If required, use ngrok: `ngrok http 3000`
3. Use ngrok URL in Google Console
4. Save and test

The redirect URI can still use `localhost` - that's the critical one! 🚀

