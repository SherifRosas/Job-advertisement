# 📍 How to Find OAuth Credentials in Google Cloud Console

## 🎯 Where to Go

### Direct Link:
**https://console.cloud.google.com/apis/credentials**

---

## 📋 Step-by-Step Navigation

### Method 1: Direct Link (Easiest)

1. **Click this link:** https://console.cloud.google.com/apis/credentials
2. **You'll see:** List of OAuth 2.0 Client IDs
3. **Click on your Client ID** (the one you're using)
4. **Scroll down** to "Authorized redirect URIs"

### Method 2: Manual Navigation

1. **Go to:** https://console.cloud.google.com/
2. **Make sure you're in the correct project** (top dropdown)
3. **Click "APIs & Services"** in the left menu
4. **Click "Credentials"** (under APIs & Services)
5. **Find "OAuth 2.0 Client IDs"** section
6. **Click on your Client ID** (usually shows your Client ID number)
7. **Scroll down** to find "Authorized redirect URIs"

---

## 🔍 What You're Looking For

### In the OAuth Client Details Page:

**Scroll down to find:**

**"Authorized redirect URIs"** section

**It should have:**
```
http://localhost:3000/api/auth/callback/google
```

**If it's missing or different:**
- Click "ADD URI" (or edit existing)
- Type exactly: `http://localhost:3000/api/auth/callback/google`
- Click "SAVE"

---

## ⚠️ Common Mistakes

### ❌ Wrong Pages to Be On:

- **Data Access Audit Logs** ← You were here (wrong!)
- **IAM & Admin**
- **Security**
- **Billing**
- **APIs & Services → Library**
- **APIs & Services → Dashboard**

### ✅ Correct Page:

- **APIs & Services → Credentials** ← You need to be here!
- Then click your **OAuth 2.0 Client ID**

---

## 📝 Quick Checklist

- [ ] Go to: https://console.cloud.google.com/apis/credentials
- [ ] Click your OAuth 2.0 Client ID
- [ ] Scroll to "Authorized redirect URIs"
- [ ] Check if `http://localhost:3000/api/auth/callback/google` is there
- [ ] If missing, add it and save
- [ ] Wait 2-3 minutes
- [ ] Test OAuth again

---

## 🎯 Visual Guide

**Correct Navigation Path:**

```
Google Cloud Console
└── APIs & Services (left menu)
    └── Credentials
        └── OAuth 2.0 Client IDs
            └── [Click your Client ID]
                └── Authorized redirect URIs ← YOU NEED TO BE HERE
```

---

## 🆘 Still Can't Find It?

**If you can't find Credentials:**

1. **Check you're in the right project:**
   - Look at the top dropdown (project selector)
   - Make sure it's the project where you created OAuth credentials

2. **Check if OAuth is enabled:**
   - Go to: https://console.cloud.google.com/apis/library
   - Search for "Google+ API" or "People API"
   - Make sure it's enabled

3. **Create new OAuth credentials if needed:**
   - Go to: https://console.cloud.google.com/apis/credentials
   - Click "CREATE CREDENTIALS"
   - Select "OAuth client ID"
   - Choose "Web application"
   - Add redirect URI: `http://localhost:3000/api/auth/callback/google`

---

## ✅ After You Find It

Once you're on the correct page:

1. **Check the redirect URI**
2. **Add/fix if needed**
3. **Save changes**
4. **Wait 2-3 minutes**
5. **Test OAuth login again**

---

## 📖 Summary

**You need to be here:**
- **Page:** APIs & Services → Credentials
- **Section:** OAuth 2.0 Client IDs
- **Action:** Click your Client ID
- **Find:** "Authorized redirect URIs"

**Direct link:** https://console.cloud.google.com/apis/credentials

Go there now and check the redirect URI! 🚀

