import { Button } from "@/components/ui/button.tsx"
import { Dispatch, FC, SetStateAction } from "react"
import { FaExclamationTriangle } from "react-icons/fa"

interface VideoInterviewPreQuestionProps {
  questionIndex: number
  totalAttempt: number
  timeToPrepare: number
  timeToAnswer: number
  setRecordState: Dispatch<SetStateAction<"pre" | "detail" | "post">>
}

export const VideoInterviewPreQuestion: FC<VideoInterviewPreQuestionProps> = ({
  questionIndex,
  totalAttempt,
  timeToAnswer,
  timeToPrepare,
  setRecordState,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col items-center justify-center gap-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Question {questionIndex}</h2>
        <p className="text-gray-600">
          Please review the details before starting
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-6 w-full bg-iWhiteHover p-6 rounded-xl shadow-sm">
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Maximum Attempts</p>
          <p className="text-2xl font-semibold">{totalAttempt}</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Preparation Time</p>
          <p className="text-2xl font-semibold">{timeToPrepare}s</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Answer Time</p>
          <p className="text-2xl font-semibold">{timeToAnswer}s</p>
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
        onClick={() => setRecordState("detail")}
        className="w-full max-w-xs py-3 text-lg font-semibold"
      >
        Start Question
      </Button>
    </div>
  )
}
