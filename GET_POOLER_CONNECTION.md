# 🔍 Get Session Pooler Connection String

## ⚠️ Important Notice

Your Supabase page shows: **"Not IPv4 compatible"**

This means:
- ❌ Direct connection (port 5432) won't work on IPv4 networks
- ✅ You need to use **Session Pooler** or **Transaction Pooler** (port 6543)

---

## 📋 Steps to Find Pooler Connection String

### On the Supabase Connection Strings Page:

1. **Look for these sections:**
   - **"Session Pooler"** or **"Connection Pooling"**
   - **"Transaction Pooler"**
   - **"Pooler settings"**

2. **The connection string should look like:**
   ```
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

3. **Or it might show:**
   ```
   postgresql://postgres.qtmaaomweaqoumbclpox:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
   ```

---

## 🔧 If You Can't Find It

**Try this Session Pooler format:**
```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Or Transaction Pooler format:**
```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

**Key differences:**
- Username: `postgres.qtmaaomweaqoumbclpox` (includes project ref)
- Host: `aws-0-eu-central-1.pooler.supabase.com` (pooler, not direct)
- Port: `6543` (pooler port)
- Password: `01224576070%23Economist` (URL-encoded)

---

## 💬 What to Share

**If you see a pooler connection string:**
- Copy it and share it with me
- Or just tell me the format you see

**If you don't see it:**
- Tell me what sections you see on the page
- Or we can try the formats above

---

## 🎯 Why Pooler?

- ✅ Works on IPv4 networks
- ✅ Better for serverless/cloud functions
- ✅ Connection pooling for better performance
- ✅ Required for most external connections


