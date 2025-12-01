# 🔍 How to Find Pooler Connection String in Supabase

## Current Issue

- ❌ Direct connection: `postgresql://postgres:[PASSWORD]@db.qtmaaomweaqoumbclpox.supabase.co:5432/postgres`
  - Error: "Not IPv4 compatible"
  - Won't work on IPv4 networks

- ❌ Pooler connection (tried): `postgresql://postgres:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
  - Error: "Tenant or user not found"

---

## ✅ Steps to Find Pooler Connection String

### On the Connection Strings Page:

1. **Scroll down** - The pooler connection might be below the direct connection section

2. **Look for these sections:**
   - **"Session Pooler"**
   - **"Transaction Pooler"**
   - **"Connection Pooling"**
   - **"Pooler settings"**

3. **Check for tabs or dropdowns:**
   - There might be tabs like: "Direct", "Session Pooler", "Transaction Pooler"
   - Or a dropdown to switch connection types

4. **Click "View parameters"** - This might show additional connection options

5. **Look for a connection string that:**
   - Uses port `6543` (not 5432)
   - Has host like `aws-0-eu-central-1.pooler.supabase.com`
   - Might have username like `postgres.qtmaaomweaqoumbclpox` or just `postgres`

---

## 🔧 Alternative: Enable Connection Pooling

If you don't see pooler connection strings:

1. **Go to:** Settings → Database
2. **Look for:** "Connection pooling" section
3. **Enable it** if it's not already enabled
4. **Then go back** to Connection Strings page
5. **The pooler connection should now appear**

---

## 🎯 What to Share

Please tell me:
- **"I see Session Pooler: [connection string]"** → I'll use it!
- **"I don't see any pooler section"** → We'll try a different approach
- **"I see [description of what you see]"** → I'll help interpret it

---

## 💡 Alternative Solutions

If pooler connection doesn't work:

1. **Purchase IPv4 add-on** in Supabase (if available)
2. **Use Supabase's connection string builder** (if available)
3. **Try connecting from a different network** (IPv6 compatible)
4. **Use Supabase's API** instead of direct database connection

---

## 🔍 Quick Check

**On the connection strings page, do you see:**
- [ ] Session Pooler section
- [ ] Transaction Pooler section  
- [ ] Connection Pooling section
- [ ] Tabs to switch between connection types
- [ ] "View parameters" link
- [ ] Any other connection string formats

**Share what you see!**


