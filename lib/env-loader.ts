/**
 * Explicitly load DATABASE_URL from .env.local
 * This ensures we get the correct value even if Next.js env loading has issues
 */

let cachedDatabaseUrl: string | null = null

export function getDatabaseUrl(): string {
  // In production/build (Vercel), only use process.env - don't try to read .env.local
  // Check VERCEL env var first (more reliable than NODE_ENV during build)
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    // In production, always use process.env directly
    if (process.env.DATABASE_URL) {
      // Remove any "echo" prefix that might have been accidentally added
      let url = process.env.DATABASE_URL.trim()
      if (url.startsWith('echo ')) {
        url = url.substring(5).trim()
      }
      if (url.startsWith('postgresql://') || url.startsWith('postgres://')) {
        return url
      }
    }
    return process.env.DATABASE_URL || ''
  }

  // In development: try process.env first, then fall back to .env.local
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgresql://')) {
    cachedDatabaseUrl = process.env.DATABASE_URL
    return cachedDatabaseUrl
  }

  // Only try reading .env.local in development (not in Vercel build)
  // Use dynamic import to avoid bundling fs module in client-side code
  try {
    // Dynamic import to ensure this only runs server-side
    const { readFileSync } = require('fs')
    const { join } = require('path')
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
        return url
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

