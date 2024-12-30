import { createClient } from '@supabase/supabase-js'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey)

// Create a function to get an authenticated client
export async function getAuthenticatedClient(request: NextRequest) {
  const { getToken } = await getAuth(request)
  const token = await getToken({ template: 'supabase' })

  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })
}