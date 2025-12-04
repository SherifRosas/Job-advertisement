-- Campaign Management System Migration
-- Run this in Supabase SQL Editor to add campaign tables

-- Create campaigns table
CREATE TABLE IF NOT EXISTS "campaigns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "platforms" TEXT[] NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "scheduleType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "recurrenceRule" TEXT,
    "content" TEXT,
    "language" TEXT NOT NULL DEFAULT 'ar',
    "targetAudience" TEXT,
    "autoGenerate" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create campaign_executions table
CREATE TABLE IF NOT EXISTS "campaign_executions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "content" TEXT,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "executedAt" TIMESTAMP(3),
    "result" JSONB,
    "errorMessage" TEXT,
    "reach" INTEGER,
    "engagement" INTEGER,
    "clicks" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "campaign_executions_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "campaigns_status_idx" ON "campaigns"("status");
CREATE INDEX IF NOT EXISTS "campaigns_startDate_idx" ON "campaigns"("startDate");
CREATE INDEX IF NOT EXISTS "campaign_executions_campaignId_idx" ON "campaign_executions"("campaignId");
CREATE INDEX IF NOT EXISTS "campaign_executions_status_idx" ON "campaign_executions"("status");
CREATE INDEX IF NOT EXISTS "campaign_executions_scheduledAt_idx" ON "campaign_executions"("scheduledAt");

