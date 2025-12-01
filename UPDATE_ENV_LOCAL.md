# 📝 Update .env.local File

## ✅ Connection String Ready!

Use this connection string for your `.env.local` file:

```
postgresql://postgres.qtmaaomweaqoumbclpox:01224576070#Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

---

## 🎯 Step-by-Step Update

### Step 1: Open .env.local

1. **Open** `.env.local` file in your project folder
   - You can use Notepad, VS Code, or any text editor
   - File location: `C:\Users\Sherif-Rosas\AI-app_project\Job-advertisement\.env.local`

### Step 2: Find DATABASE_URL Line

**Look for this line:**
```
DATABASE_URL="postgresql://username:password@host:port/database_name"
```

### Step 3: Replace It

**Replace the entire line with:**
```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070#Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

**Important:**
- Keep the quotes `"` around it
- Make sure there are no extra spaces
- The password is: `01224576070#Economist` (no brackets)

### Step 4: Save the File

**Save** the `.env.local` file

---

## ✅ After Updating

**Tell me:**
- "I updated .env.local" → Let's test it!
- "I need help" → I'll guide you!

---

## 🧪 Test the Connection

After updating, run:
```bash
npm run db:push
```

**If it works:** You'll see "✔ Database schema pushed successfully"

**If it doesn't work:** We'll try the alternative connection string format!

---

## 📋 Quick Copy-Paste

**Just copy this entire line and replace the DATABASE_URL line in .env.local:**

```env
DATABASE_URL="postgresql://postgres.qtmaaomweaqoumbclpox:01224576070#Economist@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

---

**Ready to update?** Open `.env.local` and make the change! 🚀


