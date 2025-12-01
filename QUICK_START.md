# 🚀 Quick Start - Get Running in 5 Minutes

## Step 1: Create Environment File

Create `.env.local` in the root directory with these minimum values:

```env
# Database (use a free PostgreSQL service like Supabase)
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth
NEXTAUTH_SECRET="iPrQ5q55KIZ7bCxu6wOIA9NoYlEZ1hIgEXiGOataS2Q="
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (get from https://console.cloud.google.com/)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Admin
ADMIN_GMAIL="sherifrosas.ai@gmail.com"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"

# Security Secrets (already generated for you)
SECURITY_MARK_SECRET="4joOVzq9/7YRihtaawSL6xR/IFyStPIurn6yaZtUlRE="
QR_CODE_SECRET="7j34U0wxW46iMbsYtgj0IcDmSN1PPLNYf46jRGNqABY="
```

## Step 2: Get Free Database (2 minutes)

1. Go to [Supabase](https://supabase.com/) or [Neon](https://neon.tech/)
2. Sign up (free)
3. Create a new project
4. Copy the connection string
5. Paste it as `DATABASE_URL` in `.env.local`

## Step 3: Set Up Google OAuth (3 minutes)

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Secret to `.env.local`

## Step 4: Initialize Database

```bash
npm run db:push
npm run db:seed
```

## Step 5: Run the App

```bash
npm run dev
```

Visit: http://localhost:3000

## ✅ That's It!

The app is now running. You can:
- Test the application flow
- Use admin panel at `/admin/login`
- Add external services later (Paymob, OpenAI, etc.)

---

**For detailed instructions, see `NEXT_STEPS_GUIDE.md`**


