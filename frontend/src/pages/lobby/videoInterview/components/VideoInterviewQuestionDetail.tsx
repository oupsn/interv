import { useGetVideoInterviewQuestion } from "@/hooks/useGetVideoInterviewQuestion.ts"
import { Dispatch, FC, SetStateAction, useContext, useState } from "react"
import { DeviceContext } from "@/contexts/device.tsx"
import { useReactMediaRecorder } from "react-media-recorder-2"
import { VideoPreviewStream } from "@/pages/lobby/videoInterview/components/VideoPreviewStream.tsx"
import { VideoInterviewQuestionTimeRemain } from "@/pages/lobby/videoInterview/components/VideoInterviewQuestionTimeRemain.tsx"

interface VideoInterviewQuestionDetailProps {
  lobbyId: string
  index: number
  timeToPrepare: number
  timeToAnswer: number
  setMediaBlob: Dispatch<SetStateAction<string[]>>
  setRecordState: Dispatch<SetStateAction<"pre" | "detail" | "post">>
  setRetryLeft: Dispatch<SetStateAction<number>>
}
const VideoInterviewQuestionDetail: FC<VideoInterviewQuestionDetailProps> = ({
  lobbyId,
  index,
  timeToPrepare,
  timeToAnswer,
  setMediaBlob,
  setRecordState,
  setRetryLeft,
}) => {
  const { data } = useGetVideoInterviewQuestion(lobbyId, index)
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
        setRetryLeft={setRetryLeft}
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
      <p className={"text-2xl font-semibold"}>
        Question {data?.data?.questionIndex}
      </p>
      <p className={"text-xl"}>{data?.data?.question}</p>
    </>
  )
}

export default VideoInterviewQuestionDetail
