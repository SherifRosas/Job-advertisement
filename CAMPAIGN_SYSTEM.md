# Marketing Campaign Automation System

## Overview

The Marketing Campaign Automation System allows administrators to create, schedule, and manage automated marketing campaigns across multiple platforms (Facebook, Twitter, LinkedIn, WhatsApp, Email). The system integrates with the AI Agent "Numerous" (نافير) to automatically generate content and execute campaigns.

## Features

### Campaign Management
- **Create Campaigns**: Design campaigns with custom content or AI-generated content
- **Multi-Platform Support**: Post to Facebook, Twitter, LinkedIn, WhatsApp, and Email
- **Scheduling Options**: 
  - One-time campaigns
  - Recurring campaigns (daily)
  - Interval-based campaigns (e.g., every 3 days)
- **Campaign Status**: Draft, Scheduled, Active, Paused, Completed, Cancelled
- **Campaign Analytics**: Track reach, engagement, clicks, and success rates

### AI Integration
- **Auto-Generate Content**: Use AI to create campaign content automatically
- **Multi-Language Support**: Generate content in Arabic, English, or both
- **Platform-Specific Content**: Optimize content for each social media platform

### Automation
- **Scheduled Execution**: Campaigns execute automatically at scheduled times
- **Batch Processing**: Process multiple campaign executions efficiently
- **Error Handling**: Failed executions are tracked and can be retried

## Database Schema

### Campaign Model
```prisma
model Campaign {
  id              String              @id @default(cuid())
  name            String
  description     String?
  type            String              // social_post, email_campaign, multi_channel
  platforms       String[]            // facebook, twitter, linkedin, whatsapp, email
  status          String              @default("draft")
  scheduleType    String              // once, recurring, interval
  startDate       DateTime?
  endDate         DateTime?
  recurrenceRule  String?             // cron expression or interval description
  content         String?
  language        String              @default("ar")
  targetAudience  String?
  autoGenerate    Boolean             @default(true)
  config          Json?
  createdBy       String?
  createdAt       DateTime            @default(now())
  updatedAt       DateTime            @updatedAt
  executions      CampaignExecution[]
}
```

### CampaignExecution Model
```prisma
model CampaignExecution {
  id              String      @id @default(cuid())
  campaignId      String
  platform        String
  status          String      @default("pending")
  content         String?
  scheduledAt     DateTime
  executedAt      DateTime?
  result          Json?
  errorMessage    String?
  reach           Int?
  engagement      Int?
  clicks          Int?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  campaign        Campaign    @relation(...)
}
```

## API Endpoints

### Campaign Management
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns?id={id}` - Get campaign by ID with metrics
- `POST /api/campaigns` - Create a new campaign
- `PUT /api/campaigns` - Update a campaign
- `DELETE /api/campaigns?id={id}` - Delete a campaign

### Campaign Actions
- `POST /api/campaigns/[id]/actions` - Perform actions (pause, resume, cancel, execute)

### Campaign Processing
- `POST /api/campaigns/process` - Process scheduled campaigns (cron job endpoint)

## Usage

### Creating a Campaign

1. Navigate to Admin Dashboard → Marketing Campaigns
2. Click "Create Campaign"
3. Fill in campaign details:
   - **Name**: Campaign name
   - **Type**: Social post, Email campaign, or Multi-channel
   - **Platforms**: Select one or more platforms
   - **Schedule Type**: Once, Recurring, or Interval
   - **Start/End Date**: Campaign duration
   - **Language**: Arabic, English, or Both
   - **Auto-generate**: Enable AI content generation
4. Click "Create Campaign"

### Managing Campaigns

- **View Details**: Click "View Details" to see campaign metrics and executions
- **Pause**: Temporarily pause an active campaign
- **Resume**: Resume a paused campaign
- **Cancel**: Cancel a campaign permanently

### Automated Processing

Campaigns are automatically processed by calling the `/api/campaigns/process` endpoint. This should be set up as a cron job to run periodically (e.g., every 5 minutes).

#### Setting Up Cron Job (Vercel)

1. Create a Vercel Cron Job configuration in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/campaigns/process",
    "schedule": "*/5 * * * *"
  }]
}
```

2. Or use an external cron service (e.g., cron-job.org) to call:
```
POST https://your-domain.com/api/campaigns/process
```

## Admin UI

The campaign management interface is available at `/admin/campaigns` and includes:

- Campaign list with status indicators
- Campaign creation modal
- Campaign details sidebar with metrics
- Action buttons (pause, resume, cancel)
- Real-time execution status

## Integration with AI Agent

The campaign system integrates with the AI Agent "Numerous" to:

1. **Generate Content**: Automatically create engaging content for campaigns
2. **Execute Tasks**: Post to social media platforms via the agent
3. **Track Metrics**: Collect and store campaign performance data

## Database Migration

To set up the campaign tables, run the SQL migration file:

```sql
-- Run supabase-campaign-migration.sql in Supabase SQL Editor
```

Or use Prisma:

```bash
npx prisma db push
npx prisma generate
```

## Future Enhancements

- [ ] Advanced scheduling with cron expressions
- [ ] A/B testing for campaign content
- [ ] Audience targeting and segmentation
- [ ] Budget management and spending limits
- [ ] Real-time social media API integration
- [ ] Email service integration (SendGrid/Resend)
- [ ] Campaign templates and presets
- [ ] Performance analytics dashboard
- [ ] Export campaign reports

