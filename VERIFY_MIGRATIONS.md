# ✅ Verify Migrations Were Successful

## Step 1: Check Tables Exist

### In Supabase SQL Editor, run this query:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
  AND table_name IN ('campaigns', 'campaign_executions', 'agent_tasks')
ORDER BY table_name;
```

**Expected Result:**
Should return 3 rows:
- campaigns
- campaign_executions
- agent_tasks

---

## Step 2: Verify Table Structure

### Check campaigns table:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'campaigns'
ORDER BY ordinal_position;
```

**Should show columns like:** id, name, description, type, platforms, status, etc.

### Check campaign_executions table:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'campaign_executions'
ORDER BY ordinal_position;
```

### Check agent_tasks table:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'agent_tasks'
ORDER BY ordinal_position;
```

---

## Step 3: Verify Indexes

```sql
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public'
  AND tablename IN ('campaigns', 'campaign_executions', 'agent_tasks')
ORDER BY tablename, indexname;
```

**Should show multiple indexes for each table.**

---

## Step 4: Visual Check in Table Editor

1. Go to **Table Editor** in Supabase (left sidebar)
2. You should see:
   - ✅ `campaigns` table
   - ✅ `campaign_executions` table
   - ✅ `agent_tasks` table

3. Click on each table to see its columns

---

## ✅ Success Checklist

- [ ] All 3 tables appear in Table Editor
- [ ] Verification query returns 3 rows
- [ ] Each table has correct columns
- [ ] Indexes are created
- [ ] No error messages

---

## 🎉 If Everything Checks Out

Your database is ready! Next steps:
1. ✅ Test the application locally
2. ✅ Deploy to Vercel
3. ✅ Set up domain (nafer.com)
4. ✅ Configure cron jobs

---

## 🐛 If Something's Missing

**If tables don't exist:**
- Re-run the migrations
- Check for error messages
- Verify you're in the correct Supabase project

**If columns are missing:**
- Check the migration SQL was complete
- Re-run the specific migration

**If indexes are missing:**
- The indexes are optional but recommended
- You can re-run just the CREATE INDEX statements

