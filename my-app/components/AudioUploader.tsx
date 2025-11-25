"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AudioUploaderProps {
  onFileSelected: (file: File) => void
}

export function AudioUploader({ onFileSelected }: AudioUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const validTypes = ["audio/wav", "audio/mpeg", "audio/mp3"]
      if (!validTypes.includes(file.type)) {
        alert("Please upload a .wav or .mp3 file")
        return
      }
      setSelectedFile(file)
      onFileSelected(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add("border-primary")
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-primary")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-primary")
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const validTypes = ["audio/wav", "audio/mpeg", "audio/mp3"]
      if (!validTypes.includes(file.type)) {
        alert("Please upload a .wav or .mp3 file")
        return
      }
      setSelectedFile(file)
      onFileSelected(file)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Audio Upload</CardTitle>
        <CardDescription>Upload a .wav or .mp3 file for analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".wav,.mp3,audio/wav,audio/mpeg,audio/mp3"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="space-y-2">
            <div className="text-3xl">📁</div>
            <div>
              <p className="font-medium">Drag and drop your audio file here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>
            <p className="text-xs text-muted-foreground">Supported formats: .wav, .mp3</p>
          </div>
        </div>

        {selectedFile && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">Selected file:</p>
            <p className="text-sm text-muted-foreground break-words">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground mt-1">Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        {selectedFile && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Preview</label>
            <audio controls className="w-full">
              <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
