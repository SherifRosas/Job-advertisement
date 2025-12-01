# 🔧 Update .env.local with Supabase Credentials

## ✅ Supabase Client Installed

The `@supabase/supabase-js` package has been installed and the client utility is ready.

---

## 📋 Add to .env.local

Add these lines to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://qtmaaomweaqoumbclpox.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bWFhb213ZWFxb3VtYmNscG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MDEwNjksImV4cCI6MjA3OTk3NzA2OX0.KKOfzcF0PAVUaAZTTHKwdHRgqhZKiHRBmhY6plgdNTo"
```

---

## 📝 Steps

1. **Open `.env.local` file**
2. **Add the two lines above** (or update if they already exist)
3. **Save the file**

---

## ✅ After Adding

The Supabase client is ready to use! The utility file `lib/supabase.ts` has been created with helper functions for:
- User operations
- Application operations
- Settings operations
- Coupon operations
- Appointment operations
- Message operations
- Revenue operations

---

## 🧪 Test It

After updating `.env.local`, you can test the connection:

```typescript
import { supabase } from '@/lib/supabase'

// Test connection
const { data, error } = await supabase.from('users').select('*').limit(1)
```

---

## 💡 Note

The client uses your Supabase project URL and anon key. These are safe to expose in the client-side code (that's why they're `NEXT_PUBLIC_`).

**Security:** The anon key has Row Level Security (RLS) policies, so it's safe for client-side use.

---

## ✅ Done!

Once you've added the credentials, the Supabase client is ready to use throughout your application!


