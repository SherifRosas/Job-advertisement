# Cron Jobs Setup Guide

## ⚠️ Vercel Free Tier Limitation

**Vercel Hobby (Free) Plan:**
- ✅ Allows cron jobs
- ❌ Limited to **once per day** maximum
- ✅ Pro Plan ($20/month): Unlimited cron frequency

---

## ✅ Solution 1: Daily Cron Jobs (Free Tier)

**Current Setup:** `vercel.json` configured for daily execution at 9:00 AM UTC

```json
{
  "crons": [
    {
      "path": "/api/campaigns/process",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/agent/process",
      "schedule": "0 9 * * *"
    }
  ]
}
```

**Schedule:** Runs once daily at 9:00 AM UTC

**Pros:**
- ✅ Free
- ✅ No additional setup
- ✅ Automatic

**Cons:**
- ❌ Only runs once per day
- ❌ May miss time-sensitive tasks

---

## ✅ Solution 2: External Cron Service (Recommended for Frequent Runs)

If you need more frequent execution (every 5 minutes), use an external cron service:

### Option A: cron-job.org (Free)

1. **Sign up:** https://cron-job.org (free account)

2. **Create Cron Job 1:**
   - **Title:** Process Campaigns
   - **URL:** `https://your-domain.vercel.app/api/campaigns/process`
   - **Schedule:** Every 5 minutes: `*/5 * * * *`
   - **Method:** POST
   - **Save**

3. **Create Cron Job 2:**
   - **Title:** Process Agent Tasks
   - **URL:** `https://your-domain.vercel.app/api/agent/process`
   - **Schedule:** Every 5 minutes: `*/5 * * * *`
   - **Method:** POST
   - **Save**

**Pros:**
- ✅ Free
- ✅ Can run every 5 minutes
- ✅ No Vercel Pro needed

**Cons:**
- ❌ Requires external service
- ❌ Need to update URLs after deployment

### Option B: EasyCron (Free Tier)

1. **Sign up:** https://www.easycron.com
2. **Create cron jobs** similar to above
3. **Free tier:** 2 cron jobs, runs every 5 minutes

### Option C: GitHub Actions (Free)

Create `.github/workflows/cron.yml`:

```yaml
name: Process Campaigns and Tasks

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

jobs:
  process:
    runs-on: ubuntu-latest
    steps:
      - name: Process Campaigns
        run: |
          curl -X POST https://your-domain.vercel.app/api/campaigns/process
      
      - name: Process Agent Tasks
        run: |
          curl -X POST https://your-domain.vercel.app/api/agent/process
```

**Pros:**
- ✅ Free
- ✅ Very reliable
- ✅ Version controlled

**Cons:**
- ❌ Requires GitHub repository
- ❌ Slightly more setup

---

## ✅ Solution 3: Upgrade to Vercel Pro ($20/month)

**Benefits:**
- ✅ Unlimited cron frequency
- ✅ Can run every 5 minutes
- ✅ No external services needed
- ✅ Better performance
- ✅ Team collaboration

**Cost:** $20/month

---

## 🎯 Recommended Approach

### For Free Tier (Current):
1. **Use daily cron in Vercel** (already configured)
2. **OR use external cron service** (cron-job.org) for frequent runs

### For Production:
1. **Upgrade to Vercel Pro** ($20/month)
2. **OR use external cron service** (free alternative)

---

## 📝 Current Configuration

**File:** `vercel.json`

**Schedule:** Daily at 9:00 AM UTC

**To change time:**
- `0 9 * * *` = 9:00 AM UTC
- `0 12 * * *` = 12:00 PM UTC
- `0 0 * * *` = Midnight UTC

**Format:** `minute hour day month weekday`

---

## 🚀 Deploy with Daily Cron

The current `vercel.json` is configured for daily execution. Deploy:

```bash
vercel --prod
```

This will work on the free tier!

---

## 🔄 If You Need More Frequent Runs

**Option 1:** Use cron-job.org (free, every 5 minutes)
**Option 2:** Upgrade to Vercel Pro ($20/month)
**Option 3:** Use GitHub Actions (free, every 5 minutes)

---

## ✅ Quick Setup for External Cron (cron-job.org)

1. **Deploy your app first:**
   ```bash
   vercel --prod
   ```

2. **Get your production URL:**
   - Example: `https://job-advertisement-xxx.vercel.app`

3. **Create cron jobs at cron-job.org:**
   - URL 1: `https://your-url.vercel.app/api/campaigns/process`
   - URL 2: `https://your-url.vercel.app/api/agent/process`
   - Schedule: `*/5 * * * *` (every 5 minutes)
   - Method: POST

4. **Done!** ✅

---

## 💡 Recommendation

**For now (Free Tier):**
- ✅ Keep daily cron in Vercel (already set)
- ✅ Deploy and test
- ✅ If you need more frequent runs, add external cron service

**For production:**
- Consider Vercel Pro if budget allows
- Or use external cron service (free alternative)

---

## 🎉 You're Ready!

The `vercel.json` is now configured for free tier. Deploy:

```bash
vercel --prod
```

This will work! 🚀

