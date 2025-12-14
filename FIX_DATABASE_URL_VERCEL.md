# Fix DATABASE_URL in Vercel

## ❌ Issue Detected

The DATABASE_URL in Vercel appears to have an incorrect value. The build logs show:
```
fromProcessEnv: 'echo postgresql://postgres:777'
```

This suggests the value includes "echo" which shouldn't be there.

## ✅ Fix Steps

### Step 1: Go to Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select project: `job-advertisement`
3. Navigate to: **Settings** → **Environment Variables**

### Step 2: Find DATABASE_URL

1. Look for `DATABASE_URL` in the list
2. Click on it to edit

### Step 3: Fix the Value

**Current (WRONG):**
```
echo postgresql://postgres:777...
```

**Should be (CORRECT):**
```
postgresql://postgres.qtmaaomweaqoumbclpox:[PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

**Important:**
- Remove any "echo" prefix
- Use the full connection string from Supabase
- Format: Pooler connection with `?pgbouncer=true`
- Make sure it starts with `postgresql://` (not `echo postgresql://`)

### Step 4: Get Correct Connection String from Supabase

If you need the correct connection string:

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to: **Settings** → **Database**
4. Find: **Connection string** section
5. Select: **URI** tab
6. Choose: **Transaction mode** (for pooler)
7. Copy the connection string
8. Make sure it includes `?pgbouncer=true` at the end

**Example format:**
```
postgresql://postgres.qtmaaomweaqoumbclpox:[YOUR-PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

### Step 5: Update and Save

1. Paste the correct connection string (without "echo")
2. Select environments: **Production**, **Preview**, **Development**
3. Click **Save**

### Step 6: Redeploy

After fixing the value:

1. Go to: **Deployments** tab
2. Click "⋯" on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete
5. Check build logs to verify DATABASE_URL is correct

## ✅ Verification

After redeployment, check the build logs. You should see:
```
✅ DATABASE_URL set correctly for Prisma
```

Instead of:
```
❌ DATABASE_URL does not start with postgresql:// or postgres://
```

## 🆘 If Still Having Issues

1. **Double-check the connection string format:**
   - Must start with `postgresql://` or `postgres://`
   - Must include `?pgbouncer=true` for pooler connections
   - Password should be URL-encoded (e.g., `#` becomes `%23`)

2. **Verify in Supabase:**
   - Database is active (not paused)
   - Connection pooling is enabled
   - Network restrictions allow Vercel IPs

3. **Check Vercel logs:**
   - Go to: Deployments → Latest → Logs
   - Look for DATABASE_URL check messages

---

**Fix the DATABASE_URL value in Vercel, then redeploy!** 🔧

