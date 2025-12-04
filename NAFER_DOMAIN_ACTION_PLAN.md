# NAFER.com Domain - Action Plan ✅

## 🎯 Decision: Use nafer.com

**Domain:** `nafer.com`  
**Cost:** ~$10-15/year (~$1/month)  
**Status:** Ready to purchase and configure

---

## 📋 Step-by-Step Action Plan

### Step 1: Purchase Domain (5 minutes)

**Recommended Registrar: Cloudflare** (cheapest at cost price)

1. **Go to:** https://www.cloudflare.com/products/registrar/
2. **Search for:** `nafer.com`
3. **Add to cart** and checkout
4. **Cost:** ~$10-15/year
5. **Payment:** Credit card or PayPal

**Alternative Registrars:**
- **Namecheap:** https://www.namecheap.com (~$12-15/year)
- **GoDaddy:** https://www.godaddy.com (~$15-20/year)
- **Google Domains:** https://domains.google (~$12/year)

**Recommendation:** Use Cloudflare for best price and easy DNS management

---

### Step 2: Add Domain to Vercel (2 minutes)

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your project: `job-advertisement`

2. **Navigate to Settings:**
   - Click "Settings" tab
   - Click "Domains" in sidebar

3. **Add Domain:**
   - Enter: `nafer.com`
   - Click "Add"
   - Vercel will show DNS configuration

4. **Copy DNS Records:**
   - You'll see something like:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

---

### Step 3: Configure DNS (5 minutes)

**If using Cloudflare:**

1. **Add Domain to Cloudflare:**
   - Go to Cloudflare Dashboard
   - Add site: `nafer.com`
   - Cloudflare will scan existing DNS records

2. **Update DNS Records:**
   - **A Record:**
     - Type: A
     - Name: @
     - IPv4: `76.76.21.21` (from Vercel)
     - Proxy: Off (gray cloud)
   
   - **CNAME Record:**
     - Type: CNAME
     - Name: www
     - Target: `cname.vercel-dns.com` (from Vercel)
     - Proxy: Off (gray cloud)

3. **Save Changes**

**If using other registrar:**

1. **Go to DNS Management:**
   - Log into your registrar (Namecheap, GoDaddy, etc.)
   - Find "DNS Settings" or "Domain Management"

2. **Add Records:**
   - Add A record: `@` → `76.76.21.21`
   - Add CNAME record: `www` → `cname.vercel-dns.com`

3. **Save Changes**

---

### Step 4: Wait for DNS Propagation (1-48 hours)

- **Usually works within:** 1-2 hours
- **Maximum wait:** 48 hours
- **Check status:** https://dnschecker.org

**Test when ready:**
- Visit: `https://nafer.com`
- Should load your application
- Should show padlock (HTTPS) ✅

---

### Step 5: Update Environment Variables (5 minutes)

**Update `.env.local`:**

```env
# Application URL
NEXT_PUBLIC_APP_URL=https://nafer.com

# NextAuth
NEXTAUTH_URL=https://nafer.com

# OAuth Callback URLs
GOOGLE_REDIRECT_URI=https://nafer.com/api/auth/callback/google

# Payment Callback
PAYMOB_WEBHOOK_URL=https://nafer.com/api/payments/callback
```

**Update Vercel Environment Variables:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Update all URLs from old domain to `https://nafer.com`
3. Redeploy if needed

---

### Step 6: Update OAuth Providers (5 minutes)

**Google OAuth Console:**
1. Go to: https://console.cloud.google.com/
2. Navigate to: APIs & Services → Credentials
3. Edit your OAuth 2.0 Client
4. **Update Authorized redirect URIs:**
   - Old: `https://old-domain.com/api/auth/callback/google`
   - New: `https://nafer.com/api/auth/callback/google`
5. Save changes

**Paymob Dashboard:**
1. Log into Paymob dashboard
2. Update webhook URL:
   - Old: `https://old-domain.com/api/payments/callback`
   - New: `https://nafer.com/api/payments/callback`
3. Save changes

---

### Step 7: Test Everything (10 minutes)

**Checklist:**
- [ ] Domain loads: `https://nafer.com` ✅
- [ ] HTTPS works (padlock icon) ✅
- [ ] www subdomain works: `https://www.nafer.com` ✅
- [ ] Google OAuth login works ✅
- [ ] Payment callbacks work ✅
- [ ] All pages load correctly ✅
- [ ] Admin panel accessible ✅

---

## 💰 Total Cost Breakdown

| Item | Cost | Frequency |
|------|------|-----------|
| Domain (nafer.com) | $10-15 | Annual |
| Vercel Hosting | FREE | - |
| SSL Certificate | FREE | - |
| DNS Management | FREE | - |
| **Monthly Cost** | **~$1-1.25** | - |

**Plus existing costs:**
- OpenAI API: $1-5/month
- **Total Monthly: $2-6/month** ✅

---

## ✅ Quick Checklist

**Before Launch:**
- [ ] Purchase `nafer.com` domain
- [ ] Add domain to Vercel
- [ ] Configure DNS records
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate active
- [ ] Update environment variables
- [ ] Update OAuth redirect URIs
- [ ] Update Paymob webhook URL
- [ ] Test all functionality
- [ ] Update any hardcoded URLs in code

---

## 🎉 Expected Timeline

- **Domain Purchase:** 5 minutes
- **Vercel Setup:** 2 minutes
- **DNS Configuration:** 5 minutes
- **DNS Propagation:** 1-48 hours (usually 1-2 hours)
- **Testing:** 10 minutes
- **Total Active Time:** ~20 minutes
- **Total Wait Time:** 1-48 hours

---

## 📞 Support Resources

**Vercel Domain Docs:**
- https://vercel.com/docs/concepts/projects/domains

**Cloudflare DNS Help:**
- https://developers.cloudflare.com/dns/

**DNS Checker:**
- https://dnschecker.org

---

## 🚀 Ready to Go!

Once you complete these steps, your application will be live at:
- **https://nafer.com**
- **https://www.nafer.com** (both work)

**Professional domain, minimal cost, maximum impact!** 🎉

