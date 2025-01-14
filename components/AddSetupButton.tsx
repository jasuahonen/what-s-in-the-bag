'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle, Check, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

export function AddSetupButton() {
  const [isUploading, setIsUploading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [open, setOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { userId } = useAuth()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]
      if (!file || !userId) {
        console.error('No file selected or user not authenticated')
        return
      }

      if (!file.type.startsWith('image/')) {
        console.error('Invalid file type:', file.type)
        return
      }

      setIsUploading(true)
      setShowSuccess(false)

      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const responseData = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(responseData.error || 'Upload failed')
      }

      setShowSuccess(true)

      // Wait for the success message to be visible
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Reset form state
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setShowSuccess(false)
      setOpen(false)

      // Redirect to home page
      router.push('/')

    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleProceed = () => {
    fileInputRef.current?.click()
    setOpen(false)
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <div className="flex gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={isUploading}
                className="border border-gray-600 rounded-lg text-yellow-400 bg-gray-800 hover:bg-black transition-colors duration-200"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add a New Bag
              </Button>
            </DialogTrigger>
            <DialogContent
              className="bg-gray-900 text-gray-100 border-gray-800 max-w-md"
              aria-describedby="dialog-description"
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-yellow-400 mb-4">
                  Before You Add Your Golf Bag
                </DialogTitle>
                <p id="dialog-description" className="sr-only">
                  Instructions for uploading your golf bag photo and information about the rating system
                </p>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-200">Photo Requirements:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Take a vertical (portrait) photo of your golf bag</li>
                    <li>Ensure all clubs are visible and clearly arranged</li>
                    <li>Use good lighting for best visibility</li>
                    <li>Keep the background clean and uncluttered</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-200">Rating System:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Other users can rate your bag setup from 1-5 stars</li>
                    <li>They can also guess your handicap based on your clubs</li>
                    <li>Each user can only rate and guess once per bag</li>
                    <li>Average ratings and handicap guesses are shown on your profile</li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleProceed}
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Proceed to Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {showSuccess && (
          <span className="text-green-400 flex items-center mt-2">
            <Check className="mr-2 h-4 w-4" />
            Added Successfully!
          </span>
        )}
      </div>
    </>
  )
}


