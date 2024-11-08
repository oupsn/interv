import { FC, useState } from "react"
import VideoInterviewQuestionDetail from "@/pages/room/videoInterview/components/VideoInterviewQuestionDetail.tsx"
import { VideoInterviewPreQuestion } from "@/pages/room/videoInterview/components/VideoInterviewPreQuestion.tsx"
import { VideoInterviewPostQuestion } from "@/pages/room/videoInterview/components/VideoInterviewPostQuestion.tsx"
import { useGetRoomHistory } from "@/hooks/useGetRoomHistory.ts"
import { useParams } from "react-router-dom"
import { Spinner } from "@/components/ui/spinner.tsx"

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
  const { roomId } = useParams()
  const { data, isLoading } = useGetRoomHistory(roomId!, questionId)
  const [mediaBlob, setMediaBlob] = useState<string[]>([])
  // const [attemptLeft, setAttemptLeft] = useState(
  //   data?.data?.currentAttemptLeft ?? 0,
  // )
  const [recordState, setRecordState] = useState<"pre" | "detail" | "post">(
    "pre",
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" />
      </div>
    )
  }

  if (data?.data?.shouldSkipQuestion && recordState == "pre") {
    handleNextQuestion()
  }

  if (recordState == "pre") {
    return (
      <VideoInterviewPreQuestion
        questionId={questionId}
        roomId={roomId ?? ""}
        questionIndex={questionIndex}
        currentAttemptLeft={data?.data?.currentAttemptLeft ?? 0}
        totalAttempt={totalAttempt}
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
        setAttemptLeft={() => {}}
      />
    )
  }

  if (recordState == "post") {
    return (
      <VideoInterviewPostQuestion
        attemptLeft={data?.data?.currentAttemptLeft ?? 0}
        mediaBlob={mediaBlob}
        setRecordState={setRecordState}
        handleNextQuestion={handleNextQuestion}
        setMediaBlob={setMediaBlob}
        questionId={questionId}
        totalAttempt={totalAttempt}
      />
    )
  }
}

export default VideoInterviewQuestionPanel
