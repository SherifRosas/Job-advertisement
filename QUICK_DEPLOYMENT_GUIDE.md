# ⚡ Quick Deployment Guide - NAFER.com

## 🎯 Fast Track to Launch (2-3 hours)

### Step 1: Domain (20 min)
```bash
1. Purchase nafer.com from Cloudflare (~$10/year)
2. Add to Vercel: Settings → Domains → Add "nafer.com"
3. Copy DNS records and add to Cloudflare
4. Wait 1-2 hours for DNS propagation
```

### Step 2: Environment Variables (15 min)
```bash
# Add to Vercel Dashboard → Settings → Environment Variables

# Required:
DATABASE_URL=your_supabase_connection_string
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=https://nafer.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_key
PAYMOB_API_KEY=your_paymob_key
RESEND_API_KEY=your_resend_key
ADMIN_GMAIL=sherifrosas.ai@gmail.com
```

### Step 3: Database (10 min)
```bash
1. Run supabase-sql-setup.sql in Supabase SQL Editor
2. Run supabase-campaign-migration.sql
3. Run supabase-agent-scheduler-migration.sql
4. Verify tables created
```

### Step 4: Deploy (5 min)
```bash
# Option 1: Auto-deploy (push to main branch)
git push origin main

# Option 2: Manual deploy
vercel --prod
```

### Step 5: Test (30 min)
```bash
✅ Visit https://nafer.com
✅ Test login
✅ Test application form
✅ Test payment (test mode)
✅ Test admin panel
```

---

## 🔧 Essential Commands

```bash
# Build locally
npm run build

# Deploy to production
vercel --prod

# Check deployment logs
vercel logs

# View environment variables
vercel env ls

# Add environment variable
vercel env add VARIABLE_NAME
```

---

## 📋 Minimum Requirements

**Must Have:**
- ✅ Domain configured
- ✅ Database connected
- ✅ OAuth working
- ✅ Payment gateway configured
- ✅ Email service configured
- ✅ OpenAI API key set

**Nice to Have:**
- SMS service (optional)
- Social media APIs (optional)
- Analytics (optional)

---

## 🚨 Common Issues & Fixes

**Issue: Domain not resolving**
- Fix: Wait longer (DNS can take 48 hours)
- Check: https://dnschecker.org

**Issue: Build fails**
- Fix: Check environment variables
- Fix: Run `npm run build` locally first

**Issue: Database connection fails**
- Fix: Verify DATABASE_URL is correct
- Fix: Check Supabase connection settings

**Issue: OAuth not working**
- Fix: Verify redirect URI matches exactly
- Fix: Check Google Console settings

---

## ✅ Ready Checklist

- [ ] Domain purchased and configured
- [ ] All environment variables set in Vercel
- [ ] Database migrations run
- [ ] Build succeeds
- [ ] Deployment successful
- [ ] Site accessible at https://nafer.com
- [ ] Login works
- [ ] Payment works (test mode)
- [ ] Admin panel accessible

**If all checked → You're ready to launch! 🚀**

