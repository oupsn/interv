import { useEffect, useState } from "react"
import VideoInterviewSetupDeviceSetup from "@/pages/room/videoInterview/components/VideoInterviewSetupDeviceSetup.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { useGetVideoInterviewContext } from "@/hooks/useGetVideoInterviewContext.ts"
import VideoInterviewQuestionPanel from "@/pages/room/videoInterview/components/VideoInterviewQuestionPanel.tsx"
import { cn } from "@/lib/utils.ts"
import { VideoInterviewFinish } from "@/pages/room/videoInterview/components/VideoInterviewFinish.tsx"
import TopBar from "@/components/layout/TopBar"
import VideoInterviewInstruction from "./components/VIdeoInterviewInstruction"
import { useGetRoomContext } from "@/hooks/useGetRoomContext.ts"
import { Spinner } from "@/components/ui/spinner.tsx"
import { FaCheckCircle } from "react-icons/fa"

const VideoInterviewPage = () => {
  const { roomId } = useParams()
  const [activeQuestion, setActiveQuestion] = useState(0) // 0 for setup
  const { data } = useGetVideoInterviewContext(roomId!)
  const { data: roomContextData, isLoading: isRoomContextLoading } =
    useGetRoomContext(roomId!)
  const navigate = useNavigate()

  /*  const isActive = (id: number) => {
    return activeQuestion == id
  } */

  const handleNextQuestion = (overwriteActiveQuestion?: number) => {
    if (overwriteActiveQuestion) {
      setActiveQuestion(overwriteActiveQuestion)
      return
    }
    setActiveQuestion((prev) => prev + 1)
  }

  useEffect(() => {
    const handleClose = (e: { preventDefault: () => void }) => {
      e.preventDefault()
    }

    window.addEventListener("beforeunload", handleClose)

    return () => {
      window.removeEventListener("beforeunload", handleClose)
    }
  }, [])

  const renderVideoInterviewByStage = () => {
    if (activeQuestion == 0) {
      return (
        <div className="flex flex-row w-full h-full overflow-y-hidden">
          <VideoInterviewInstruction
            questionLength={data?.data?.totalQuestions ?? 0}
          />
          <VideoInterviewSetupDeviceSetup
            handleNextQuestion={handleNextQuestion}
          />
        </div>
      )
    }

    if (activeQuestion == (data?.data?.totalQuestions ?? 0) + 1) {
      return <VideoInterviewFinish />
    } else {
      return (
        <div className="flex flex-col gap-8 w-full justify-center h-full relative overflow-hidden">
          <VideoInterviewQuestionPanel
            questionId={
              data!.data!.questionSetting[activeQuestion - 1].questionId
            }
            questionIndex={activeQuestion}
            totalAttempt={
              data!.data!.questionSetting[activeQuestion - 1].totalAttempt
            }
            timeToPrepare={
              data!.data!.questionSetting[activeQuestion - 1].timeToPrepare
            }
            timeToAnswer={
              data!.data!.questionSetting[activeQuestion - 1].timeToAnswer
            }
            handleNextQuestion={handleNextQuestion}
          />

          {/* Question Navigation Bar */}
          <div className="flex justify-center gap-2 p-4">
            {Array.from({ length: data?.data?.totalQuestions ?? 0 }).map(
              (_item, index) => (
                <button
                  key={index}
                  disabled={
                    index + 1 > activeQuestion || index + 1 < activeQuestion
                  }
                  className={cn(
                    "w-10 h-10 rounded-md border-2",
                    "flex items-center justify-center",
                    "transition-all duration-200",
                    index + 1 === activeQuestion
                      ? "bg-primary text-white"
                      : index + 1 < activeQuestion
                        ? "border-gray-300 bg-gray-300 text-white cursor-not-allowed"
                        : "border-gray-300 text-gray-300 cursor-not-allowed",
                  )}
                >
                  {index + 1}
                </button>
              ),
            )}
          </div>
        </div>
      )
    }
  }

  if (isRoomContextLoading) {
    return (
      <div className={"flex w-full justify-center items-center"}>
        <Spinner size="lg" />
      </div>
    )
  }

  if (roomContextData?.data?.isVideoDone ?? true) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
          <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Congratulations!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            You've completed the video interview.
          </p>

          <button
            onClick={() => navigate(`/room/${roomId}`)}
            className="bg-primary text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Return to interview room
          </button>
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col w-dvw h-dvh">
      <TopBar></TopBar>
      {/* <SideBar>
        <SideBarItem
          title={"Setup"}
          isActive={isActive(0)}
          className={cn(0 < activeQuestion ? "disabled:opacity-30" : "")}
        />
        {Array.from({ length: data?.data?.totalQuestions ?? 0 }).map(
          (_item, index) => (
            <SideBarItem
              className={cn(
                index + 1 < activeQuestion ? "disabled:opacity-30" : "",
              )}
              key={index}
              title={"Question " + (index + 1)}
              isActive={isActive(index + 1)}
            />
          ),
        )}
        <SideBarItem
          title={"Finish"}
          isActive={isActive((data?.data?.totalQuestions ?? 0) + 1)}
        />
      </SideBar> */}
      <div className={"flex h-full flex-col justify-center items-center"}>
        {renderVideoInterviewByStage()}
      </div>
    </div>
  )
}

export default VideoInterviewPage
