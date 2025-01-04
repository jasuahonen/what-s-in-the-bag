'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle, Check, Upload } from 'lucide-react'
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
      setShowSuccess(false)

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
      setShowSuccess(true)

      // Just refresh the router, don't reload the page
      router.refresh()

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Upload error:', error)
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
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
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
        <DialogContent className="bg-gray-900 text-gray-100 border-gray-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-yellow-400 mb-4">
              Before You Add Your Golf Bag
            </DialogTitle>
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
      {showSuccess && (
        <span className="text-green-400 flex items-center">
          <Check className="mr-2 h-4 w-4" />
          Added Successfully!
        </span>
      )}
    </>
  )
}


