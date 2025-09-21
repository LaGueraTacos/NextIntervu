import { createClient } from '@supabase/supabase-js'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wqaughuuwvbyfhisixxi.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxYXVnaHV1d3ZieWZoaXNpeHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTgxMTYsImV4cCI6MjA3Mzg3NDExNn0.rDby3x1NCXlBUUZ5LXv5QebVquXVWB5xQSBxuAGibS0'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client for client-side operations (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
// If service key is available, use it (bypasses RLS)
// Otherwise, use anon key (requires RLS to be disabled)
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabase // Fallback to regular client

// Types for our waitlist data
export interface WaitlistSignup {
  id?: string
  email: string
  name: string
  role: string
  experience: string
  company?: string
  skills: string[]
  created_at?: string
  updated_at?: string
}
