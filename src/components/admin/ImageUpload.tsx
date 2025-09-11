'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  bucket: 'pessoas' | 'patrocinadores' | 'festival'
  currentImageUrl?: string
  onImageChange: (url: string | null) => void
  className?: string
  accept?: string
  maxSizeMB?: number
}

export default function ImageUpload({ 
  bucket, 
  currentImageUrl, 
  onImageChange,
  className = '',
  accept = 'image/*',
  maxSizeMB = 5
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Apenas arquivos de imagem são permitidos'
    }

    // Check file size
    const maxSize = maxSizeMB * 1024 * 1024 // Convert MB to bytes
    if (file.size > maxSize) {
      return `Arquivo muito grande. Máximo ${maxSizeMB}MB`
    }

    return null
  }

  const uploadFile = async (file: File) => {
    const validation = validateFile(file)
    if (validation) {
      alert(validation)
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', bucket)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      onImageChange(result.url)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Erro ao fazer upload da imagem')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(false)
    
    const file = event.dataTransfer.files[0]
    if (file) {
      uploadFile(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(false)
  }

  const removeImage = async () => {
    if (currentImageUrl) {
      try {
        // Extract file path from URL
        const urlParts = currentImageUrl.split('/')
        const fileName = urlParts[urlParts.length - 1]
        
        // Delete from storage via API
        const response = await fetch(`/api/upload?bucket=${bucket}&path=${fileName}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          const result = await response.json()
          console.error('Error deleting file:', result.error)
        }
      } catch (error) {
        console.error('Error removing image:', error)
      }
    }
    
    onImageChange(null)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {currentImageUrl ? (
        <div className="relative inline-block">
          <Image
            src={currentImageUrl}
            alt="Uploaded image"
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver 
              ? 'border-teal-500 bg-teal-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Enviando...' : 'Selecionar imagem'}
            </button>
            <p className="mt-2 text-xs text-gray-500">
              Ou arraste e solte uma imagem aqui
            </p>
            <p className="text-xs text-gray-400">
              Máximo {maxSizeMB.toString()}MB • PNG, JPG, GIF
            </p>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}