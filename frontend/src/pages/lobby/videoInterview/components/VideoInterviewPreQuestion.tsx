import { Button } from "@/components/ui/button.tsx"
import { Dispatch, FC, SetStateAction } from "react"

interface VideoInterviewPreQuestionProps {
  questionIndex: number
  maxRetry: number
  timeToPrepare: number
  timeToAnswer: number
  setRecordState: Dispatch<SetStateAction<"pre" | "detail" | "post">>
}

export const VideoInterviewPreQuestion: FC<VideoInterviewPreQuestionProps> = ({
  questionIndex,
  maxRetry,
  timeToAnswer,
  timeToPrepare,
  setRecordState,
}) => {
  return (
    <>
      <p className={"text-2xl font-semibold"}>Question {questionIndex}</p>
      <div className={"flex gap-8 bg-iWhiteHover p-4 rounded-xl"}>
        <div>
          <p className={"text-xl font-semibold"}>Max retry</p>
          <p className={"text-xl text-center"}>{maxRetry}</p>
        </div>
        <div>
          <p className={"text-xl font-semibold"}>Time to prepare</p>
          <p className={"text-xl text-center"}>{timeToPrepare} seconds</p>
        </div>
        <div>
          <p className={"text-xl font-semibold"}>Time to answer</p>
          <p className={"text-xl text-center"}>{timeToAnswer} seconds</p>
        </div>
      </div>
      <Button onClick={() => setRecordState("detail")}>Start</Button>
      <p className={"font-semibold"}>
        Notes: The preparation time will start immediately once you start the
        question.
      </p>
    </>
  )
}
