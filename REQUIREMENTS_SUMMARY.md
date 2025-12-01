# Job Advertisement System - Complete Requirements Summary

## Project Overview
An online job advertisement system for the position of **Financial Accounts Manager** at the **Egyptian Ministry of Education**. The system includes application processing, payment handling, AI-powered features, and comprehensive promotion tools.

---

## 1. Core Application Features

### 1.1 Job Advertisement Display
- ✅ Official Ministry of Education logo display
- ✅ Job title: "Financial Accounts Manager"
- ✅ Job description and requirements
- ✅ Content protection (no copy, paste, screenshot)
- ✅ Bilingual support: Modern Standard Arabic (primary), English (secondary)
- ✅ Official domain with trusted indicators
- ✅ Copyright and security information display

### 1.2 Authentication & Verification
- ✅ Gmail OAuth login (NextAuth.js)
- ✅ Email verification (verification code sent to email)
- ✅ Phone verification (SMS code via Twilio)
- ✅ Both verifications required before application
- ✅ Verification status stored in database

### 1.3 Application Form
- ✅ Personal data fields:
  - Full Name (pre-filled from Gmail, editable)
  - Address
  - Phone Number (pre-filled from verification, editable)
- ✅ National ID upload:
  - Front side image upload
  - Back side image upload
  - Image validation (format, size)
  - Preview functionality
- ✅ Agreement checkboxes:
  - "I meet the job requirements"
  - "I agree to submit official documents on interview day"
- ✅ AI data verification:
  - Verifies personal information
  - Verifies National ID images (OCR, format validation)
  - Cross-checks data consistency
  - Enables payment button only after verification

### 1.4 Payment System
- ✅ Payment amount: 1,000 Egyptian Pounds (EGP)
- ✅ Payment gateway: Paymob (Egyptian payment gateway)
- ✅ Payment methods supported:
  - Credit/Debit cards
  - Mobile wallets
  - Bank transfer
- ✅ Payment activation:
  - Application button only enabled after successful payment
  - Payment status tracking
- ✅ After payment:
  - Register applicant data
  - Generate coupon
  - Schedule interview appointment
  - Redirect to coupon page

### 1.5 Coupon System
- ✅ Downloadable coupon after payment
- ✅ Printable coupon format
- ✅ Coupon includes:
  - Applicant name
  - Coupon code
  - Security mark
  - Payment confirmation
  - Interview appointment details
- ✅ PDF download option
- ✅ QR code for verification

### 1.6 Interview Appointment
- ✅ Generated automatically after payment
- ✅ Includes:
  - Applicant name
  - Social security card details
  - Security mark (visual representation)
  - Date, time, location
- ✅ Printable format
- ✅ PDF download option
- ✅ Selection process within one month of advertisement publication

---

## 2. AI-Powered Features

### 2.1 AI Data Verification
- ✅ Verify uploaded National ID images:
  - Extract text using OCR
  - Validate ID format and authenticity
  - Cross-check with provided personal data
- ✅ Verify personal information:
  - Name consistency
  - Address format validation
  - Phone number format validation
- ✅ Return verification status and notes
- ✅ Store verification results in database

### 2.2 AI Chatbot
- ✅ Floating chat widget on all public pages
- ✅ Bilingual support (Arabic/English)
- ✅ Answers questions about:
  - Job requirements and qualifications
  - Application process and steps
  - Payment methods and amount
  - Interview process and documents needed
  - Selection timeline
- ✅ Context-aware responses
- ✅ Uses OpenAI API

### 2.3 AI Social Media Promotion
- ✅ Automated posting to:
  - Facebook (via Facebook Graph API)
  - Twitter/X (via Twitter API)
  - LinkedIn (via LinkedIn API)
- ✅ AI-generated promotional content:
  - Job description summaries
  - Engaging posts with hashtags
  - Scheduled posts at optimal times
- ✅ Analytics tracking (views, clicks, applications from social media)

### 2.4 AI Email Marketing
- ✅ Automated email campaigns:
  - Targeted job alerts to registered candidates
  - Reminder emails for incomplete applications
  - Follow-up emails after application submission
- ✅ AI-generated personalized email content
- ✅ Integration with email service (SendGrid/Resend)
- ✅ Email templates with job details and application link

---

## 3. Automated Messaging System

### 3.1 Payment Reminders
- ✅ Identify users who logged in but haven't paid
- ✅ Send automated messages (email/SMS) urging payment
- ✅ Schedule: 24h, 48h, 72h after login
- ✅ AI-generated personalized content

### 3.2 Interview Reminders
- ✅ Send to users who have paid
- ✅ Remind of interview appointment (date, time, location)
- ✅ Send 1 week before, 1 day before, day of interview
- ✅ Bilingual support

### 3.3 Selection Notifications
- ✅ Triggered when admin confirms selection
- ✅ Send Gmail notification to selected applicant
- ✅ AI-generated personalized congratulation message
- ✅ Include next steps and instructions
- ✅ Track email delivery status

---

## 4. Admin Dashboard

### 4.1 Authentication
- ✅ Credentials-based login (separate from applicant auth)
- ✅ Admin role management

### 4.2 Dashboard Overview
- ✅ Total applications count
- ✅ Payment statistics (paid/unpaid)
- ✅ Revenue tracking (total, daily, monthly)
- ✅ Recent activity feed
- ✅ Advertisement status indicator

### 4.3 Applications Management
- ✅ View all applications with filters
- ✅ Search by name, email, phone
- ✅ View payment status
- ✅ View AI verification status
- ✅ Export data (CSV/Excel)
- ✅ Selection management:
  - Mark applicant as "Selected" or "Rejected"
  - Bulk selection actions
  - View selection history
  - Filter by selection status

### 4.4 Payment Management
- ✅ View all payments
- ✅ Payment confirmation status
- ✅ Manual payment status update
- ✅ Revenue reports and analytics

### 4.5 Message Management
- ✅ View all sent messages
- ✅ Send manual messages
- ✅ Configure automated message schedules
- ✅ Message templates
- ✅ Message delivery tracking

### 4.6 Selection & Advertisement Control
- ✅ **Confirm Selection**:
  - Select applicant(s) from dashboard
  - Confirm selection → sends Gmail notification
  - Track selection history
- ✅ **Close Advertisement**:
  - Close button for each advertisement
  - Complete termination (no access, no payments)
  - Generate QR code on closure
  - Send QR code to admin Gmail
- ✅ **Reactivation**:
  - Requires Gmail authentication
  - Requires QR code entry
  - Validate QR code (format, expiration, usage)
  - Reactivate if valid
  - Re-enable applications and payments

### 4.7 Settings Management
- ✅ Configure bank account details
- ✅ Set advertisement dates
- ✅ Set selection deadline
- ✅ Manage interview locations
- ✅ Configure AI verification settings
- ✅ Manage advertisement status

---

## 5. Advertisement Status Management

### 5.1 Closure Process
- ✅ Close button on admin dashboard for each ad
- ✅ Complete termination:
  - All access terminated (no new applications)
  - All payment methods blocked (bank transfer, Paymob, etc.)
  - Landing page shows "Advertisement Closed" message
  - Apply button completely disabled
- ✅ Generate unique encrypted QR code
- ✅ Send QR code to admin's Gmail address
- ✅ QR code expiration (configurable, default: 30 days)
- ✅ Record closure timestamp and admin who closed it

### 5.2 Reactivation Process
- ✅ Gmail authentication required
- ✅ QR code entry (scan or manual)
- ✅ QR code validation:
  - Format and authenticity check
  - Expiration check
  - Usage check (not used before)
  - Gmail match verification
- ✅ After successful reactivation:
  - Status changes to "active"
  - New applications accepted again
  - Payment methods re-enabled
  - Mark QR code as used

---

## 6. Content Protection

### 6.1 Protection Features
- ✅ Disable right-click context menu
- ✅ Disable text selection (CSS user-select: none)
- ✅ Disable keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+A, Print Screen)
- ✅ Disable screenshot tools (detect common methods)
- ✅ Watermark overlay on content
- ✅ Prevent developer tools inspection (basic protection)
- ✅ Display warning if copy/paste attempted

---

## 7. Copyright & Security Information

### 7.1 Copyright Display
- ✅ Copyright notice: "© [Year] Egyptian Ministry of Education. All rights reserved."
- ✅ Official domain verification badge
- ✅ Ministry of Education official seal/logo
- ✅ Government entity disclaimer
- ✅ Display on landing page footer and all public pages

### 7.2 Security Information
- ✅ SSL/TLS encryption indicator
- ✅ Data protection compliance notice
- ✅ Secure payment processing badges
- ✅ Official verification methods
- ✅ Anti-fraud warnings and tips
- ✅ Contact information for verification
- ✅ Report suspicious activity link

### 7.3 Legal Pages
- ✅ Terms of Service page (`/terms`)
- ✅ Privacy Policy page (`/privacy`)
- ✅ Bilingual support for all legal content

---

## 8. Ease of Use Enhancements

### 8.1 User Experience
- ✅ Progress indicator for application steps
- ✅ Draft saving (auto-save every 30 seconds)
- ✅ Application status tracker dashboard
- ✅ Mobile optimization (responsive design)
- ✅ Help & support system:
  - Contextual tooltips
  - FAQ section
  - Video tutorials
  - Live chat (AI chatbot)
  - Help center with search
- ✅ Simplified payment flow
- ✅ Email notifications for each step
- ✅ Form enhancements:
  - Auto-fill from Gmail
  - Address autocomplete
  - Phone number formatting
  - Real-time validation

---

## 9. Enhanced Promotion System

### 9.1 Social Media
- ✅ Share buttons (Facebook, Twitter, LinkedIn, WhatsApp)
- ✅ One-click sharing with pre-filled content
- ✅ Shareable referral links with tracking
- ✅ Social media preview cards (Open Graph tags)
- ✅ Share statistics tracking

### 9.2 Referral Program
- ✅ Unique referral code for each applicant
- ✅ Track referrals and conversions
- ✅ Incentive system (optional)
- ✅ Referral leaderboard
- ✅ Share referral link via social media

### 9.3 SEO & Marketing
- ✅ SEO optimization (meta tags, structured data)
- ✅ Google Ads integration
- ✅ Email marketing campaigns
- ✅ SMS marketing
- ✅ Push notifications (PWA support)
- ✅ QR code sharing
- ✅ Embeddable widget
- ✅ Analytics & tracking (Google Analytics 4)
- ✅ Multi-channel promotion dashboard
- ✅ Job board syndication
- ✅ Press release integration
- ✅ Influencer partnership tools

---

## 10. Technology Stack

### 10.1 Frontend/Backend
- ✅ Next.js 14+ with TypeScript (App Router)
- ✅ Tailwind CSS with RTL support
- ✅ next-intl for internationalization

### 10.2 Database
- ✅ PostgreSQL
- ✅ Prisma ORM

### 10.3 Services
- ✅ Paymob (Payment gateway)
- ✅ NextAuth.js (Authentication)
- ✅ OpenAI API (AI services)
- ✅ SendGrid/Resend (Email service)
- ✅ Twilio (SMS service)
- ✅ Google Analytics 4 (Analytics)

---

## 11. Database Schema

### 11.1 Models
- ✅ User Model (Gmail, email/phone verification, National ID paths)
- ✅ Application Model (with selection status, payment info, AI verification)
- ✅ Coupon Model
- ✅ Appointment Model (with social security details)
- ✅ Message Model
- ✅ Settings Model (with advertisement status, QR code fields)
- ✅ Revenue Model

---

## 12. Internationalization

### 12.1 Language Support
- ✅ Modern Standard Arabic (primary language)
- ✅ English (secondary language)
- ✅ RTL layout support for Arabic
- ✅ Language switcher component
- ✅ All UI text, forms, messages translated
- ✅ Date/time formatting per locale
- ✅ Currency formatting (EGP)

---

## 13. Security Features

### 13.1 Security Measures
- ✅ Security mark generation (hash-based)
- ✅ Input validation and sanitization
- ✅ CSRF protection
- ✅ Rate limiting on API routes
- ✅ Secure payment processing
- ✅ Encrypted QR codes
- ✅ Secure file storage for ID documents

---

## 14. Environment Variables Required

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - For authentication
- `NEXTAUTH_URL` - Application URL
- `GOOGLE_CLIENT_ID` - Gmail OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Gmail OAuth client secret
- `PAYMOB_API_KEY` - Paymob API credentials
- `PAYMOB_INTEGRATION_ID` - Payment integration ID
- `PAYMOB_HMAC_SECRET` - For webhook verification
- `SECURITY_MARK_SECRET` - Secret for generating security marks
- `OPENAI_API_KEY` - For AI verification and messaging
- `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` - For SMS verification
- `EMAIL_SERVICE_API_KEY` - For email notifications
- `QR_CODE_SECRET` - Secret key for QR code generation
- `FACEBOOK_ACCESS_TOKEN` - For Facebook posting
- `TWITTER_API_KEY` / `TWITTER_API_SECRET` - For Twitter posting
- `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` - For LinkedIn posting

---

## 15. Implementation Status

- ⏳ **Planning Phase**: Complete
- ⏳ **Development Phase**: Not started
- ⏳ **Testing Phase**: Not started
- ⏳ **Deployment Phase**: Not started

---

**Last Updated**: Based on complete conversation review
**Status**: Comprehensive requirements documented, ready for implementation


