# 🚀 Running the Application

## Quick Start

### 1. Start Development Server

```bash
npm run dev
```

**Wait for:**
```
✓ Ready in [time]
○ Local: http://localhost:3000
```

### 2. Open Browser

**Go to:** http://localhost:3000

---

## ✅ What You Should See

### Landing Page
- Official Ministry of Education logo
- Job advertisement content
- "Apply Now" or "Login" button
- Language switcher (Arabic/English)
- Copyright footer

### After Clicking Login
- Redirects to Google OAuth
- Shows "Job Advertisement System" consent screen
- After approval, redirects back
- You're logged in

---

## 🐛 Common Issues

### Issue 1: Port Already in Use

**Error:** `Port 3000 is already in use`

**Fix:**
```bash
# Option 1: Kill the process using port 3000
# Windows PowerShell:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Option 2: Use a different port
PORT=3001 npm run dev
```

### Issue 2: Module Not Found

**Error:** `Cannot find module '@supabase/supabase-js'`

**Fix:**
```bash
npm install
```

### Issue 3: Environment Variables Missing

**Error:** `Missing environment variables`

**Fix:**
- Check `.env.local` file exists
- Verify all required variables are set
- Restart dev server after updating `.env.local`

### Issue 4: Database Connection Error

**Error:** `Database connection failed`

**Fix:**
- Supabase client should work (we just set it up)
- Check Supabase project is active
- Verify credentials in `.env.local`

---

## 📋 Pre-Run Checklist

Before running, make sure:
- [ ] `.env.local` file exists
- [ ] Google OAuth credentials are set
- [ ] Supabase credentials are set
- [ ] Dependencies are installed (`npm install`)
- [ ] Port 3000 is available

---

## 🧪 Testing After Running

1. **Landing Page**
   - [ ] Page loads
   - [ ] No console errors
   - [ ] Logo visible

2. **Login**
   - [ ] Click login button
   - [ ] Redirects to Google
   - [ ] Redirects back after login

3. **User Creation**
   - [ ] Check Supabase dashboard
   - [ ] User record created

4. **Application Form**
   - [ ] Form accessible after login
   - [ ] Can fill and submit

---

## 🔧 Useful Commands

```bash
# Start dev server
npm run dev

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Check environment variables
npm run check-env  # (if script exists)
```

---

## 💡 Tips

1. **Keep terminal open** - You'll see logs and errors there
2. **Check browser console** - Press F12 for developer tools
3. **Check Supabase dashboard** - Verify data is being saved
4. **Restart server** - After changing `.env.local` or code

---

## 🆘 Need Help?

**If you see errors:**
1. Check the terminal output
2. Check browser console (F12)
3. Check `.env.local` file
4. Verify all dependencies installed

**Tell me:**
- What error message you see
- What page you're on
- What you clicked

---

## ✅ Success Indicators

**Everything working:**
- ✅ Server starts without errors
- ✅ Page loads at http://localhost:3000
- ✅ Can login with Google
- ✅ No errors in console
- ✅ Data saves to database

**Let's get it running! 🚀**


