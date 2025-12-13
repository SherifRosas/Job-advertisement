# Vercel Environment Variables Checklist

## Critical (Required for Basic Functionality)

1. **DATABASE_URL**
   - Format: `postgresql://postgres.qtmaaomweaqoumbclpox:[PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true`
   - Get from: Supabase Dashboard → Settings → Database → Connection string (Pooler mode)
   - Note: Must include `?pgbouncer=true` for pooler connections

2. **NEXTAUTH_SECRET**
   - Generate with: `openssl rand -base64 32`
   - Or use existing: `iPrQ5q55KIZ7bCxu6wOIA9NoYlEZ1hIgEXiGOataS2Q=`
   - Must be set for authentication to work

3. **NEXTAUTH_URL**
   - Initial: Use Vercel deployment URL (e.g., `https://job-advertisement-xxxxx.vercel.app`)
   - After domain setup: Update to `https://al-nafeer.com`

4. **GOOGLE_CLIENT_ID**
   - Get from: Google Cloud Console → APIs & Services → Credentials
   - Format: `xxxxx-xxxxx.apps.googleusercontent.com`

5. **GOOGLE_CLIENT_SECRET**
   - Get from: Google Cloud Console → APIs & Services → Credentials
   - Format: `GOCSPX-xxxxx`

## Important (For Features)

6. **OPENAI_API_KEY**
   - Get from: OpenAI Dashboard → API Keys
   - Required for: AI chatbot functionality

7. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://qtmaaomweaqoumbclpox.supabase.co`
   - Get from: Supabase Dashboard → Settings → API

8. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Get from: Supabase Dashboard → Settings → API → anon/public key
   - Long JWT token starting with `eyJhbGci...`

## Optional (Can Add Later)

9. **ADMIN_GMAIL**
   - Value: `sherifrosas.ai@gmail.com`
   - Used for: Admin notifications

10. **ADMIN_EMAIL**
    - Value: `admin@example.com` (or your choice)
    - Used for: Admin login credentials

11. **ADMIN_PASSWORD**
    - Value: `admin123` (change in production!)
    - Used for: Admin login credentials

12. **SECURITY_MARK_SECRET**
    - Value: `4joOVzq9/7YRihtaawSL6xR/IFyStPIurn6yaZtUlRE=`
    - Used for: Content protection features

13. **QR_CODE_SECRET**
    - Value: `7j34U0wxW46iMbsYtgj0IcDmSN1PPLNYf46jRGNqABY=`
    - Used for: QR code generation

14. **RESEND_API_KEY** or **SENDGRID_API_KEY**
    - Get from: Resend.com or SendGrid.com
    - Used for: Email notifications

15. **PAYMOB_API_KEY**, **PAYMOB_INTEGRATION_ID**, **PAYMOB_HMAC_SECRET**
    - Get from: Paymob Dashboard
    - Used for: Payment processing

## How to Add to Vercel

1. Go to: https://vercel.com/dashboard
2. Select project: `job-advertisement`
3. Navigate to: Settings → Environment Variables
4. For each variable:
   - Click "Add New"
   - Enter variable name
   - Enter variable value
   - Select environments: Production, Preview, Development (as needed)
   - Click "Save"
5. After adding all variables, redeploy the project

## Priority Order for Adding

1. DATABASE_URL (critical - app won't work without it)
2. NEXTAUTH_SECRET (critical - auth won't work)
3. NEXTAUTH_URL (critical - use Vercel URL initially)
4. GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (for OAuth)
5. OPENAI_API_KEY (for AI chatbot)
6. NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (for Supabase features)
7. Others as needed

