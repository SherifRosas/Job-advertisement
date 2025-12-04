# 🚀 Deployment & Launch Checklist

## Pre-Launch Preparation

### ✅ Phase 1: Domain Setup (20 minutes)

- [ ] **Purchase Domain**
  - [ ] Buy `nafer.com` from Cloudflare/Namecheap (~$10-15/year)
  - [ ] Verify domain ownership

- [ ] **Configure Domain on Vercel**
  - [ ] Add domain to Vercel project
  - [ ] Copy DNS records from Vercel
  - [ ] Add DNS records to domain registrar
  - [ ] Wait for DNS propagation (1-48 hours)
  - [ ] Verify SSL certificate is active

- [ ] **Update URLs**
  - [ ] Update `NEXT_PUBLIC_APP_URL` to `https://nafer.com`
  - [ ] Update `NEXTAUTH_URL` to `https://nafer.com`
  - [ ] Update Google OAuth redirect URI
  - [ ] Update Paymob webhook URL

---

### ✅ Phase 2: Environment Variables (15 minutes)

**Required for Production:**

- [ ] **Database**
  - [ ] `DATABASE_URL` - Supabase connection string
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

- [ ] **Authentication**
  - [ ] `NEXTAUTH_SECRET` - Generate: `openssl rand -base64 32`
  - [ ] `NEXTAUTH_URL` - `https://nafer.com`
  - [ ] `GOOGLE_CLIENT_ID` - From Google Cloud Console
  - [ ] `GOOGLE_CLIENT_SECRET` - From Google Cloud Console

- [ ] **AI Services**
  - [ ] `OPENAI_API_KEY` - From OpenAI dashboard
  - [ ] Set spending limit: $10-20/month

- [ ] **Payment**
  - [ ] `PAYMOB_API_KEY` - From Paymob dashboard
  - [ ] `PAYMOB_INTEGRATION_ID` - From Paymob dashboard
  - [ ] `PAYMOB_HMAC_SECRET` - From Paymob dashboard

- [ ] **Email**
  - [ ] `RESEND_API_KEY` - From Resend dashboard (or SendGrid)
  - [ ] `EMAIL_FROM` - Verified sender email

- [ ] **Admin**
  - [ ] `ADMIN_GMAIL` - `sherifrosas.ai@gmail.com`
  - [ ] `ADMIN_EMAIL` - Admin login email
  - [ ] `ADMIN_PASSWORD` - Strong admin password

- [ ] **Security**
  - [ ] `SECURITY_MARK_SECRET` - Generate random string
  - [ ] `QR_CODE_SECRET` - Generate random string

**Add to Vercel:**
- [ ] Go to Vercel Dashboard → Project → Settings → Environment Variables
- [ ] Add all variables for Production, Preview, and Development
- [ ] Verify all variables are set correctly

---

### ✅ Phase 3: Database Setup (10 minutes)

- [ ] **Run Migrations**
  - [ ] Execute `supabase-sql-setup.sql` in Supabase SQL Editor
  - [ ] Execute `supabase-campaign-migration.sql`
  - [ ] Execute `supabase-agent-scheduler-migration.sql`
  - [ ] Verify all tables created

- [ ] **Verify Database**
  - [ ] Test connection from Vercel
  - [ ] Verify Prisma client works
  - [ ] Test basic queries

- [ ] **Initial Settings**
  - [ ] Create Settings record in database
  - [ ] Add bank account details
  - [ ] Set advertisement dates
  - [ ] Set interview location

---

### ✅ Phase 4: Service Configuration (20 minutes)

- [ ] **Google OAuth**
  - [ ] Verify OAuth consent screen is published
  - [ ] Add `https://nafer.com/api/auth/callback/google` to authorized redirect URIs
  - [ ] Test OAuth login

- [ ] **Paymob**
  - [ ] Set webhook URL: `https://nafer.com/api/payments/callback`
  - [ ] Test payment flow (use test mode first)
  - [ ] Verify payment callbacks work

- [ ] **Email Service (Resend)**
  - [ ] Verify sender domain/email
  - [ ] Test email sending
  - [ ] Verify email delivery

- [ ] **OpenAI**
  - [ ] Set monthly spending limit ($10-20)
  - [ ] Test API connection
  - [ ] Verify chatbot works

---

### ✅ Phase 5: Code Deployment (5 minutes)

- [ ] **Build Test**
  ```bash
  npm run build
  ```
  - [ ] Verify build succeeds
  - [ ] Fix any build errors

- [ ] **Deploy to Vercel**
  - [ ] Push to main branch (auto-deploys)
  - [ ] Or manually deploy via Vercel CLI: `vercel --prod`
  - [ ] Wait for deployment to complete

- [ ] **Verify Deployment**
  - [ ] Check deployment logs for errors
  - [ ] Visit `https://nafer.com`
  - [ ] Verify site loads correctly

---

### ✅ Phase 6: Testing (30 minutes)

- [ ] **Public Pages**
  - [ ] Landing page loads
  - [ ] Language switcher works
  - [ ] Content protection active
  - [ ] AI chatbot accessible

- [ ] **Authentication**
  - [ ] Google OAuth login works
  - [ ] Email verification works
  - [ ] Phone verification works (if SMS configured)

- [ ] **Application Flow**
  - [ ] Application form loads
  - [ ] File upload works (National ID)
  - [ ] Form validation works
  - [ ] Application submission works

- [ ] **Payment**
  - [ ] Payment page loads
  - [ ] Paymob integration works
  - [ ] Payment callback processes correctly
  - [ ] Coupon generated after payment

- [ ] **Admin Panel**
  - [ ] Admin login works
  - [ ] Dashboard loads
  - [ ] Applications list works
  - [ ] Selection system works
  - [ ] Settings page works
  - [ ] Campaign management works

- [ ] **AI Features**
  - [ ] Chatbot responds
  - [ ] AI verification works (or simulates)
  - [ ] Content generation works

---

### ✅ Phase 7: Security & Performance (15 minutes)

- [ ] **Security**
  - [ ] HTTPS enabled (automatic with Vercel)
  - [ ] Environment variables secured
  - [ ] API routes protected
  - [ ] Admin routes protected
  - [ ] Content protection active

- [ ] **Performance**
  - [ ] Page load times acceptable
  - [ ] Images optimized
  - [ ] Database queries optimized
  - [ ] CDN working (automatic with Vercel)

- [ ] **Monitoring**
  - [ ] Set up error tracking (optional: Sentry)
  - [ ] Monitor OpenAI usage
  - [ ] Monitor database usage
  - [ ] Set up uptime monitoring (optional)

---

### ✅ Phase 8: Content & Settings (20 minutes)

- [ ] **Content**
  - [ ] Job description finalized
  - [ ] Terms of Service complete
  - [ ] Privacy Policy complete
  - [ ] All Arabic/English translations correct

- [ ] **Settings**
  - [ ] Bank account details entered
  - [ ] Advertisement dates set
  - [ ] Selection deadline set
  - [ ] Interview location set
  - [ ] Payment amount: 1,000 EGP

- [ ] **Branding**
  - [ ] Logo displays correctly
  - [ ] Colors and styling correct
  - [ ] Footer information complete

---

### ✅ Phase 9: Final Checks (10 minutes)

- [ ] **Cross-Browser Testing**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] **Mobile Testing**
  - [ ] Responsive design works
  - [ ] Touch interactions work
  - [ ] Forms work on mobile

- [ ] **Accessibility**
  - [ ] Keyboard navigation works
  - [ ] Screen reader compatible (basic)
  - [ ] Color contrast acceptable

---

## 🎯 Launch Day Checklist

### Morning (Before Launch)
- [ ] Run full test suite
- [ ] Verify all services working
- [ ] Check domain and SSL
- [ ] Verify payment processing
- [ ] Test admin access

### Launch
- [ ] Set advertisement status to "active"
- [ ] Announce launch
- [ ] Monitor for issues
- [ ] Be ready to respond to issues

### Post-Launch (First 24 Hours)
- [ ] Monitor error logs
- [ ] Monitor OpenAI usage
- [ ] Monitor database performance
- [ ] Respond to any issues quickly
- [ ] Collect user feedback

---

## 📊 Success Metrics

**Track These:**
- Application submissions
- Payment completions
- Admin logins
- Chatbot interactions
- Error rates
- Page load times
- OpenAI API costs

---

## 🆘 Emergency Contacts & Resources

**If Issues Arise:**
- Vercel Status: https://www.vercel-status.com
- Supabase Status: https://status.supabase.com
- OpenAI Status: https://status.openai.com

**Documentation:**
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Project Docs: See `README.md` and other `.md` files

---

## ✅ Final Sign-Off

**Ready for Launch When:**
- [ ] All checkboxes above are checked
- [ ] All tests pass
- [ ] All services configured
- [ ] Domain working
- [ ] Payment processing verified
- [ ] Admin access verified
- [ ] Content finalized

**Launch Date:** _______________

**Launch Time:** _______________

**Launched By:** _______________

---

## 🎉 Post-Launch

**First Week:**
- Monitor daily
- Fix any bugs
- Optimize performance
- Collect feedback

**First Month:**
- Review analytics
- Optimize costs
- Plan improvements
- Scale if needed

**Congratulations on launching NAFER! 🚀**

