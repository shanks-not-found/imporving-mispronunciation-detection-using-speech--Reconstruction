"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RecorderProps {
  onAudioReady: (blob: Blob) => void
}

export function Recorder({ onAudioReady }: RecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" })
        onAudioReady(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Unable to access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Audio Recorder</CardTitle>
        <CardDescription>Record your pronunciation directly from your microphone</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-2">Recording Time</div>
            <div className="text-3xl font-mono font-bold">{formatTime(recordingTime)}</div>
          </div>
          <div className="flex gap-2">
            {!isRecording ? (
              <Button onClick={startRecording} size="lg" className="gap-2">
                <span>🎤</span> Start Recording
              </Button>
            ) : (
              <Button onClick={stopRecording} size="lg" variant="destructive" className="gap-2">
                <span>⏹</span> Stop Recording
              </Button>
            )}
          </div>
        </div>

        {/* Waveform placeholder */}
        <div className="h-24 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            {isRecording ? (
              <div className="space-y-2">
                <div className="animate-pulse text-red-500 text-2xl">●</div>
                <div className="text-sm">Recording...</div>
              </div>
            ) : (
              <div className="text-sm">Waveform visualization will appear here</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
