# 🔍 Get Correct Supabase Connection String

## ❌ Current Issue

We're getting "Tenant or user not found" error, which means we need the **exact connection string** from your Supabase dashboard.

---

## ✅ How to Get It

### Option 1: From Database Settings (Recommended)

1. **Go to:** https://supabase.com/dashboard/project/qtmaaomweaqoumbclpox/settings/database
2. **Look for:** "Connection string" or "Connection pooling" section
3. **Find:** The connection string that looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.qtmaaomweaqoumbclpox.supabase.co:5432/postgres
   ```
4. **Copy it** and replace `[YOUR-PASSWORD]` with your actual password

### Option 2: From Connection Pooling

1. **Go to:** https://supabase.com/dashboard/project/qtmaaomweaqoumbclpox/settings/database
2. **Scroll to:** "Connection pooling" section
3. **Copy the connection string** from there
4. **Make sure to URL-encode the password** (`#` → `%23`)

### Option 3: Construct It Manually

If you can't find it, use this format:

**Direct Connection:**
```
postgresql://postgres:01224576070%23Economist@db.qtmaaomweaqoumbclpox.supabase.co:5432/postgres
```

**Pooler Connection:**
```
postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

**Important:** 
- Replace password `#` with `%23`
- Your password: `01224576070#Economist` → `01224576070%23Economist`

---

## 📋 What to Look For

In Supabase Dashboard, you should see:

1. **Connection string** section
2. **Connection pooling** section  
3. **Direct connection** section
4. **Session mode** or **Transaction mode** options

**Copy the connection string** that shows:
- Host: `db.qtmaaomweaqoumbclpox.supabase.co` OR `aws-0-eu-central-1.pooler.supabase.com`
- Port: `5432` (direct) OR `6543` (pooler)
- Database: `postgres`
- User: `postgres` OR `postgres.qtmaaomweaqoumbclpox`

---

## 🔧 Update .env.local

Once you have the correct connection string:

1. **Open `.env.local`**
2. **Update `DATABASE_URL`** with the correct string
3. **Make sure password is URL-encoded** (`#` → `%23`)
4. **Save the file**
5. **Test:** `npm run db:push`

---

## 💬 Tell Me

- **"I found it: [connection string]"** → I'll help you format it correctly
- **"I can't find it"** → I'll guide you step by step
- **"I see [what you see]"** → Share a screenshot or describe what you see

---

## 🎯 Quick Test

After updating, run:
```bash
npm run db:push
```

Expected result:
- ✅ Schema loaded
- ✅ Connected to database
- ✅ Tables created


