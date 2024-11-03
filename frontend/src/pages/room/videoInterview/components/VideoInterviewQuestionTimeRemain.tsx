import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import Cookies from "js-cookie"
import dayjs from "dayjs"

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
  questionId,
}) => {
  const [isTtpSynced, setIsTtpSynced] = useState(false)
  const [isTtaSynced, setIsTtaSynced] = useState(false)
  const [timeToPrepareRemain, setTimeToPrepareRemain] = useState(
    Math.round(
      timeToPrepare +
        dayjs(Cookies.get("p_" + questionId.toString())).diff() / 1000,
    ),
  )
  const [timeToAnswerRemain, setTimeToAnswerRemain] = useState(
    Math.round(
      timeToAnswer +
        dayjs(Cookies.get("a_" + questionId.toString())).diff() / 1000,
    ),
  )

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (!Cookies.get("p_" + questionId.toString())) {
      Cookies.set("p_" + questionId.toString(), dayjs().toISOString())
    }
    if (!isTtpSynced && timeToPrepareRemain < 3) {
      setTimeToPrepareRemain(5)
      setIsTtpSynced(true)
    }
    if (!isTtpSynced && timeToPrepareRemain > 3) {
      setIsTtpSynced(true)
    }
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
      if (!Cookies.get("a_" + questionId.toString())) {
        Cookies.set("a_" + questionId.toString(), dayjs().toISOString())
      }
      if (!isTtaSynced && timeToAnswerRemain > 10) {
        setIsTtaSynced(true)
      }
      if (!isTtaSynced && timeToAnswerRemain < 10) {
        setTimeToAnswerRemain(10)
        setIsTtaSynced(true)
      }
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
      {isStarted ? (
        <div className={"flex flex-col items-center gap-4"}>
          <p className={"text-xl font-semibold"}>Time remaining</p>
          <p className={"text-3xl font-semibold opacity-100"}>
            {timeToAnswerRemain}
          </p>
        </div>
      ) : (
        <div className={"flex flex-col items-center gap-4"}>
          <p className={"text-xl font-semibold opacity-100"}>Start record in</p>
          <p className={"text-3xl font-semibold opacity-100"}>
            {timeToPrepareRemain}
          </p>
        </div>
      )}
    </>
  )
}
