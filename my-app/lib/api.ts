export interface FeedbackData {
  mispronunciations: Array<{
    word: string
    timestamp: number
    suggestion: string
    confidence: number
  }>
  correctedAudioUrl: string
}

// TODO: Replace with actual API call to backend
export async function sendAudio(audioBlob: Blob): Promise<FeedbackData> {
  console.log("[TODO] sendAudio called with blob:", audioBlob)

  // Placeholder: return mock data
  return {
    mispronunciations: [
      {
        word: "pronunciation",
        timestamp: 1.2,
        suggestion: "pruh-nun-see-ay-shun",
        confidence: 0.85,
      },
      {
        word: "detection",
        timestamp: 3.5,
        suggestion: "dih-tek-shun",
        confidence: 0.92,
      },
    ],
    correctedAudioUrl: "", // Will be populated by backend
  }
}

// TODO: Replace with actual API call to backend
export async function sendAudioFile(file: File): Promise<FeedbackData> {
  console.log("[TODO] sendAudioFile called with file:", file)

  // Placeholder: return mock data
  return {
    mispronunciations: [
      {
        word: "example",
        timestamp: 0.8,
        suggestion: "eg-zam-pul",
        confidence: 0.88,
      },
    ],
    correctedAudioUrl: "",
  }
}

// TODO: Replace with actual API call to backend
export async function getFeedback(audioId: string): Promise<FeedbackData> {
  console.log("[TODO] getFeedback called with audioId:", audioId)

  return {
    mispronunciations: [],
    correctedAudioUrl: "",
  }
}
