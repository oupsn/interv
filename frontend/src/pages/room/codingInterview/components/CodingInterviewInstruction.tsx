import React, { useContext, useEffect } from "react"
import { LoadingContext } from "@/contexts/loading"
import CodingInterviewDeviceSetup from "./CodingInterviewDeviceSetup"
import { StatusMessages } from "react-media-recorder-2"
import useCurrentUser from "@/hooks/UseCurrentUser"
import { Link, useParams } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react"

interface CodingInterviewInstructionProps {
  title: string
  description: string
  questionLength: number
  timeRemain: number
  clickStart: () => void
  previewVideoStream: MediaStream | null
  previewScreenStream: MediaStream | null
  videoStatus: StatusMessages
  screenStatus: StatusMessages
  videoError: string
  screenError: string
}

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours} hour${hours !== 1 ? "s" : ""} ${
    minutes !== 0 ? `${minutes} ${minutes !== 1 ? "minutes" : "minute"}` : ""
  }`
}

const CodingInterviewInstruction: React.FC<CodingInterviewInstructionProps> = ({
  questionLength,
  timeRemain,
  clickStart,
  previewVideoStream,
  previewScreenStream,
  videoStatus,
  screenStatus,
  videoError,
  screenError,
}) => {
  const { setLoading } = useContext(LoadingContext)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [setLoading])

  const { currentUser } = useCurrentUser()
  const { roomId } = useParams()
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col items-start justify-start w-full h-full p-16  rounded-lg shadow-md">
          <Link to={"/room/" + roomId}>
            <div className="flex flex-row items-center justify-center gap-2 text-gray-500">
              <ArrowLeftIcon className="w-3 h-3" />
              <span className="text-sm font-normal">Back</span>
            </div>
          </Link>
          <h1 className="text-2xl  mb-4">Hello, {currentUser?.name}</h1>
          <p className="text-md mb-4">
            Welcome to the coding interview. Please follow the instructions and
            guidelines provided.
          </p>
          <h2 className="text-md font-bold mb-4">
            Few things before you start
          </h2>
          <ul className="list-disc list-inside space-y-2 text-left">
            <li className="text-md">
              This interview consists of{" "}
              <strong>{questionLength} question(s).</strong>
            </li>
            <li className="text-md">
              You have <strong>{formatTime(timeRemain)}</strong> to complete the
              interview.
            </li>
            <li className="text-md">
              You can code in <strong>Python</strong>, <strong>Java</strong>, or{" "}
              <strong>C</strong>.
            </li>
            <li className="text-md">
              For Python, you have access to mlxtend, numpy, pandas, scipy, and
              sklearn libraries.
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
          <span className="text-md text-gray-500 mt-4">
            <strong>Note:</strong> You need to setup your camera and screen
            before clicking the start button. If it does not work, please
            refresh the page.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-8  rounded-lg shadow-md gap-16">
          <span className="text-xl font-bold">Device Setup</span>
          <CodingInterviewDeviceSetup
            handleClickStart={() => {
              clickStart()
            }}
            previewVideoStream={previewVideoStream}
            previewScreenStream={previewScreenStream}
            mediaStatus={videoStatus}
            screenStatus={screenStatus}
            mediaError={videoError}
            screenError={screenError}
          />
        </div>
      </div>
    </>
  )
}

export default CodingInterviewInstruction
