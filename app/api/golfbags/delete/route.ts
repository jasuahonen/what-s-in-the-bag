import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getAuthenticatedClient } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await getAuth(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bagId, imageUrl } = await request.json()
    if (!bagId || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await getAuthenticatedClient(request)

    // Extract filename from the URL
    const fileName = imageUrl.split('/').pop()

    // Delete the image from storage
    const { error: storageError } = await supabase.storage
      .from('golf_bags')
      .remove([fileName])

    if (storageError) {
      console.error('Storage deletion error:', storageError)
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
    }

    // Delete the database record
    const { error: dbError } = await supabase
      .from('golf_bags')
      .delete()
      .eq('id', bagId)
      .eq('user_id', userId) // Ensure user owns the bag

    if (dbError) {
      console.error('Database deletion error:', dbError)
      return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}