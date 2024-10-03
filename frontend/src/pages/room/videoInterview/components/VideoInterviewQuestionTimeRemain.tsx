import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

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
    <>
      {timeToPrepareRemain == 0 ? (
        <p className={"text-xl font-semibold"}>
          Time remaining: {timeToAnswerRemain}
        </p>
      ) : (
        <p className={"text-xl font-semibold opacity-100"}>
          Start record in {timeToPrepareRemain}
        </p>
      )}
    </>
  )
}
