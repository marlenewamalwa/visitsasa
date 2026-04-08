import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase project info
const supabaseUrl = "https://cuvdmgybqxivztqtwiwc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1dmRtZ3licXhpdnp0cXR3aXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NTIwODUsImV4cCI6MjA4OTMyODA4NX0.1DMeAr5mJso5UKTgcc0LlMjRhS9g6sqvZi-euKslYdU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})