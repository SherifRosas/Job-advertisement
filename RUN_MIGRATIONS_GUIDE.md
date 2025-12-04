# 🗄️ Database Migrations Guide - Step by Step

## 📋 Overview

You need to run **2 migration files** in Supabase to create the new tables for:
1. **Campaign System** - Marketing campaigns and executions
2. **Agent Scheduler** - AI agent task scheduling

---

## 🚀 Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Log in with your account

2. **Select Your Project:**
   - Click on your project: `qtmaaomweaqoumbclpox` (or your project name)

3. **Open SQL Editor:**
   - Click **"SQL Editor"** in the left sidebar
   - Click **"New query"** button (top right)

---

### Step 2: Run Campaign Migration

1. **Open the migration file:**
   - File: `supabase-campaign-migration.sql`
   - Location: `C:\Users\Sherif-Rosas\AI-app_project\Job-advertisement\supabase-campaign-migration.sql`

2. **Copy the entire file content:**
   - Open the file in your editor
   - Select all (Ctrl+A)
   - Copy (Ctrl+C)

3. **Paste into Supabase SQL Editor:**
   - Click in the SQL Editor text area
   - Paste (Ctrl+V)

4. **Review the SQL:**
   - You should see SQL that creates `campaigns` and `campaign_executions` tables
   - Check that it looks correct

5. **Run the migration:**
   - Click **"Run"** button (or press Ctrl+Enter)
   - Wait for execution to complete

6. **Verify success:**
   - You should see: ✅ "Success. No rows returned"
   - Or: ✅ "Success" message
   - If you see errors, check the error message

---

### Step 3: Run Agent Scheduler Migration

1. **Clear the SQL Editor:**
   - Click **"New query"** again (or clear the current query)

2. **Open the migration file:**
   - File: `supabase-agent-scheduler-migration.sql`
   - Location: `C:\Users\Sherif-Rosas\AI-app_project\Job-advertisement\supabase-agent-scheduler-migration.sql`

3. **Copy and paste:**
   - Copy the entire file content
   - Paste into SQL Editor

4. **Run the migration:**
   - Click **"Run"** button
   - Wait for completion

5. **Verify success:**
   - Should see: ✅ "Success" message

---

### Step 4: Verify Tables Were Created

1. **Go to Table Editor:**
   - Click **"Table Editor"** in the left sidebar

2. **Check for new tables:**
   - Look for: `campaigns` ✅
   - Look for: `campaign_executions` ✅
   - Look for: `agent_tasks` ✅

3. **Verify table structure:**
   - Click on each table to see its columns
   - Should match the schema in `prisma/schema.prisma`

---

## 📝 Migration Files Content

### Migration 1: Campaign System

**File:** `supabase-campaign-migration.sql`

Creates:
- `campaigns` table - Stores marketing campaigns
- `campaign_executions` table - Stores individual campaign executions
- Indexes for performance

### Migration 2: Agent Scheduler

**File:** `supabase-agent-scheduler-migration.sql`

Creates:
- `agent_tasks` table - Stores scheduled AI agent tasks
- Indexes for efficient querying

---

## ✅ Verification Checklist

After running migrations, verify:

- [ ] `campaigns` table exists
- [ ] `campaign_executions` table exists
- [ ] `agent_tasks` table exists
- [ ] All tables have correct columns
- [ ] Indexes are created
- [ ] No error messages in SQL Editor

---

## 🐛 Troubleshooting

### Error: "relation already exists"

**Problem:** Table already exists in database

**Solution:**
- Option 1: Drop the table first (if safe to do so)
  ```sql
  DROP TABLE IF EXISTS campaigns CASCADE;
  DROP TABLE IF EXISTS campaign_executions CASCADE;
  DROP TABLE IF EXISTS agent_tasks CASCADE;
  ```
  Then run migrations again

- Option 2: Use `CREATE TABLE IF NOT EXISTS` (already in migrations)
  - The migrations should handle this, but if you see this error, the tables might already exist

### Error: "permission denied"

**Problem:** Don't have permission to create tables

**Solution:**
- Make sure you're logged in as the project owner
- Or use a service role key (not recommended for manual operations)

### Error: "syntax error"

**Problem:** SQL syntax issue

**Solution:**
- Check that you copied the entire file
- Make sure no extra characters were added
- Try running each CREATE TABLE statement separately

### Tables not showing in Table Editor

**Problem:** Tables created but not visible

**Solution:**
- Refresh the page
- Check you're in the correct project
- Verify the tables exist by running:
  ```sql
  SELECT table_name 
  FROM information_schema.tables 
  WHERE table_schema = 'public';
  ```

---

## 🔍 Quick Verification Query

Run this in SQL Editor to verify all tables exist:

```sql
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns 
   WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('campaigns', 'campaign_executions', 'agent_tasks')
ORDER BY table_name;
```

**Expected Result:**
- Should show 3 rows (one for each table)
- Each with a column count

---

## 📸 Visual Guide

### Supabase SQL Editor Location:
```
Supabase Dashboard
  └── Your Project
      └── SQL Editor (left sidebar)
          └── New query (button)
              └── Paste SQL here
                  └── Run (button)
```

### After Running:
```
Table Editor (left sidebar)
  └── Should see:
      ├── campaigns ✅
      ├── campaign_executions ✅
      └── agent_tasks ✅
```

---

## 🎯 Quick Copy-Paste Method

### For Campaign Migration:

1. Open `supabase-campaign-migration.sql`
2. Copy ALL content (Ctrl+A, Ctrl+C)
3. Paste in Supabase SQL Editor
4. Click "Run"
5. Wait for "Success" message

### For Agent Scheduler Migration:

1. Click "New query" in Supabase
2. Open `supabase-agent-scheduler-migration.sql`
3. Copy ALL content
4. Paste in SQL Editor
5. Click "Run"
6. Wait for "Success" message

---

## ✅ Success Indicators

You'll know it worked when:

1. ✅ SQL Editor shows "Success" message
2. ✅ No error messages appear
3. ✅ Tables appear in Table Editor
4. ✅ Tables have correct columns
5. ✅ You can query the tables

---

## 🚀 Next Steps After Migrations

Once migrations are complete:

1. ✅ Verify tables exist
2. ✅ Test the application
3. ✅ Create a test campaign
4. ✅ Schedule a test agent task
5. ✅ Verify everything works

---

## 💡 Pro Tips

1. **Run one migration at a time** - Don't combine them
2. **Check for errors** - Read any error messages carefully
3. **Verify after each migration** - Check tables were created
4. **Keep backups** - Supabase auto-backups, but be careful
5. **Test in development first** - If you have a dev database

---

## 📞 Need Help?

If you encounter issues:

1. **Check the error message** - It usually tells you what's wrong
2. **Verify SQL syntax** - Make sure you copied everything
3. **Check Supabase status** - Make sure Supabase is online
4. **Try running statements separately** - Break down the migration

---

## 🎉 You're Done!

Once both migrations run successfully, your database is ready for:
- ✅ Marketing campaigns
- ✅ Campaign executions
- ✅ Agent task scheduling

**Ready to deploy!** 🚀

