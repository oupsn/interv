import React, { useEffect } from "react"
import CodingInterviewDeviceSetup from "./CodingInterviewDeviceSetup"
import { StatusMessages } from "react-media-recorder-2"
import useCurrentUser from "@/hooks/UseCurrentUser"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeftIcon,
  InfoIcon,
  CheckCircleIcon,
  PlayIcon,
} from "lucide-react"
import { server } from "@/contexts/swr"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CodingInterviewInstructionProps {
  questionLength: number
  timeRemain: number
  clickStart: () => void
  previewVideoStream: MediaStream | null
  previewScreenStream: MediaStream | null
  videoStatus: StatusMessages
  screenStatus: StatusMessages
  videoError: string
  screenError: string
  isCameraRequired: boolean
  isScreenShareRequired: boolean
  wasStarted: boolean
  isTimeUp: boolean
}

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours} hour${hours !== 1 ? "s" : ""} ${
    minutes !== 0 ? `${minutes} ${minutes !== 1 ? "minutes" : "minute"}` : ""
  } ${secs} second${secs !== 1 ? "s" : ""}`
}

const CodingInterviewInstruction: React.FC<CodingInterviewInstructionProps> = ({
  questionLength,
  timeRemain,
  clickStart,
  wasStarted,
  isTimeUp,
  isCameraRequired,
  isScreenShareRequired,
  previewVideoStream,
  previewScreenStream,
  videoStatus,
  screenStatus,
  videoError,
  screenError,
}) => {
  const { currentUser } = useCurrentUser()
  const { roomId } = useParams()

  const [showTimeUpDialog, setShowTimeUpDialog] = React.useState(false)

  useEffect(() => {
    if (isTimeUp) {
      setShowTimeUpDialog(true)
    }
  }, [isTimeUp])

  return (
    <>
      <Dialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Time's Up!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Your allocated time for the interview has expired.</p>
            <button
              onClick={() => {
                setShowTimeUpDialog(false)
                clickStart()
              }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
            >
              Continue to Coding Panel
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-row">
        <div className="flex flex-col items-start justify-start w-full h-full px-16 py-4 rounded-lg shadow-md ">
          <Link to={"/room/" + roomId}>
            <div className="flex flex-row items-center justify-center gap-2 text-gray-500">
              <ArrowLeftIcon className="w-3 h-3" />
              <span className="text-sm font-normal">Back</span>
            </div>
          </Link>
          <div className="flex flex-col items-start justify-start mt-4">
            <h1 className="text-2xl">Hello, {currentUser?.name}</h1>
            <p className="text-md">
              Welcome to the coding interview. Please follow the instructions
              and guidelines provided.
            </p>
          </div>
          <div className="flex flex-col items-start justify-start mt-4 gap-2">
            <h2 className="text-md font-bold">Few things before you start</h2>
            <ul className="list-disc list-inside space-y-2 text-left">
              <li className="text-md">
                This interview consists of{" "}
                <strong>{questionLength} question(s).</strong>
              </li>
              <li className="text-md">
                You have <strong>{formatTime(timeRemain)}</strong> to complete
                the interview.
              </li>
              <li className="text-md">
                You can code in <strong>Python</strong>, <strong>Java</strong>,
                or <strong>C</strong>.
              </li>
              <li className="text-md">
                For Python, you have access to mlxtend, numpy, pandas, scipy,
                and sklearn libraries.
              </li>
              <li className="text-md">
                The coding question is include the input/output processing, you
                need to handle STDIN and STDOUT for each language correctly.
              </li>
              <li className="text-md">
                The interview process includes:
                <ol className="list-decimal list-inside ml-4 mt-2 space-y-2">
                  <li>Reading the question carefully</li>
                  <li>Writing your code in the coding panel</li>
                  <li>Compiling and running your code to see the results</li>
                  <li>Testing your solution with example test cases</li>
                  <li>Submitting your solution</li>
                </ol>
              </li>
              <li className="text-md">
                If you disconnect from the interview, you will continue from the
                same question next time. but the timer will continue to count.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-8  rounded-lg shadow-md gap-16">
          {isCameraRequired || isScreenShareRequired ? (
            <>
              <div className="flex flex-col items-center justify-start gap-2">
                <span className="text-xl font-bold">Device Setup</span>
                <span className="text-md text-gray-500">
                  This interview requires {isCameraRequired ? "camera" : ""}
                  {isCameraRequired && isScreenShareRequired ? " and " : ""}
                  {isScreenShareRequired ? "screen sharing" : ""}
                </span>
              </div>

              <CodingInterviewDeviceSetup
                isCameraRequired={isCameraRequired}
                isScreenShareRequired={isScreenShareRequired}
                handleClickStart={() => {
                  clickStart()
                  if (!wasStarted) {
                    server.codingInterview.createQuestionSnapshot([
                      {
                        room_id: roomId,
                        coding_question_id: 0,
                        language: "",
                        code: "",
                      },
                    ])
                  }
                }}
                previewVideoStream={previewVideoStream}
                previewScreenStream={previewScreenStream}
                mediaStatus={videoStatus}
                screenStatus={screenStatus}
                mediaError={videoError}
                screenError={screenError}
              />
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center gap-6 text-center">
                <span className="text-2xl font-bold">Ready to Begin</span>
                <div className="flex items-center gap-2 text-gray-600">
                  <InfoIcon className="w-5 h-5" />
                  <p className="text-md">
                    This interview does not require camera or screen sharing.
                  </p>
                </div>

                <div className="space-y-4 text-gray-600 max-w-md">
                  <p className="text-md">Make sure you:</p>
                  <ul className="space-y-2 text-left list-none">
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      Have a stable internet connection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      Are in a quiet environment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      Have reviewed the instructions above
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    clickStart()
                    if (!wasStarted) {
                      server.codingInterview.createQuestionSnapshot([
                        {
                          room_id: roomId,
                          coding_question_id: 0,
                          language: "",
                          code: "",
                        },
                      ])
                    }
                  }}
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center gap-2"
                >
                  <PlayIcon className="w-5 h-5" />
                  Start Interview
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CodingInterviewInstruction
