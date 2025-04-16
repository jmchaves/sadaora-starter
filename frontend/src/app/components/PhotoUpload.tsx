'use client'

import React, { useState } from 'react'
import Loading from './Loading'
import { uploadPhoto } from '@/app/lib/uploadPhoto'

interface PhotoUploadProps {
  token: string
  onUpload: (url: string) => void
}

export default function PhotoUpload({ token, onUpload }: PhotoUploadProps) {
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (!validTypes.includes(file.type)) {
      alert('Only JPG, JPEG, and PNG files are allowed.')
      return
    }

    try {
      setLoading(true)
      const url = await uploadPhoto(file, token)
      onUpload(url)
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <label
        htmlFor="upload-photo"
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
      >
        {loading ? <Loading size={16} /> : 'Change Photo'}
        <input
          id="upload-photo"
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <p className="mt-2 text-xs text-gray-500">JPG or PNG. 1MB max.</p>
    </div>
  )
}
