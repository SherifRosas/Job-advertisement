import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client
// Use this for server components and API routes

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qtmaaomweaqoumbclpox.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bWFhb213ZWFxb3VtYmNscG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MDEwNjksImV4cCI6MjA3OTk3NzA2OX0.KKOfzcF0PAVUaAZTTHKwdHRgqhZKiHRBmhY6plgdNTo'

// Create server-side Supabase client
export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

// Helper to get settings (with error handling)
export async function getSettings() {
  try {
    // Validate Supabase credentials before making request
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials not configured, skipping settings fetch')
      return null
    }

    const { data, error } = await supabaseServer
      .from('settings')
      .select('*')
      .eq('id', 'default')
      .single()
    
    if (error) {
      // If no settings found, return null (not an error)
      if (error.code === 'PGRST116') {
        return null
      }
      // Only log non-critical errors (suppress "Invalid API key" during build)
      if (error.message?.includes('Invalid API key')) {
        console.warn('Supabase API key validation failed - check environment variables')
        return null
      }
      console.error('Error fetching settings:', error)
      return null
    }
    
    return data
  } catch (error: any) {
    // Suppress "Invalid API key" errors during build
    if (error?.message?.includes('Invalid API key')) {
      console.warn('Supabase API key issue - check environment variables in Vercel')
      return null
    }
    console.error('Exception fetching settings:', error)
    return null
  }
}


