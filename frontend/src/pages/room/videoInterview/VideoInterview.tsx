import { useEffect, useState } from "react"
import VideoInterviewSetupDeviceSetup from "@/pages/room/videoInterview/components/VideoInterviewSetupDeviceSetup.tsx"
import { useParams } from "react-router-dom"
import { useGetVideoInterviewContext } from "@/hooks/useGetVideoInterviewContext.ts"
import VideoInterviewQuestionPanel from "@/pages/room/videoInterview/components/VideoInterviewQuestionPanel.tsx"
import { cn } from "@/lib/utils.ts"
import { VideoInterviewFinish } from "@/pages/room/videoInterview/components/VideoInterviewFinish.tsx"
import TopBar from "@/components/layout/TopBar"
import VideoInterviewInstruction from "./components/VideoInterviewInstruction"

const VideoInterviewPage = () => {
  const { roomId } = useParams()
  const [activeQuestion, setActiveQuestion] = useState(0) // 0 for setup
  const { data } = useGetVideoInterviewContext(roomId!)

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
        <div className="flex flex-col gap-8 w-full justify-center h-full relative">
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
                  onClick={() => handleNextQuestion(index + 1)}
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
