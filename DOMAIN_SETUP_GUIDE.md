# Domain Setup Guide - NAFER.eg.com

## 🌐 Setting Up Custom Domain on Vercel

### Step 1: Purchase Domain

**Option A: Purchase from Registrar**
- **GoDaddy**: https://www.godaddy.com
- **Namecheap**: https://www.namecheap.com
- **Cloudflare**: https://www.cloudflare.com/products/registrar/ (cheapest)
- **Google Domains**: https://domains.google

**Recommended:** Cloudflare (cost price, no markup)

**Domain Options:**
- `nafer.com` - ~$10-15/year
- `nafer.net` - ~$10-15/year
- `nafer.eg` - ~$20-50/year (Egyptian domain, may require local registration)
- `nafer.eg.com` - Only if you own `eg.com` domain

### Step 2: Add Domain to Vercel

1. **Go to Vercel Dashboard:**
   - Navigate to your project
   - Click "Settings" → "Domains"

2. **Add Domain:**
   - Enter your domain: `nafer.com` (or your chosen domain)
   - Click "Add"

3. **Vercel will show DNS records:**
   - You'll see something like:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

### Step 3: Configure DNS Records

1. **Go to your domain registrar:**
   - Log into GoDaddy, Namecheap, Cloudflare, etc.

2. **Find DNS Management:**
   - Usually under "DNS Settings" or "Domain Management"

3. **Add DNS Records:**
   - Add the A record (for root domain)
   - Add the CNAME record (for www subdomain)
   - Save changes

4. **Wait for Propagation:**
   - DNS changes take 24-48 hours to propagate
   - Usually works within 1-2 hours

### Step 4: SSL Certificate (Automatic)

✅ **Vercel automatically provisions SSL certificate**
- No additional cost
- Automatic renewal
- HTTPS enabled automatically

### Step 5: Verify Domain

1. **Check in Vercel Dashboard:**
   - Domain should show "Valid Configuration"
   - SSL certificate status: "Valid"

2. **Test Access:**
   - Visit `https://nafer.com` (or your domain)
   - Should load your application
   - Should show padlock (HTTPS)

---

## 🔧 DNS Configuration Examples

### For Root Domain (nafer.com)

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**CNAME Record (www):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### For Subdomain (nafer.eg.com)

**If you own eg.com:**
```
Type: CNAME
Name: nafer
Value: cname.vercel-dns.com
TTL: 3600
```

---

## 💰 Domain Cost Breakdown

| Domain Type | Annual Cost | Monthly Cost | Registrar |
|-------------|-------------|--------------|-----------|
| nafer.com | $10-15 | ~$1-1.25 | Most registrars |
| nafer.net | $10-15 | ~$1-1.25 | Most registrars |
| nafer.eg | $20-50 | ~$2-4 | Egyptian Registry |
| nafer.eg.com | FREE* | $0 | If you own eg.com |

*Only free if you already own the parent domain `eg.com`

---

## 🎯 Recommended Setup

### Best Option: nafer.com

**Why:**
- ✅ Simple and professional
- ✅ Easy to remember
- ✅ Low cost (~$10-15/year)
- ✅ No special requirements
- ✅ Works globally

**Setup Steps:**
1. Purchase `nafer.com` from Cloudflare (~$10/year)
2. Add to Vercel project
3. Configure DNS records
4. Wait for propagation
5. Done! ✅

**Total Additional Cost:** ~$1/month

---

## 📝 Environment Variables Update

After setting up domain, update your `.env.local`:

```env
# Application URL
NEXT_PUBLIC_APP_URL=https://nafer.com

# OAuth Callback URLs
NEXTAUTH_URL=https://nafer.com
GOOGLE_REDIRECT_URI=https://nafer.com/api/auth/callback/google

# Payment Callback
PAYMOB_WEBHOOK_URL=https://nafer.com/api/payments/callback
```

---

## ✅ Checklist

- [ ] Purchase domain from registrar
- [ ] Add domain to Vercel project
- [ ] Configure DNS records (A + CNAME)
- [ ] Wait for DNS propagation (1-48 hours)
- [ ] Verify SSL certificate is active
- [ ] Test domain access (https://nafer.com)
- [ ] Update environment variables
- [ ] Update OAuth redirect URIs in Google Console
- [ ] Update Paymob webhook URL
- [ ] Test all functionality with new domain

---

## 🐛 Troubleshooting

### Domain not resolving
- **Check DNS records** are correct
- **Wait longer** (DNS can take 48 hours)
- **Use DNS checker**: https://dnschecker.org

### SSL certificate not working
- **Wait for automatic provisioning** (can take a few hours)
- **Check domain is verified** in Vercel
- **Ensure DNS is properly configured**

### Subdomain (www) not working
- **Add CNAME record** for www subdomain
- **Vercel handles both** www and non-www automatically

---

## 🎉 Final Cost with Domain

**Monthly Total:**
- Domain: $1-4/month
- Hosting: FREE
- Database: FREE
- OpenAI: $1-5/month
- Email: FREE
- **Total: $2-9/month** ✅

**Very affordable for a professional domain!**

