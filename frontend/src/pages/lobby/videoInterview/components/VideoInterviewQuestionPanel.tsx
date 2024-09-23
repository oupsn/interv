import { FC, useEffect, useState } from "react"
import VideoInterviewQuestionDetail from "@/pages/lobby/videoInterview/components/VideoInterviewQuestionDetail.tsx"
import { VideoInterviewPreQuestion } from "@/pages/lobby/videoInterview/components/VideoInterviewPreQuestion.tsx"
import { VideoInterviewPostQuestion } from "@/pages/lobby/videoInterview/components/VideoInterviewPostQuestion.tsx"

interface VideoInterviewQuestionPanelProps {
  questionId: number
  questionIndex: number
  maxRetry: number
  timeToPrepare: number
  timeToAnswer: number
  handleNextQuestion: () => void
}
const VideoInterviewQuestionPanel: FC<VideoInterviewQuestionPanelProps> = ({
  questionId,
  questionIndex,
  maxRetry,
  timeToPrepare,
  timeToAnswer,
  handleNextQuestion,
}) => {
  const [mediaBlob, setMediaBlob] = useState<string[]>([])
  const [retryLeft, setRetryLeft] = useState(maxRetry)
  const [recordState, setRecordState] = useState<"pre" | "detail" | "post">(
    "pre",
  )

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    setRetryLeft(maxRetry)
  }, [questionIndex])

  if (recordState == "pre") {
    return (
      <VideoInterviewPreQuestion
        questionIndex={questionIndex}
        maxRetry={maxRetry}
        timeToPrepare={timeToPrepare}
        timeToAnswer={timeToAnswer}
        setRecordState={setRecordState}
      />
    )
  }

  if (recordState == "detail") {
    return (
      <VideoInterviewQuestionDetail
        questionId={questionId}
        questionIndex={questionIndex}
        timeToPrepare={timeToPrepare}
        timeToAnswer={timeToAnswer}
        setMediaBlob={setMediaBlob}
        setRecordState={setRecordState}
        setRetryLeft={setRetryLeft}
      />
    )
  }

  if (recordState == "post") {
    return (
      <VideoInterviewPostQuestion
        retryLeft={retryLeft}
        mediaBlob={mediaBlob}
        setRecordState={setRecordState}
        handleNextQuestion={handleNextQuestion}
        setMediaBlob={setMediaBlob}
      />
    )
  }
}

export default VideoInterviewQuestionPanel
