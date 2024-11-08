import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface VideoInterviewQuestionTimeRemainingProps {
  timeToPrepare: number
  timeToAnswer: number
  startRecording: () => void
  stopRecording: () => void
  isStarted: boolean
  setIsStarted: Dispatch<SetStateAction<boolean>>
  mediaBlobUrl: string
  setMediaBlob: Dispatch<SetStateAction<string[]>>
  setRecordState: Dispatch<SetStateAction<"pre" | "detail" | "post">>
  setAttemptLeft: Dispatch<SetStateAction<number>>
  questionId: number
}

export const VideoInterviewQuestionTimeRemain: FC<
  VideoInterviewQuestionTimeRemainingProps
> = ({
  timeToPrepare,
  timeToAnswer,
  isStarted,
  setIsStarted,
  startRecording,
  stopRecording,
  mediaBlobUrl,
  setMediaBlob,
  setRecordState,
  setAttemptLeft,
}) => {
  const [timeToPrepareRemain, setTimeToPrepareRemain] = useState(timeToPrepare)
  const [timeToAnswerRemain, setTimeToAnswerRemain] = useState(timeToAnswer)

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeToPrepareRemain > 0) {
        setTimeToPrepareRemain((prev) => prev - 1)
      } else {
        clearInterval(intervalId)
        startRecording()
        setIsStarted(true)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeToPrepareRemain])

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (isStarted) {
      const intervalId = setInterval(() => {
        if (timeToAnswerRemain > 0) {
          setTimeToAnswerRemain((prev) => prev - 1)
        } else {
          stopRecording()
          setAttemptLeft((prev) => prev - 1)
          clearInterval(intervalId)
        }
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [isStarted, timeToAnswerRemain])

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (mediaBlobUrl) {
      setMediaBlob((prev) => {
        setRecordState("post")
        return [...prev, mediaBlobUrl]
      })
    }
  }, [mediaBlobUrl])
  return (
    <div className="flex flex-col items-center space-y-2">
      {isStarted ? (
        <>
          <p className="text-xl font-semibold">Recording in Progress</p>
          <p className="text-lg">
            Time Remaining:{" "}
            <span
              className={cn(
                "font-bold text-2xl text-primary",
                timeToAnswerRemain < 3 && "text-red-500",
              )}
            >
              {timeToAnswerRemain}s
            </span>
          </p>
        </>
      ) : (
        <>
          <p className="text-xl font-semibold">Preparation Time</p>
          <p className="text-lg">
            Recording starts in{" "}
            <span
              className={cn(
                "font-bold text-2xl text-primary",
                timeToPrepareRemain < 3 && "text-red-500",
              )}
            >
              {timeToPrepareRemain}s
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Get ready to answer the question
          </p>
        </>
      )}
    </div>
  )
}
