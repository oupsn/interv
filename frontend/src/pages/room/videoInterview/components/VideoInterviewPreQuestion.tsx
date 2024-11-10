import { Button } from "@/components/ui/button.tsx"
import { Dispatch, FC, SetStateAction } from "react"
import {
  FaClock,
  FaExclamationTriangle,
  FaRedoAlt,
  FaStopwatch,
} from "react-icons/fa"
import { server } from "@/contexts/swr.tsx"

interface VideoInterviewPreQuestionProps {
  questionId: number
  roomId: string
  questionIndex: number
  currentAttemptLeft: number
  totalAttempt: number
  timeToPrepare: number
  timeToAnswer: number
  setRecordState: Dispatch<SetStateAction<"pre" | "detail" | "post">>
}

export const VideoInterviewPreQuestion: FC<VideoInterviewPreQuestionProps> = ({
  questionId,
  roomId,
  questionIndex,
  currentAttemptLeft,
  totalAttempt,
  timeToAnswer,
  timeToPrepare,
  setRecordState,
}) => {
  const handleStartQuestion = () => {
    server.room
      .addRoomHistory({
        questionId: questionId,
        roomId: roomId,
      })
      .then(() => {
        setRecordState("detail")
      })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center gap-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Question {questionIndex}</h2>
        <p className="text-gray-600">
          Please review the details before starting
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg">
          <div className="p-3 bg-primary/10 rounded-full">
            <FaClock className="text-xl text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Preparation Time</p>
            <p className="text-lg font-semibold">{timeToPrepare} seconds</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg">
          <div className="p-3 bg-primary/10 rounded-full">
            <FaStopwatch className="text-xl text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Answer Time</p>
            <p className="text-lg font-semibold">{timeToAnswer} seconds</p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg">
            <div className="p-3 bg-primary/10 rounded-full">
              <FaRedoAlt className="text-xl text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Maximum Attempts</p>
              <p className="text-lg font-semibold">
                {currentAttemptLeft}
                <span>
                  /{totalAttempt} {totalAttempt === 1 ? "attempt" : "attempts"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Warning Message */}
      <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3 text-red-700">
        <FaExclamationTriangle className="text-red-500 flex-shrink-0" />
        <p className="text-sm">
          Important: The preparation timer will begin immediately after clicking
          the Start button
        </p>
      </div>

      {/* Action Button */}
      <Button
        onClick={handleStartQuestion}
        className="w-full max-w-xs py-3 text-lg font-semibold"
      >
        Start Question
      </Button>
    </div>
  )
}
