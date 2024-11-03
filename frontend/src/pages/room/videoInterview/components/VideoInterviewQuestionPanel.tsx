import { FC, useEffect, useState } from "react"
import VideoInterviewQuestionDetail from "@/pages/room/videoInterview/components/VideoInterviewQuestionDetail.tsx"
import { VideoInterviewPreQuestion } from "@/pages/room/videoInterview/components/VideoInterviewPreQuestion.tsx"
import { VideoInterviewPostQuestion } from "@/pages/room/videoInterview/components/VideoInterviewPostQuestion.tsx"
import Cookies from "js-cookie"

interface VideoInterviewQuestionPanelProps {
  questionId: number
  questionIndex: number
  totalAttempt: number
  timeToPrepare: number
  timeToAnswer: number
  handleNextQuestion: () => void
}
const VideoInterviewQuestionPanel: FC<VideoInterviewQuestionPanelProps> = ({
  questionId,
  questionIndex,
  totalAttempt,
  timeToPrepare,
  timeToAnswer,
  handleNextQuestion,
}) => {
  const [mediaBlob, setMediaBlob] = useState<string[]>([])
  const [attemptLeft, setAttemptLeft] = useState(
    totalAttempt - Number(Cookies.get("r_" + questionId.toString()) ?? "0"),
  )
  const [recordState, setRecordState] = useState<"pre" | "detail" | "post">(
    "pre",
  )

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    setAttemptLeft(
      totalAttempt - Number(Cookies.get("r_" + questionId.toString()) ?? "0"),
    )
  }, [questionIndex])

  if (recordState == "pre") {
    return (
      <VideoInterviewPreQuestion
        questionIndex={questionIndex}
        totalAttempt={attemptLeft}
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
        setAttemptLeft={setAttemptLeft}
      />
    )
  }

  if (recordState == "post") {
    return (
      <VideoInterviewPostQuestion
        attemptLeft={attemptLeft}
        mediaBlob={mediaBlob}
        setRecordState={setRecordState}
        handleNextQuestion={handleNextQuestion}
        setMediaBlob={setMediaBlob}
        questionId={questionId}
      />
    )
  }
}

export default VideoInterviewQuestionPanel
