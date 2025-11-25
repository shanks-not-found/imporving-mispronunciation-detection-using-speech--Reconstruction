"use client"

import { useState } from "react"
import { Recorder } from "@/components/Recorder"
import { AudioUploader } from "@/components/AudioUploader"
import { FeedbackPanel } from "@/components/FeedbackPanel"
import { Button } from "@/components/ui/button"
import { sendAudio, sendAudioFile, type FeedbackData } from "@/lib/api"

export default function Home() {
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleAudioReady = async (blob: Blob) => {
    setRecordedAudio(blob)
    setUploadedFile(null)
    // TODO: Automatically send to backend when audio recording completes
    // await procesAudio(blob);
  }

  const handleFileSelected = (file: File) => {
    setUploadedFile(file)
    setRecordedAudio(null)
    // TODO: Automatically send to backend when file is selected
    // await processFile(file);
  }

  const handleAnalyze = async () => {
    setIsLoading(true)
    try {
      let feedback: FeedbackData

      if (recordedAudio) {
        // TODO: Replace with actual backend API call
        feedback = await sendAudio(recordedAudio)
      } else if (uploadedFile) {
        // TODO: Replace with actual backend API call
        feedback = await sendAudioFile(uploadedFile)
      } else {
        alert("Please record or upload audio first")
        setIsLoading(false)
        return
      }

      setFeedbackData(feedback)
    } catch (error) {
      console.error("Error processing audio:", error)
      alert("Error processing audio. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFeedbackData(null)
    setRecordedAudio(null)
    setUploadedFile(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Pronunciation Improver</h1>
          <p className="text-lg text-muted-foreground">
            Improving Mispronunciation Detection Using Speech Reconstruction
          </p>
          <p className="text-sm text-muted-foreground mt-4">A research project frontend for audio analysis</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Input Methods */}
          <div className="lg:col-span-2 space-y-6">
            <Recorder onAudioReady={handleAudioReady} />
            <AudioUploader onFileSelected={handleFileSelected} />

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleAnalyze} size="lg" disabled={!recordedAudio && !uploadedFile} className="flex-1">
                Analyze Audio
              </Button>
              <Button
                onClick={handleReset}
                size="lg"
                variant="outline"
                disabled={!recordedAudio && !uploadedFile && !feedbackData}
              >
                Reset
              </Button>
            </div>

            {/* Status */}
            {(recordedAudio || uploadedFile) && !feedbackData && (
              <div className="p-4 bg-muted rounded-lg text-sm">
                <p>
                  {recordedAudio && "✓ Recording ready for analysis"}
                  {uploadedFile && `✓ File "${uploadedFile.name}" ready for analysis`}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Feedback Panel */}
          <div className="lg:col-span-1">
            <FeedbackPanel feedbackData={feedbackData} isLoading={isLoading} />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> This is a frontend-only prototype. All backend API endpoints are marked as TODO. To
            integrate your FastAPI backend, update the functions in{" "}
            <code className="bg-muted px-1 rounded">lib/api.ts</code> with your actual API endpoints.
          </p>
        </div>
      </div>
    </main>
  )
}
