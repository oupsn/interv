import { useGetVideoInterviewQuestion } from "@/hooks/useGetVideoInterviewQuestion.ts"
import { Dispatch, FC, SetStateAction, useContext, useState } from "react"
import { DeviceContext } from "@/contexts/device.tsx"
import { useReactMediaRecorder } from "react-media-recorder-2"
import { VideoPreviewStream } from "@/pages/room/videoInterview/components/VideoPreviewStream.tsx"
import { VideoInterviewQuestionTimeRemain } from "@/pages/room/videoInterview/components/VideoInterviewQuestionTimeRemain.tsx"
import DOMPurify from "dompurify"
import parse from "html-react-parser"

interface VideoInterviewQuestionDetailProps {
  questionId: number
  questionIndex: number
  timeToPrepare: number
  timeToAnswer: number
  setMediaBlob: Dispatch<SetStateAction<string[]>>
  setRecordState: Dispatch<SetStateAction<"pre" | "detail" | "post">>
  setAttemptLeft: Dispatch<SetStateAction<number>>
}
const VideoInterviewQuestionDetail: FC<VideoInterviewQuestionDetailProps> = ({
  questionId,
  questionIndex,
  timeToPrepare,
  timeToAnswer,
  setMediaBlob,
  setRecordState,
  setAttemptLeft,
}) => {
  const { data } = useGetVideoInterviewQuestion(questionId)
  const { selectedCameraId, selectedMicrophoneId } = useContext(DeviceContext)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      video: {
        deviceId: selectedCameraId,
      },
      audio: {
        deviceId: selectedMicrophoneId,
      },
    },
  )
  const cleanDescription = DOMPurify.sanitize(data?.data?.question ?? "")

  return (
    <>
      <VideoInterviewQuestionTimeRemain
        timeToPrepare={timeToPrepare}
        timeToAnswer={timeToAnswer}
        startRecording={startRecording}
        stopRecording={stopRecording}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        setMediaBlob={setMediaBlob}
        mediaBlobUrl={mediaBlobUrl ?? ""}
        setRecordState={setRecordState}
        setAttemptLeft={setAttemptLeft}
      />
      <div className={"w-fit h-fit relative"}>
        {!isStarted ? (
          <div
            className={
              "flex items-center justify-center bg-white w-full h-full absolute opacity-50"
            }
          ></div>
        ) : null}
        <VideoPreviewStream />
      </div>
      <p className={"text-2xl font-semibold"}>Question {questionIndex}</p>
      <p className={"text-xl"}>{parse(cleanDescription)}</p>
    </>
  )
}

export default VideoInterviewQuestionDetail
