'use client'

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function AddSetupButton() {
  const { userId } = useAuth()
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = async () => {
    try {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'

      const fileSelected = new Promise<File | null>((resolve) => {
        input.onchange = (e) => {
          const files = (e.target as HTMLInputElement).files
          resolve(files?.[0] || null)
        }
      })

      input.click()

      const file = await fileSelected
      if (!file || !userId) {
        console.error('No file selected or user not authenticated')
        return
      }

      if (!file.type.startsWith('image/')) {
        console.error('Invalid file type:', file.type)
        return
      }

      setIsUploading(true)
      console.log('Starting upload:', {
        name: file.name,
        size: file.size,
        type: file.type
      })

      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const responseData = await uploadResponse.json()

      if (!uploadResponse.ok) {
        console.error('Upload failed:', responseData)
        throw new Error(responseData.error || 'Upload failed')
      }

      console.log('Upload successful:', responseData)
      router.refresh()
    } catch (error) {
      console.error('Upload error:', error)
      // You might want to show a toast or error message to the user here
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Button
      onClick={handleFileSelect}
      disabled={isUploading}
      className="bg-green-600 hover:bg-green-700 text-white lg:text-base md:text-sm sm:text-xs"
    >
      <PlusCircle className="mr-2 h-4 w-4 lg:h-4 lg:w-4 md:h-3 md:w-3 sm:h-2 sm:w-2" />
      {isUploading ? 'Uploading...' : 'Add a New Bag'}
    </Button>
  )
}

