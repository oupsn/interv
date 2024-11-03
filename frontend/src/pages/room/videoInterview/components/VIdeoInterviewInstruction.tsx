import React, { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react"
import { CandidateContext } from "@/contexts/candidate"

interface VideoInterviewInstructionProps {
  questionLength: number
}

const VideoInterviewInstruction: React.FC<VideoInterviewInstructionProps> = ({
  questionLength,
}) => {
  const { roomId } = useParams()
  const { candidateName } = useContext(CandidateContext)

  return (
    <div className="flex flex-col w-full h-full items-start rounded-lg shadow-md px-16 py-4">
      <Link to={"/room/" + roomId}>
        <div className="flex flex-row items-center justify-center gap-2 text-gray-500">
          <ArrowLeftIcon className="w-3 h-3" />
          <span className="text-sm font-normal">Back</span>
        </div>
      </Link>
      <div className="flex flex-col items-start justify-start mt-4">
        <h1 className="text-2xl">Hello, {candidateName}</h1>
        <p className="text-md">
          Welcome to the{" "}
          <span className="font-semibold text-primary">video interview</span>.
          Please follow the instructions and guidelines provided.
        </p>
      </div>
      <div className="flex flex-col items-start justify-start mt-4 gap-2">
        <h2 className="text-md font-bold">Few things before you start</h2>
        <ul className="list-disc list-inside space-y-2 text-left">
          <li className="text-md">
            This interview consists of{" "}
            <strong>{questionLength} question(s).</strong>
          </li>
          <li className="text-md">Each question has a time limit to answer.</li>
          <li className="text-md">
            Your responses will be recorded for review.
          </li>
          <li className="text-md">
            The interview process includes:
            <ol className="list-decimal list-inside ml-4 mt-2 space-y-2">
              <li>Reading the question carefully</li>
              <li>Preparing your answer within the given time</li>
              <li>Recording your response</li>
              <li>
                If you finish earlier, you can stop recording and review your
                response.
              </li>
              <li>Reviewing your recording</li>
              <li>You can retake the recording if the option is available.</li>
              <li>Submitting and moving to the next question</li>
            </ol>
          </li>
          <li className="text-md">
            If you disconnect from the interview, you can resume from your last
            answered question.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default VideoInterviewInstruction
