# 📋 OAuth Consent Screen - Step by Step

## Current Status

✅ **Step 1: App Information** - Complete!
- App name: Job Advertisement System ✓
- User support email: sherifrosas.ai@gmail.com ✓

---

## 📍 Step 2: Audience

1. **User Type:** Should show **"External"** (for public apps)
2. If not selected, select **"External"**
3. Click **"Create"** button

**Note:** "External" means anyone with a Google account can use your app.

---

## 📍 Step 3: Contact Information

1. **Developer contact information:** 
   - Enter: `sherifrosas.ai@gmail.com`
2. Click **"Save and Continue"**

**Note:** This is for Google to contact you about your app.

---

## 📍 Step 4: Finish (Summary)

1. **Review the summary:**
   - App name: Job Advertisement System
   - User support email: sherifrosas.ai@gmail.com
   - Developer contact: sherifrosas.ai@gmail.com
2. Click **"Back to Dashboard"**

---

## ✅ After Completing Consent Screen

Once you're back at the dashboard:

1. **Go to:** "APIs & Services" → "Credentials"
2. **Click:** "+ CREATE CREDENTIALS"
3. **Select:** "OAuth client ID"
4. **Configure:**
   - Application type: **"Web application"**
   - Name: `Job Advertisement Web Client`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. **Click:** "Create"
6. **Copy:** Client ID and Client Secret

---

## 💬 Tell Me

After completing each step, tell me:
- **"I completed Step 2"** → I'll guide you to Step 3
- **"I'm on Step 3"** → I'll help with contact info
- **"I'm back at dashboard"** → Let's create credentials!
- **"I have the credentials"** → Let's update .env.local!

---

## 🎯 Quick Checklist

- [ ] Step 1: App Information ✓ (You're done!)
- [ ] Step 2: Audience (Select External, click Create)
- [ ] Step 3: Contact Information (Enter email, Save and Continue)
- [ ] Step 4: Finish (Review, Back to Dashboard)
- [ ] Create OAuth Credentials
- [ ] Copy Client ID and Secret
- [ ] Update .env.local

**You're doing great! Keep going! 🚀**


