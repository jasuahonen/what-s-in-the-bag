import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('golf-bags')
      .upload(fileName, file)

    if (error) throw error

    const imageUrl = supabase.storage
      .from('golf-bags')
      .getPublicUrl(fileName).data.publicUrl

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}