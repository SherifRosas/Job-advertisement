-- Supabase SQL Setup Script
-- Run this in Supabase SQL Editor to create all tables
-- Go to: SQL Editor → New Query → Paste this → Run

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneNumber" TEXT,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "gmailId" TEXT UNIQUE,
    "name" TEXT,
    "address" TEXT,
    "nationalIdFront" TEXT,
    "nationalIdBack" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create applications table
CREATE TABLE IF NOT EXISTS "applications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "nationalIdFront" TEXT NOT NULL,
    "nationalIdBack" TEXT NOT NULL,
    "requirementsAgreed" BOOLEAN NOT NULL DEFAULT false,
    "documentsAgreed" BOOLEAN NOT NULL DEFAULT false,
    "aiVerified" BOOLEAN NOT NULL DEFAULT false,
    "aiVerificationNotes" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "paymentAmount" DOUBLE PRECISION NOT NULL DEFAULT 1000.0,
    "paymentTransactionId" TEXT,
    "selectionStatus" TEXT NOT NULL DEFAULT 'pending',
    "selectedAt" TIMESTAMP(3),
    "selectedBy" TEXT,
    "selectionEmailSent" BOOLEAN NOT NULL DEFAULT false,
    "selectionEmailSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create coupons table
CREATE TABLE IF NOT EXISTS "coupons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "applicationId" TEXT NOT NULL UNIQUE,
    "couponCode" TEXT NOT NULL UNIQUE,
    "securityMark" TEXT NOT NULL,
    "downloadable" BOOLEAN NOT NULL DEFAULT true,
    "printable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "coupons_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS "appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "applicationId" TEXT NOT NULL UNIQUE,
    "applicantName" TEXT NOT NULL,
    "socialSecurityCardDetails" TEXT,
    "securityMark" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "appointments_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create messages table
CREATE TABLE IF NOT EXISTS "messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "applicationId" TEXT,
    "type" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "messages_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create settings table
CREATE TABLE IF NOT EXISTS "settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bankAccountNumber" TEXT,
    "bankName" TEXT,
    "bankDetails" TEXT,
    "advertisementStartDate" TIMESTAMP(3),
    "selectionDeadline" TIMESTAMP(3),
    "interviewLocation" TEXT,
    "advertisementStatus" TEXT NOT NULL DEFAULT 'active',
    "closedAt" TIMESTAMP(3),
    "closedBy" TEXT,
    "reactivationQrCode" TEXT,
    "qrCodeExpiresAt" TIMESTAMP(3),
    "qrCodeUsed" BOOLEAN NOT NULL DEFAULT false,
    "adminGmail" TEXT DEFAULT 'sherifrosas.ai@gmail.com',
    "canReactivate" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create revenue table
CREATE TABLE IF NOT EXISTS "revenue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "applicationId" TEXT NOT NULL UNIQUE,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "revenue_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users"("email");
CREATE INDEX IF NOT EXISTS "users_gmailId_idx" ON "users"("gmailId");
CREATE INDEX IF NOT EXISTS "applications_userId_idx" ON "applications"("userId");
CREATE INDEX IF NOT EXISTS "applications_paymentStatus_idx" ON "applications"("paymentStatus");
CREATE INDEX IF NOT EXISTS "applications_selectionStatus_idx" ON "applications"("selectionStatus");
CREATE INDEX IF NOT EXISTS "messages_userId_idx" ON "messages"("userId");
CREATE INDEX IF NOT EXISTS "messages_applicationId_idx" ON "messages"("applicationId");

-- Insert default settings
INSERT INTO "settings" ("id", "advertisementStatus", "adminGmail")
VALUES ('default', 'active', 'sherifrosas.ai@gmail.com')
ON CONFLICT ("id") DO NOTHING;

-- Success message
SELECT 'All tables created successfully! ✅' as status;


