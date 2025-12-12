/**
 * Explicitly load DATABASE_URL from .env.local
 * This ensures we get the correct value even if Next.js env loading has issues
 */

import { readFileSync } from 'fs'
import { join } from 'path'

let cachedDatabaseUrl: string | null = null

export function getDatabaseUrl(): string {
  // Don't use cache in development - always read fresh
  // This ensures we get the latest .env.local changes
  if (process.env.NODE_ENV === 'production' && cachedDatabaseUrl) {
    return cachedDatabaseUrl
  }
  
  // Clear cache to force fresh read
  cachedDatabaseUrl = null

  // First, try process.env (Next.js should load it)
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgresql://')) {
    cachedDatabaseUrl = process.env.DATABASE_URL
    return cachedDatabaseUrl
  }

  // If process.env has wrong value, try reading .env.local directly
  try {
    const envPath = join(process.cwd(), '.env.local')
    const envContent = readFileSync(envPath, 'utf-8')
    
    // Extract DATABASE_URL from file - handle multiline strings
    // Pattern 1: Quoted string that may span multiple lines
    let match = envContent.match(/DATABASE_URL\s*=\s*"([^"]*(?:\\.[^"]*)*)"/s)
    if (!match) {
      // Pattern 2: Single quotes with multiline support
      match = envContent.match(/DATABASE_URL\s*=\s*'([^']*(?:\\.[^']*)*)'/s)
    }
    if (!match) {
      // Pattern 3: Unquoted (greedy match until end of line or next variable)
      match = envContent.match(/DATABASE_URL\s*=\s*([^\r\n]+)/)
    }
    
    if (match && match[1]) {
      let url = match[1]
        .trim()
        // Remove escaped quotes
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        // Remove all line breaks and extra whitespace within the URL
        .replace(/[\r\n]+/g, '')
        .replace(/\s+/g, '')
        // Remove trailing quotes if any
        .replace(/^["']|["']$/g, '')
      
      // Verify it's a valid PostgreSQL URL
      if (url.startsWith('postgresql://') || url.startsWith('postgres://')) {
        cachedDatabaseUrl = url
        console.log('✅ Loaded DATABASE_URL from .env.local file directly')
        console.log('   URL length:', url.length)
        console.log('   URL preview:', url.substring(0, 80) + '...')
        return cachedDatabaseUrl
      } else {
        console.warn('⚠️ DATABASE_URL found but format is invalid:', url.substring(0, 50))
      }
    } else {
      console.warn('⚠️ Could not find DATABASE_URL in .env.local')
    }
  } catch (error) {
    console.error('Error reading .env.local:', error)
  }

  // Fallback to process.env (even if wrong, for error messages)
  return process.env.DATABASE_URL || ''
}

