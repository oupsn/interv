import { useEffect, useState } from "react"
import SideBar from "@/components/layout/SideBar.tsx"
import SideBarItem from "@/components/layout/SideBarItem.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"
import VideoInterviewSetupDeviceSetup from "@/pages/room/videoInterview/components/VideoInterviewSetupDeviceSetup.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { useGetVideoInterviewContext } from "@/hooks/useGetVideoInterviewContext.ts"
import VideoInterviewQuestionPanel from "@/pages/room/videoInterview/components/VideoInterviewQuestionPanel.tsx"
import { cn } from "@/lib/utils.ts"
import { VideoInterviewFinish } from "@/pages/room/videoInterview/components/VideoInterviewFinish.tsx"
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

  const isActive = (id: number) => {
    return activeQuestion == id
  }

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
        <VideoInterviewSetupDeviceSetup
          handleNextQuestion={handleNextQuestion}
        />
      )
    }

    if (activeQuestion == (data?.data?.totalQuestions ?? 0) + 1) {
      return <VideoInterviewFinish />
    } else {
      return (
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
    <>
      <SideBar>
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
      </SideBar>
      <MainPanel className={"flex flex-col justify-center items-center"}>
        {renderVideoInterviewByStage()}
      </MainPanel>
    </>
  )
}

export default VideoInterviewPage
