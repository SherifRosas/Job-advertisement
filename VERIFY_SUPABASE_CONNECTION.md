# 🔍 Verify Supabase Connection String

## ❌ Current Error

**"Tenant or user not found"** - This means the connection string format might be incorrect.

---

## ✅ Steps to Get Correct Connection String

### Option 1: Find Connection String in Supabase Dashboard

1. **Go to:** https://supabase.com/dashboard/project/qtmaaomweaqoumbclpox/settings/database
2. **Look for one of these sections:**
   - **"Connection string"** tab or section
   - **"Connection pooling"** section
   - **"Connection info"** section
   - **"Database URL"** section

3. **You should see something like:**
   ```
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[HOST]:[PORT]/postgres
   ```

4. **Copy the EXACT connection string shown**

### Option 2: Check Project Settings

1. **Go to:** https://supabase.com/dashboard/project/qtmaaomweaqoumbclpox/settings/general
2. **Verify the Project Reference ID** matches: `qtmaaomweaqoumbclpox`
3. **Check the Region** matches: `eu-central-1`

### Option 3: Try Alternative Connection Formats

**Format 1: With connection pooling enabled**
```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Format 2: Direct connection (if network allows)**
```env
DATABASE_URL="postgresql://postgres:01224576070%23Economist@db.qtmaaomweaqoumbclpox.supabase.co:5432/postgres"
```

**Format 3: Transaction mode pooler**
```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

---

## 🔧 Common Issues

### Issue 1: Connection Pooling Not Enabled

**Solution:** Enable connection pooling in Supabase:
1. Go to Settings → Database
2. Enable "Connection pooling"
3. Copy the connection string from there

### Issue 2: Wrong Project Reference

**Solution:** Verify the project reference in:
- Settings → General → Reference ID

### Issue 3: Network Restrictions

**Solution:** Check Network Restrictions:
1. Go to Settings → Database → Network Restrictions
2. Make sure your IP is allowed (or "Allow all IP addresses" is enabled)

### Issue 4: Database Not Ready

**Solution:** Wait a few minutes after creating the project, then try again.

---

## 🧪 Test Connection

After updating, test with:
```bash
npm run db:push
```

---

## 💬 What to Share

If you find the connection string in Supabase, share:
- The exact connection string (you can mask the password)
- Or just tell me what format it shows

If you can't find it, tell me:
- What sections you see on the Database Settings page
- Any error messages in Supabase dashboard


