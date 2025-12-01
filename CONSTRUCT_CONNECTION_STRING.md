# 🔧 Construct Connection String from Project Details

## ✅ Your Project Information

- **Project Reference:** `qtmaaomweaqoumbclpox`
- **Region:** `eu-central-1` (Europe)
- **Password:** `01224576070#Economist`
- **Database:** `postgres`

---

## 🔗 Connection String Formats

### Option 1: Direct Connection (Recommended for Prisma)

```env
DATABASE_URL="postgresql://postgres:01224576070%23Economist@db.qtmaaomweaqoumbclpox.supabase.co:5432/postgres"
```

**Use this for:** Direct database access, migrations, Prisma

### Option 2: Pooler Connection (Session Mode)

```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Use this for:** Serverless functions, connection pooling

### Option 3: Pooler Connection (Transaction Mode)

```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

**Use this for:** Transaction pooling

---

## ⚠️ Important Notes

1. **Password Encoding:** The `#` in your password must be encoded as `%23`
   - Original: `01224576070#Economist`
   - Encoded: `01224576070%23Economist`

2. **Which to Use:**
   - **For Prisma:** Use **Option 1** (Direct Connection)
   - **For Production:** Use **Option 2** or **Option 3** (Pooler)

---

## 📝 Update .env.local

1. **Open `.env.local`**
2. **Find `DATABASE_URL` line**
3. **Replace with Option 1 (Direct Connection):**
   ```env
   DATABASE_URL="postgresql://postgres:01224576070%23Economist@db.qtmaaomweaqoumbclpox.supabase.co:5432/postgres"
   ```
4. **Save the file**

---

## 🧪 Test Connection

After updating, run:
```bash
npm run db:push
```

---

## 🔍 If Direct Connection Doesn't Work

**Try Option 3 (Pooler - Transaction Mode) - This usually works with Prisma:**
```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

**Or Option 2 (Pooler - Session Mode):**
```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070%23Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Note:** Prisma works better with Transaction Mode (Option 3) for migrations and schema pushes.

---

## 💡 Finding Connection String in Supabase

If you want to find it in the dashboard:

1. **Go to:** Settings → Database
2. **Look for:** "Connection string" section or tab
3. **Or:** Check "Connection pooling" section
4. **Or:** Look at the top of the Database page for connection info

Sometimes it's under:
- **Settings** → **Database** → **Connection string** tab
- **Project Settings** → **Database** → **Connection info**
- **Database** → **Connection pooling** → **Connection string**
