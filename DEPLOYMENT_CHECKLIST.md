# 🚀 Deployment Checklist - Job Advertisement System

## ✅ Pre-Deployment Checklist

### 1. Database Setup
- [ ] Run Campaign migration: `supabase-campaign-migration.sql`
- [ ] Run Agent Task migration: `supabase-agent-scheduler-migration.sql`
- [ ] Verify all tables exist in Supabase
- [ ] Test database connections
- [ ] Verify Prisma client is generated

### 2. Environment Variables
- [ ] Set all environment variables in Vercel
- [ ] Verify OpenAI API key is set
- [ ] Verify database connection string
- [ ] Verify OAuth credentials (Google)
- [ ] Verify email service API key
- [ ] Verify payment gateway credentials (Paymob)
- [ ] Set NEXTAUTH_SECRET
- [ ] Set all security secrets

### 3. Domain Setup (nafer.com)
- [ ] Purchase domain
- [ ] Add domain to Vercel
- [ ] Configure DNS records
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate
- [ ] Update all URLs in environment variables
- [ ] Update OAuth redirect URIs
- [ ] Update Paymob webhook URL

### 4. Code Preparation
- [ ] Run `npm run build` locally (verify no errors)
- [ ] Fix any TypeScript errors
- [ ] Fix any linting errors
- [ ] Test all API routes locally
- [ ] Verify all imports are correct

### 5. Testing
- [ ] Test user registration/login
- [ ] Test application submission
- [ ] Test file uploads (National ID)
- [ ] Test payment flow
- [ ] Test admin dashboard
- [ ] Test AI chatbot
- [ ] Test campaign system
- [ ] Test agent scheduling

### 6. Cron Jobs Setup
- [ ] Set up `/api/campaigns/process` cron job (every 5 minutes)
- [ ] Set up `/api/agent/process` cron job (every 5 minutes)
- [ ] Test cron job execution
- [ ] Verify scheduled tasks are processed

### 7. Monitoring
- [ ] Set up error tracking (optional: Sentry)
- [ ] Set up analytics (optional: Google Analytics)
- [ ] Configure OpenAI spending limits
- [ ] Set up uptime monitoring

---

## 📋 Deployment Steps

### Step 1: Prepare Database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations in Supabase SQL Editor:
# 1. supabase-campaign-migration.sql
# 2. supabase-agent-scheduler-migration.sql
```

### Step 2: Build Locally
```bash
# Test build
npm run build

# Fix any errors
npm run lint
```

### Step 3: Deploy to Vercel
```bash
# If not already connected
vercel login
vercel link

# Deploy
vercel --prod
```

### Step 4: Configure Environment Variables
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add all required variables
3. Redeploy if needed

### Step 5: Set Up Domain
1. Follow `NAFER_DOMAIN_ACTION_PLAN.md`
2. Add domain to Vercel
3. Configure DNS
4. Update URLs

### Step 6: Set Up Cron Jobs
**Option A: Vercel Cron (Recommended)**
Create `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/campaigns/process",
      "schedule": "*/5 * * * *"
    },
    {
      "path": "/api/agent/process",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

**Option B: External Cron Service**
- Use cron-job.org or similar
- Set to call endpoints every 5 minutes

### Step 7: Final Testing
- [ ] Test production URL
- [ ] Test all features
- [ ] Verify SSL certificate
- [ ] Check error logs
- [ ] Monitor performance

---

## 🔧 Post-Deployment

### Immediate Actions
1. **Monitor Logs:**
   - Check Vercel function logs
   - Check database logs
   - Check API response times

2. **Test Critical Paths:**
   - User registration
   - Application submission
   - Payment processing
   - Admin access

3. **Verify Services:**
   - OpenAI API working
   - Email service working
   - Database connections stable
   - Cron jobs executing

### First Week Monitoring
- [ ] Monitor error rates
- [ ] Check OpenAI usage/costs
- [ ] Verify cron jobs running
- [ ] Test campaign execution
- [ ] Monitor database size
- [ ] Check bandwidth usage

---

## 🐛 Troubleshooting

### Common Issues

**Build Fails:**
- Check TypeScript errors
- Verify all imports
- Check environment variables

**Database Connection Issues:**
- Verify connection string
- Check Supabase project status
- Verify network access

**Cron Jobs Not Running:**
- Check Vercel cron configuration
- Verify endpoint accessibility
- Check function logs

**Domain Not Working:**
- Verify DNS records
- Check SSL certificate status
- Wait for propagation

---

## ✅ Success Criteria

Your deployment is successful when:
- ✅ Application loads at https://nafer.com
- ✅ Users can register and login
- ✅ Applications can be submitted
- ✅ Payments process correctly
- ✅ Admin dashboard works
- ✅ AI chatbot responds
- ✅ Campaigns can be created
- ✅ Scheduled tasks execute
- ✅ No critical errors in logs

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **OpenAI Docs:** https://platform.openai.com/docs

---

## 🎉 Ready to Deploy!

Follow this checklist step by step, and you'll have a production-ready application!

