import { PrismaClient } from '@prisma/client'
import { getDatabaseUrl } from './env-loader'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Get the correct DATABASE_URL
const databaseUrl = getDatabaseUrl()

// Debug: Check DATABASE_URL
if (typeof window === 'undefined') {
  console.log('🔍 DATABASE_URL Check:', {
    fromProcessEnv: process.env.DATABASE_URL?.substring(0, 30),
    fromLoader: databaseUrl?.substring(0, 30),
    length: databaseUrl?.length,
    hasPostgresql: databaseUrl?.startsWith('postgresql://'),
    hasPostgres: databaseUrl?.startsWith('postgres://'),
  })
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is missing!')
  } else if (!databaseUrl.startsWith('postgresql://') && !databaseUrl.startsWith('postgres://')) {
    console.error('❌ DATABASE_URL does not start with postgresql:// or postgres://')
    console.error('   Current value starts with:', databaseUrl.substring(0, 30))
  } else {
    // Set it in process.env so Prisma can use it
    process.env.DATABASE_URL = databaseUrl
    console.log('✅ DATABASE_URL set correctly for Prisma')
  }
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl || process.env.DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


