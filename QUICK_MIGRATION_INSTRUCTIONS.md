# ⚠️ IMPORTANT: Copy ONLY the SQL Code!

## ❌ Common Mistake

**DON'T copy this:**
```
```sql
CREATE TABLE...
```
```

**DO copy this:**
```
CREATE TABLE...
```

---

## ✅ Correct Steps

### Step 1: Run Migration 1 (Campaigns)

1. **Open file:** `MIGRATION_1_CAMPAIGNS.sql`
2. **Select ALL text** (Ctrl+A)
3. **Copy** (Ctrl+C)
4. **Paste into Supabase SQL Editor**
5. **Click "Run"**

**What to copy:**
- Start from: `-- Campaign Management System Migration`
- End at: `CREATE INDEX IF NOT EXISTS "campaign_executions_scheduledAt_idx"...`
- **DO NOT copy:** Any markdown code blocks (```sql or ```)

---

### Step 2: Run Migration 2 (Agent Tasks)

1. **Click "New query" in Supabase**
2. **Open file:** `MIGRATION_2_AGENT_TASKS.sql`
3. **Select ALL text** (Ctrl+A)
4. **Copy** (Ctrl+C)
5. **Paste into Supabase SQL Editor**
6. **Click "Run"**

---

## 🎯 Quick Copy Method

### For Migration 1:
1. Open `MIGRATION_1_CAMPAIGNS.sql` in your editor
2. Select from line 1 to the last line
3. Copy (Ctrl+C)
4. Paste directly into Supabase SQL Editor
5. Run

### For Migration 2:
1. Open `MIGRATION_2_AGENT_TASKS.sql` in your editor
2. Select from line 1 to the last line
3. Copy (Ctrl+C)
4. Paste directly into Supabase SQL Editor
5. Run

---

## ✅ What Success Looks Like

After clicking "Run", you should see:
- ✅ "Success. No rows returned"
- ✅ Or "Success" message
- ✅ No error messages

---

## 🐛 If You Still Get Errors

1. **Make sure you're copying from the .sql files**, not from markdown files
2. **Don't include any markdown syntax** (```sql, ```, etc.)
3. **Copy from the files I just created:**
   - `MIGRATION_1_CAMPAIGNS.sql`
   - `MIGRATION_2_AGENT_TASKS.sql`

These files contain ONLY SQL code, no markdown!

