# Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database set up and migrated
- [ ] External services configured (Paymob, OpenAI, Email, SMS)
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Admin credentials set
- [ ] Test all major flows

## Deployment Steps

### 1. Build the Application

```bash
npm run build
```

### 2. Set Production Environment Variables

Ensure all production environment variables are set:
- Database URL (production)
- All API keys
- Production URLs
- Security secrets

### 3. Database Migration

```bash
npm run db:push
npm run db:seed
```

### 4. Deploy to Hosting Platform

#### Vercel
```bash
vercel --prod
```

#### Other Platforms
- Follow platform-specific deployment instructions
- Ensure Node.js 18+ is available
- Set all environment variables in platform dashboard

### 5. Configure Webhooks

- Paymob webhook URL: `https://yourdomain.com/api/payments/callback`
- Update Paymob dashboard with webhook URL

### 6. Verify Deployment

- Check health endpoint: `https://yourdomain.com/api/health`
- Test application flow
- Test admin functions
- Test payment processing

## Post-Deployment

1. Monitor error logs
2. Check database connections
3. Verify external service integrations
4. Test email/SMS delivery
5. Monitor payment processing

## Maintenance

- Regular database backups
- Monitor application logs
- Update dependencies regularly
- Security updates

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL
- Check database firewall rules
- Verify database credentials

### Payment Issues
- Verify Paymob credentials
- Check webhook configuration
- Review payment logs

### Email/SMS Issues
- Verify service credentials
- Check service quotas
- Review delivery logs

---

**For support, contact the development team.**


