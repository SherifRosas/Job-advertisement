# Marketing Campaign Automation System - Component Tree

```
Marketing Campaign Automation System
│
├── 📊 Database Layer
│   ├── Campaign Model (prisma/schema.prisma)
│   │   ├── id, name, description
│   │   ├── type (social_post, email_campaign, multi_channel)
│   │   ├── platforms[] (facebook, twitter, linkedin, whatsapp, email)
│   │   ├── status (draft, scheduled, active, paused, completed, cancelled)
│   │   ├── scheduleType (once, recurring, interval)
│   │   ├── startDate, endDate, recurrenceRule
│   │   ├── content, language, targetAudience
│   │   ├── autoGenerate (boolean)
│   │   └── config (JSON)
│   │
│   └── CampaignExecution Model
│       ├── id, campaignId
│       ├── platform, status
│       ├── content, scheduledAt, executedAt
│       ├── result (JSON), errorMessage
│       └── metrics: reach, engagement, clicks
│
├── 🔧 Core Library (lib/campaign.ts)
│   ├── createCampaign()
│   │   └── Auto-generates content via AI if enabled
│   │
│   ├── scheduleCampaignExecutions()
│   │   ├── Once: Single execution per platform
│   │   ├── Recurring: Daily executions
│   │   └── Interval: Custom interval (e.g., every 3 days)
│   │
│   ├── executeCampaignExecution()
│   │   ├── Updates status to "running"
│   │   ├── Generates content via AI Agent if needed
│   │   ├── Executes via AI Agent
│   │   └── Updates with results/metrics
│   │
│   ├── getCampaignMetrics()
│   │   ├── Total reach, engagement, clicks
│   │   ├── Execution count, success rate
│   │   └── Average metrics
│   │
│   ├── getAllCampaigns()
│   ├── getCampaignById()
│   ├── updateCampaign()
│   ├── deleteCampaign()
│   ├── pauseCampaign()
│   ├── resumeCampaign()
│   ├── cancelCampaign()
│   └── processScheduledCampaigns() [Cron Job Function]
│
├── 🌐 API Routes
│   ├── /api/campaigns
│   │   ├── GET → List all campaigns
│   │   └── POST → Create new campaign
│   │
│   ├── /api/campaigns/[id]
│   │   ├── GET → Get campaign + metrics
│   │   ├── PUT → Update campaign
│   │   └── DELETE → Delete campaign
│   │
│   ├── /api/campaigns/[id]/actions
│   │   └── POST → Actions (pause, resume, cancel, execute)
│   │
│   └── /api/campaigns/process
│       └── POST → Process scheduled campaigns (Cron endpoint)
│
├── 🎨 Admin UI (app/admin/campaigns/page.tsx)
│   ├── Campaign List View
│   │   ├── Status badges (color-coded)
│   │   ├── Platform tags
│   │   ├── Latest executions preview
│   │   └── Action buttons (View, Pause, Resume, Cancel)
│   │
│   ├── Campaign Details Sidebar
│   │   ├── Campaign information
│   │   ├── Metrics display
│   │   │   ├── Total reach, engagement, clicks
│   │   │   ├── Execution count
│   │   │   └── Success rate
│   │   └── Content preview
│   │
│   └── Create Campaign Modal
│       ├── Basic info (name, description)
│       ├── Type selection (social_post, email, multi_channel)
│       ├── Platform selection (multi-select)
│       ├── Schedule configuration
│       │   ├── Schedule type (once, recurring, interval)
│       │   ├── Start/End dates
│       │   └── Interval settings
│       ├── Language selection (ar, en, both)
│       ├── Auto-generate toggle
│       └── Manual content input (if auto-generate disabled)
│
├── 🤖 AI Agent Integration
│   └── getAIAgent() from lib/ai-agent.ts
│       ├── generateContent()
│       │   ├── Type: social_post, email, ad_copy
│       │   ├── Platform-specific optimization
│       │   └── Language support (ar, en)
│       │
│       └── executeTask()
│           ├── Social media posting
│           └── Email campaigns
│
├── 📁 Supporting Files
│   ├── supabase-campaign-migration.sql
│   │   └── Database migration script
│   │
│   ├── CAMPAIGN_SYSTEM.md
│   │   └── Full documentation
│   │
│   └── prisma/schema.prisma
│       └── Updated with Campaign models
│
└── 🔗 Integration Points
    ├── Admin Dashboard (app/admin/page.tsx)
    │   └── Added "Marketing Campaigns" link
    │
    ├── Prisma Client (lib/db.ts)
    │   └── Shared database connection
    │
    └── AI Agent System (lib/ai-agent.ts)
        └── Content generation & execution
```

## Feature Flow Diagram

```
User Creates Campaign
    │
    ├─→ Campaign Created (status: draft/scheduled)
    │
    ├─→ Executions Scheduled (if scheduled)
    │   ├─→ Once: 1 execution per platform
    │   ├─→ Recurring: Daily executions until endDate
    │   └─→ Interval: Executions every N days
    │
    ├─→ Cron Job Runs (/api/campaigns/process)
    │   │
    │   └─→ Finds Pending Executions
    │       │
    │       └─→ For Each Execution:
    │           ├─→ Update status: pending → running
    │           ├─→ Generate content (if auto-generate enabled)
    │           ├─→ Execute via AI Agent
    │           ├─→ Update status: running → completed/failed
    │           └─→ Store metrics (reach, engagement, clicks)
    │
    └─→ Admin Views Results
        ├─→ Campaign list with status
        ├─→ Campaign details with metrics
        └─→ Execution history
```

## Status Flow

```
draft → scheduled → active → [paused] → completed
                          │
                          └→ cancelled
```

## Platform Support Tree

```
Multi-Platform Campaign
│
├── Social Media
│   ├── Facebook
│   ├── Twitter
│   ├── LinkedIn
│   └── WhatsApp
│
└── Email
    └── Email Campaign
```

