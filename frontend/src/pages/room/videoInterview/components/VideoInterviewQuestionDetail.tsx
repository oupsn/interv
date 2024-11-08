import { useGetVideoInterviewQuestion } from "@/hooks/useGetVideoInterviewQuestion.ts"
import { Dispatch, FC, SetStateAction, useContext, useState } from "react"
import { DeviceContext } from "@/contexts/device.tsx"
import { useReactMediaRecorder } from "react-media-recorder-2"
import { VideoPreviewStream } from "@/pages/room/videoInterview/components/VideoPreviewStream.tsx"
import { VideoInterviewQuestionTimeRemain } from "@/pages/room/videoInterview/components/VideoInterviewQuestionTimeRemain.tsx"
import DOMPurify from "dompurify"
import parse from "html-react-parser"
import { Clock } from "lucide-react"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button.tsx"

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
      {" "}
      <div className="flex flex-row justify-center relative w-full h-full">
        <div className="flex flex-col gap-6 w-5/12 p-10 h-full border-l border-gray-200 border-b">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-semibold">
              {questionIndex}
            </span>
            <h2 className="text-2xl font-semibold text-gray-800">
              {parse(cleanDescription)}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Preparation time: {timeToPrepare} seconds</span>
            <span className="mx-2">•</span>
            <span>Answer time: {timeToAnswer} seconds</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2 rounded-md">
              <QuestionMarkCircledIcon className="w-6 h-6 text-primary" />
              <p className="text-sm text-primary">
                Take a moment to gather your thoughts. Remember to speak clearly
                and maintain eye contact with the camera.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 relative items-center justify-center w-7/12 p-10 border-l border-gray-200 border-b ">
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
            questionId={questionId}
          />
          <div
            className={
              "w-full h-full relative flex items-center justify-center"
            }
          >
            {!isStarted ? (
              <div
                className={
                  "flex items-center justify-center bg-white w-full h-full absolute opacity-50"
                }
              ></div>
            ) : null}
            <VideoPreviewStream />
          </div>
          <Button
            disabled={!isStarted}
            onClick={() => {
              stopRecording()
              setAttemptLeft((prev) => prev - 1)
            }}
          >
            Stop recording
          </Button>
        </div>
      </div>
    </>
  )
}

export default VideoInterviewQuestionDetail
