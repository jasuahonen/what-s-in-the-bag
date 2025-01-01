import { getAuth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/clerk-sdk-node'
import { NextResponse } from 'next/server'
import { getAuthenticatedClient } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user data from Clerk
    const user = await clerkClient.users.getUser(userId)
    const username = user.username || `${user.firstName} ${user.lastName}`.trim() || 'Anonymous'

    const supabase = await getAuthenticatedClient(request)
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 })
    }

    console.log('File details:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    })

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`

    // Convert to Blob and upload
    const fileBuffer = await file.arrayBuffer()
    const fileBlob = new Blob([fileBuffer], { type: file.type })

    const { data: storageData, error: storageError } = await supabase.storage
      .from('golf_bags')
      .upload(fileName, fileBlob, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (storageError) {
      console.error('Storage error:', storageError)
      return NextResponse.json({ error: 'Storage error', details: storageError }, { status: 500 })
    }

    // Get public URL with validation
    const publicUrlData = supabase.storage
      .from('golf_bags')
      .getPublicUrl(fileName)

    if (!publicUrlData?.data?.publicUrl) {
      console.error('Failed to generate public URL:', publicUrlData)
      return NextResponse.json({ error: 'Failed to generate public URL' }, { status: 500 })
    }

    const imageUrl = publicUrlData.data.publicUrl

    // Create database record
    const { error: dbError } = await supabase
      .from('golf_bags')
      .insert([{
        user_id: userId,
        username: username,
        image_url: imageUrl,
        average_rating: 0,
        average_handicap_guess: 0,
        ratings_count: 0,
        handicap_guesses_count: 0,
        created_at: new Date().toISOString()
      }])

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Database error', details: dbError }, { status: 500 })
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({
      error: 'Upload failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}