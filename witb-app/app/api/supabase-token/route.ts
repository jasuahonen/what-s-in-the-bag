import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { userId, getToken } = await getAuth(request)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get JWT token for Supabase
  const token = await getToken({
    template: 'supabase'
  })

  return NextResponse.json({ token })
}