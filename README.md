# Job Advertisement System

A comprehensive online job advertisement system for the **Financial Accounts Manager** position at the **Egyptian Ministry of Education**.

## Features

- ✅ Gmail authentication with email/phone verification
- ✅ Application form with National ID upload
- ✅ AI data verification
- ✅ Payment processing (1,000 EGP via Paymob)
- ✅ Downloadable/printable coupon after payment
- ✅ Interview appointment generation
- ✅ Admin dashboard with application management
- ✅ Selection confirmation system
- ✅ Advertisement closure/reactivation with QR code
- ✅ Content protection (no copy/paste/screenshot)
- ✅ Bilingual support (Arabic/English)

## Technology Stack

- **Framework**: Next.js 14+ with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Paymob (Egyptian payment gateway)
- **Authentication**: NextAuth.js
- **AI Services**: OpenAI API
- **Styling**: Tailwind CSS with RTL support
- **Internationalization**: next-intl

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Job-advertisement
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration (see `REQUIRED_CONFIGURATION.md`)

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `REQUIRED_CONFIGURATION.md` for a complete list of required environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth
- `PAYMOB_API_KEY` - Paymob payment gateway
- `OPENAI_API_KEY` - OpenAI API key
- `ADMIN_GMAIL` - Admin Gmail for QR code reactivation

## Project Structure

```
Job-advertisement/
├── app/
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin panel
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/                # Database schema
└── public/                # Static assets
```

## Key Features

### For Applicants
- Login with Gmail
- Verify email and phone
- Submit application with National ID
- Make payment (1,000 EGP)
- Receive coupon and interview appointment

### For Administrators
- View all applications
- Track payments and revenue
- Confirm selections
- Close/reactivate advertisements
- Manage settings

## Admin Access

Default admin credentials (change in production):
- Email: Set via `ADMIN_EMAIL` env variable
- Password: Set via `ADMIN_PASSWORD` env variable

## Advertisement Closure & Reactivation

When an advertisement is closed:
1. All access and payments are terminated
2. A QR code is generated and sent to admin Gmail
3. To reactivate: Login with admin Gmail and enter the QR code

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

## Security Notes

- Content protection prevents copying/screenshots
- All API routes are protected
- Payment processing is secure
- QR codes are encrypted
- Input validation on all forms

## License

This is a proprietary system for the Egyptian Ministry of Education.

## Support

For issues or questions, please contact the development team.

---

**Status**: Production Ready (with proper environment configuration)


