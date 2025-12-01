# 🎯 Final Guide: Get Working Connection String

## Current Status

✅ **Connection string format is correct**
❌ **Direct connection:** Won't work on IPv4 ("Can't reach database server")
❌ **Pooler connection:** "Tenant or user not found" (might not be enabled)

---

## 🔍 Step-by-Step: Find Pooler Connection String

### Option 1: Check Connection Strings Page (Recommended)

1. **Go to:** https://supabase.com/dashboard/project/qtmaaomweaqoumbclpox/settings/database
2. **Scroll to:** "Connection string" section
3. **Look for tabs or dropdown:**
   - "Direct connection" (current - won't work)
   - "Session Pooler" (what we need!)
   - "Transaction Pooler" (alternative)
4. **Click on "Session Pooler" tab/section**
5. **Copy the connection string shown**

### Option 2: Enable Connection Pooling First

1. **Go to:** Settings → Database
2. **Find:** "Connection pooling configuration" section
3. **Enable:** "Shared Pooler" or toggle connection pooling
4. **Save** settings
5. **Go back to:** Connection Strings page
6. **Session Pooler section should now appear**

### Option 3: Check Project Settings

1. **Go to:** Settings → General
2. **Verify:**
   - Project Reference ID: `qtmaaomweaqoumbclpox` ✓
   - Region: `eu-central-1` ✓
   - Status: Active ✓

### Option 4: Use Supabase CLI (Alternative)

If you have Supabase CLI installed:
```bash
supabase db remote commit
```

This might show the connection string format.

---

## 🔧 Alternative: Try Different Pooler Formats

If you can't find the exact string, we can try these formats:

**Format 1: Session mode**
```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Format 2: Transaction mode**
```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

**Format 3: With project ref in different position**
```env
DATABASE_URL="postgresql://postgres:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?options=--project%3Dqtmaaomweaqoumbclpox"
```

---

## 💡 What to Share

**Please share one of these:**

1. **"I see Session Pooler: [connection string]"** → Perfect!
2. **"I don't see pooler section"** → We'll check your plan/settings
3. **"I enabled pooling, now I see [connection string]"** → Great!
4. **"I see [description]"** → I'll help interpret it

---

## 🆘 If Nothing Works

**Alternative approaches:**

1. **Use Supabase REST API** to create tables (not ideal for Prisma)
2. **Upgrade Supabase plan** (if free tier doesn't support pooling)
3. **Use different network** (IPv6 compatible)
4. **Purchase IPv4 add-on** in Supabase

---

## 📋 Quick Checklist

- [ ] Checked Connection Strings page for Session Pooler tab
- [ ] Enabled Connection Pooling in Settings → Database
- [ ] Verified project reference ID is correct
- [ ] Checked if project plan supports connection pooling
- [ ] Looked for "View parameters" or other connection options

**Share what you find!**


