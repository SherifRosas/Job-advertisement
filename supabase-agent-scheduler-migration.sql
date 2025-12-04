-- Agent Task Scheduler Migration
-- Run this in Supabase SQL Editor to add agent task scheduling table

-- Create agent_tasks table
CREATE TABLE IF NOT EXISTS "agent_tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "platform" TEXT,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "content" TEXT,
    "config" JSONB,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "maxRetries" INTEGER NOT NULL DEFAULT 3,
    "lastError" TEXT,
    "result" JSONB,
    "executedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "agent_tasks_status_scheduledAt_idx" ON "agent_tasks"("status", "scheduledAt");
CREATE INDEX IF NOT EXISTS "agent_tasks_status_idx" ON "agent_tasks"("status");
CREATE INDEX IF NOT EXISTS "agent_tasks_scheduledAt_idx" ON "agent_tasks"("scheduledAt");
CREATE INDEX IF NOT EXISTS "agent_tasks_type_idx" ON "agent_tasks"("type");
CREATE INDEX IF NOT EXISTS "agent_tasks_platform_idx" ON "agent_tasks"("platform");

