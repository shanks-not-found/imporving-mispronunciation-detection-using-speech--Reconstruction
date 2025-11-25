"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { FeedbackData } from "@/lib/api"

interface FeedbackPanelProps {
  feedbackData: FeedbackData | null
  isLoading: boolean
}

export function FeedbackPanel({ feedbackData, isLoading }: FeedbackPanelProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>Detected mispronunciations and corrected speech</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin text-2xl mb-2">⏳</div>
            <p className="text-muted-foreground">Analyzing audio...</p>
          </div>
        ) : !feedbackData ? (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">Backend not connected yet</p>
            <p className="text-xs text-muted-foreground mt-2">Upload or record audio to see analysis results</p>
          </div>
        ) : (
          <>
            {/* Mispronunciations Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Detected Issues</h3>
              {feedbackData.mispronunciations.length > 0 ? (
                <div className="space-y-2">
                  {feedbackData.mispronunciations.map((item, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium">{item.word}</p>
                          <p className="text-sm text-muted-foreground">Timestamp: {item.timestamp.toFixed(2)}s</p>
                        </div>
                        <Badge variant="outline">{(item.confidence * 100).toFixed(0)}% confidence</Badge>
                      </div>
                      <div className="bg-background rounded p-2">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Suggested: </span>
                          <span className="font-mono">{item.suggestion}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">No mispronunciations detected</p>
              )}
            </div>

            {/* Corrected Speech Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Corrected Speech</h3>
              <div className="p-3 bg-muted rounded-lg">
                {feedbackData.correctedAudioUrl ? (
                  <audio controls className="w-full">
                    <source src={feedbackData.correctedAudioUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Corrected audio will appear here after backend processes the audio
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Phoneme Markers Placeholder */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Phoneme Timeline</h3>
              <div className="h-16 bg-muted rounded-lg flex items-center px-4">
                <div className="text-sm text-muted-foreground">
                  Timeline visualization will be rendered here by the backend
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
