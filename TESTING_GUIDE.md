# 🧪 Application Testing Guide

## 🚀 Quick Start

1. **Make sure dev server is running:**
   ```bash
   npm run dev
   ```

2. **Open browser:** http://localhost:3000

3. **Follow the testing checklist below**

---

## ✅ Testing Checklist

### 1. Landing Page Test

**What to check:**
- [ ] Page loads without errors
- [ ] Official logo displays
- [ ] Job description is visible
- [ ] "Apply Now" or "Login" button is visible
- [ ] No console errors (F12 → Console)

**Expected:**
- Clean, professional landing page
- Arabic/English language switcher (if implemented)
- Copyright footer visible

---

### 2. Google OAuth Login Test

**Steps:**
1. Click "Login" or "Sign in with Google"
2. Should redirect to Google login page
3. Select your Google account
4. Approve permissions
5. Should redirect back to application

**What to check:**
- [ ] Redirects to Google login
- [ ] Shows "Job Advertisement System" in consent screen
- [ ] Redirects back after approval
- [ ] User is logged in
- [ ] User name/email displays
- [ ] No errors in console

**Common Issues:**
- ❌ "Redirect URI mismatch" → Check Google Console settings
- ❌ "Invalid client" → Check .env.local credentials
- ❌ Stuck on redirect → Check NEXTAUTH_URL

---

### 3. User Dashboard/Application Form Test

**After logging in:**
- [ ] Can see application form
- [ ] Form fields are visible:
  - Full Name
  - Address
  - Phone Number
  - National ID upload (front & back)
  - Agreement checkboxes
- [ ] Form validation works
- [ ] Can submit form

**What to check:**
- [ ] Form loads correctly
- [ ] All fields are accessible
- [ ] File upload works (ID cards)
- [ ] Validation messages appear
- [ ] Submit button works

---

### 4. Database Operations Test

**What to check:**
- [ ] User record created in database
- [ ] Application data saves correctly
- [ ] Can view data in Supabase dashboard

**How to verify:**
1. Go to Supabase dashboard
2. Open Table Editor
3. Check `users` table for your user
4. Check `applications` table after submitting form

---

### 5. Navigation Test

**Test these pages:**
- [ ] Landing page (/)
- [ ] Login page (/login)
- [ ] Application form (/apply)
- [ ] Status page (/status) - if implemented
- [ ] Admin panel (/admin) - if accessible

**What to check:**
- [ ] All pages load
- [ ] Navigation works
- [ ] No 404 errors
- [ ] Protected routes require login

---

### 6. Error Handling Test

**Test error scenarios:**
- [ ] Invalid form data
- [ ] Missing required fields
- [ ] File upload errors
- [ ] Network errors
- [ ] Database errors

**What to check:**
- [ ] Error messages display correctly
- [ ] User-friendly error messages
- [ ] No crashes or white screens
- [ ] Errors logged in console

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot connect to database"

**Symptoms:**
- Forms don't submit
- Data doesn't save
- Database errors in console

**Fix:**
- Set up Supabase client (we'll do this if needed)
- Check DATABASE_URL in .env.local
- Verify Supabase project is active

### Issue 2: "OAuth redirect error"

**Symptoms:**
- Stuck on Google login
- Redirect URI mismatch error

**Fix:**
- Check Google Console → Credentials
- Verify redirect URI: `http://localhost:3000/api/auth/callback/google`
- Check NEXTAUTH_URL in .env.local

### Issue 3: "Page not found (404)"

**Symptoms:**
- 404 errors when navigating
- Routes don't work

**Fix:**
- Check route files exist
- Verify Next.js routing structure
- Check middleware configuration

### Issue 4: "Form submission fails"

**Symptoms:**
- Form doesn't submit
- No response after clicking submit
- Errors in console

**Fix:**
- Check API routes exist
- Verify database connection
- Check form validation
- Look at browser console for errors

---

## 📊 Testing Results Template

**Date:** _______________

**Tester:** _______________

**Results:**
- [ ] Landing page: ✅ / ❌
- [ ] Login: ✅ / ❌
- [ ] Application form: ✅ / ❌
- [ ] Database operations: ✅ / ❌
- [ ] Navigation: ✅ / ❌
- [ ] Error handling: ✅ / ❌

**Issues Found:**
1. ________________________________
2. ________________________________
3. ________________________________

**Notes:**
________________________________
________________________________

---

## 💬 After Testing

**Tell me:**
- **"Everything works!"** → Great! Let's continue!
- **"I see [specific error]"** → I'll help fix it!
- **"[Feature] doesn't work"** → Let's debug it!

**Be specific:**
- What page were you on?
- What did you click?
- What error message did you see?
- What's in the browser console (F12)?

---

## 🎯 Next Steps After Testing

Once testing is complete:
1. **Fix any issues found**
2. **Set up missing services** (if needed)
3. **Continue with implementation**
4. **Add remaining features**

**Let's test! 🚀**


