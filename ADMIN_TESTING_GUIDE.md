# Admin Testing Guide

## Admin Login Credentials

### Default Credentials
- **Email**: `admin@example.com`
- **Password**: `admin123`

### Custom Credentials (if set in `.env.local`)
- **Email**: Set via `ADMIN_EMAIL` environment variable
- **Password**: Set via `ADMIN_PASSWORD` environment variable

## Testing Steps

### 1. Access Admin Login
1. Navigate to: `http://localhost:3000/admin/login`
2. You should see the admin login form

### 2. Login as Admin
1. Enter admin email: `admin@example.com`
2. Enter admin password: `admin123`
3. Click "Login"
4. You should be redirected to `/admin` (Admin Dashboard)

### 3. Test Admin Dashboard (`/admin`)
**What to check:**
- ✅ Statistics cards display correctly:
  - Total Applications
  - Paid Applications
  - Pending Payments
  - Selected Count
  - Revenue Total
- ✅ Navigation links work:
  - "View Applications" button
  - "Manage Applications" card
  - "Settings" card
  - "Messages" card

### 4. Test Applications Page (`/admin/applications`)
**What to check:**
- ✅ Table displays all applications
- ✅ Columns show:
  - Name
  - Email
  - Payment Status (with color coding)
  - Selection Status (with color coding)
  - Date
  - Actions
- ✅ ApplicationActions component works (if implemented)

### 5. Test Messages Page (`/admin/messages`)
**What to check:**
- ✅ Table displays all messages
- ✅ Columns show:
  - Type
  - Recipient (email)
  - Status
  - Sent At
  - Content (truncated)
- ✅ "Send Messages" button works (if implemented)
- ✅ "Back to Dashboard" link works

### 6. Test Settings Page (`/admin/settings`)
**What to check:**
- ✅ Advertisement Status section:
  - Current status displayed
  - Closed date (if closed)
  - "Close Advertisement" button (if active)
  - "Reactivate Advertisement" link (if closed)
- ✅ Bank Account Details section:
  - Bank Name
  - Account Number
- ✅ "Back to Dashboard" link works

### 7. Test Advertisement Closure
1. Go to `/admin/settings`
2. Click "Close Advertisement" button
3. Check:
   - Status changes to "closed"
   - QR code is generated
   - QR code is sent to admin email (check terminal for code)
   - Closure date is recorded

### 8. Test Advertisement Reactivation
1. Go to `/admin/reactivate` (if advertisement is closed)
2. Enter the QR code from email/terminal
3. Check:
   - QR code validation works
   - Advertisement status changes to "active"
   - New applications can be accepted

## Expected Behavior

### Admin Dashboard
- Shows real-time statistics from database
- All counts should match actual data
- Revenue should sum all paid applications (1000 EGP each)

### Applications Page
- Lists all applications in reverse chronological order
- Shows user email (fetched from users table)
- Payment status: green for "paid", yellow for "pending"
- Selection status: blue for "selected", red for "rejected", gray for "pending"

### Messages Page
- Lists last 100 messages
- Shows message type, recipient, status, and content
- Messages are ordered by creation date (newest first)

### Settings Page
- Shows current advertisement status
- Allows closing advertisement (generates QR code)
- Shows bank account details
- Allows reactivation with QR code

## Troubleshooting

### Can't Login
- Check `.env.local` for `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- Default credentials: `admin@example.com` / `admin123`
- Check browser console for errors
- Check terminal for authentication errors

### Dashboard Shows Zero Stats
- Check if applications exist in database
- Verify Supabase connection
- Check browser console for errors
- Check terminal for database errors

### Pages Show Errors
- Check terminal for error messages
- Verify all Supabase queries are working
- Check that database tables exist
- Verify environment variables are set

## Test Checklist

- [ ] Admin login works
- [ ] Admin dashboard loads with statistics
- [ ] Applications page displays all applications
- [ ] Messages page displays all messages
- [ ] Settings page shows current settings
- [ ] Close advertisement works
- [ ] Reactivate advertisement works (if applicable)
- [ ] All navigation links work
- [ ] All "Back to Dashboard" links work

## Notes

- Admin authentication uses NextAuth credentials provider
- Admin role is set in JWT token
- All admin pages check for `role === 'admin'`
- If not admin, user is redirected to `/admin/login`
- Admin credentials are stored in environment variables (not in database)

