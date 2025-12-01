# 🔧 Enable Connection Pooling in Supabase

## Current Situation

✅ **Connection string format is correct!**
- Password brackets removed ✓
- Password URL-encoded (# → %23) ✓
- Format matches Supabase ✓

❌ **But direct connection won't work:**
- Error: "Can't reach database server"
- Reason: Not IPv4 compatible
- Solution: Need pooler connection

---

## ✅ Solution: Enable Connection Pooling

### Step 1: Go to Database Settings

1. **Navigate to:** https://supabase.com/dashboard/project/qtmaaomweaqoumbclpox/settings/database
2. **Look for:** "Connection pooling" section
3. **Check if it's enabled**

### Step 2: Enable Connection Pooling (if not enabled)

1. **Find:** "Connection pooling configuration" section
2. **Enable:** "Shared Pooler" or "Connection Pooling"
3. **Save** the settings

### Step 3: Get Pooler Connection String

After enabling pooling:

1. **Go back to:** Connection Strings page
2. **Look for:** "Session Pooler" or "Transaction Pooler" section
3. **Copy** the connection string shown there
4. **It should look like:**
   ```
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

---

## 🔍 Alternative: Check Connection Strings Page Again

After enabling pooling, the connection strings page should show:

1. **Direct connection** (what you see now - won't work on IPv4)
2. **Session Pooler** (new section - this is what we need!)
3. **Transaction Pooler** (alternative option)

---

## 📋 What to Do

1. **Go to:** Settings → Database
2. **Check:** Is "Connection pooling" enabled?
3. **If not:** Enable it
4. **Then:** Go back to Connection Strings page
5. **Look for:** Session Pooler section
6. **Share:** The connection string you see there

---

## 💬 Tell Me

- **"Pooling is enabled, I see Session Pooler: [connection string]"** → Perfect!
- **"I don't see pooling option"** → We'll try a different approach
- **"I enabled it, now I see [what you see]"** → Share it!

---

## 🎯 Quick Check

**On Settings → Database page, do you see:**
- [ ] "Connection pooling configuration" section
- [ ] "Shared Pooler" option
- [ ] "Enable connection pooling" toggle
- [ ] Any pooling-related settings

**Share what you see!**


