# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment Variables

1. Copy the example file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your credentials:
   - Database connection string
   - Google OAuth credentials
   - Paymob API keys
   - OpenAI API key
   - Email service API key
   - Twilio credentials
   - Security secrets

See `REQUIRED_CONFIGURATION.md` for details.

## Step 3: Set Up Database

1. Make sure PostgreSQL is running
2. Create a database (or use existing)
3. Update `DATABASE_URL` in `.env.local`
4. Run Prisma commands:

```bash
npx prisma generate
npx prisma db push
```

## Step 4: Create Initial Settings

You may need to create initial settings in the database. You can do this via Prisma Studio:

```bash
npm run db:studio
```

Or create a seed script (optional).

## Step 5: Run the Application

```bash
npm run dev
```

Visit http://localhost:3000

## Step 6: Admin Access

1. Set admin credentials in `.env.local`:
   ```
   ADMIN_EMAIL=your-admin@email.com
   ADMIN_PASSWORD=your-secure-password
   ```

2. Login at: http://localhost:3000/admin/login

## Important Notes

- The application requires all environment variables to be set
- Payment integration with Paymob needs proper API credentials
- Email/SMS services need to be configured for verification
- Admin Gmail for reactivation: `sherifrosas.ai@gmail.com` (set in ADMIN_GMAIL)

## Testing the Flow

1. **As Applicant**:
   - Visit homepage
   - Click "Apply Now"
   - Login with Gmail
   - Verify email and phone
   - Fill application form
   - Upload National ID
   - Make payment
   - View coupon and appointment

2. **As Admin**:
   - Login at /admin/login
   - View dashboard
   - Manage applications
   - Select applicants
   - Close advertisement (generates QR code)
   - Reactivate with QR code

## Troubleshooting

### Database Connection Issues
- Check PostgreSQL is running
- Verify DATABASE_URL format
- Ensure database exists

### Authentication Issues
- Verify Google OAuth credentials
- Check NEXTAUTH_SECRET is set
- Ensure NEXTAUTH_URL matches your domain

### Payment Issues
- Verify Paymob credentials
- Check payment gateway is active
- Review payment callback URL

### File Upload Issues
- Ensure `public/uploads` directory exists
- Check file permissions
- Verify file size limits

---

**Ready to deploy once all environment variables are configured!**


