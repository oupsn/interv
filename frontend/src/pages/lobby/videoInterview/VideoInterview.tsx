import { useState } from "react"
import SideBar from "@/components/layout/SideBar.tsx"
import SideBarItem from "@/components/layout/SideBarItem.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"
import VideoInterviewSetupDeviceSetup from "@/pages/lobby/videoInterview/components/VideoInterviewSetupDeviceSetup.tsx"
import { useParams } from "react-router-dom"
import { useGetVideoInterviewContext } from "@/hooks/useGetVideoInterviewContext.ts"
import VideoInterviewQuestionPanel from "@/pages/lobby/videoInterview/components/VideoInterviewQuestionPanel.tsx"
import { cn } from "@/lib/utils.ts"
import { VideoInterviewFinish } from "@/pages/lobby/videoInterview/components/VideoInterviewFinish.tsx"

const VideoInterviewPage = () => {
  const { lobbyId } = useParams() // TODO: add swr for fetching interview data
  const [activeQuestion, setActiveQuestion] = useState(0) // 0 for setup
  const { data } = useGetVideoInterviewContext(lobbyId ?? "")
  const isActive = (id: number) => {
    return activeQuestion == id
  }

  const handleNextQuestion = () => {
    setActiveQuestion((prev) => prev + 1)
  }

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
          lobbyId={lobbyId ?? ""}
          questionIndex={activeQuestion}
          maxRetry={data?.data?.questionSetting[activeQuestion - 1].retry ?? 0}
          timeToPrepare={
            data?.data?.questionSetting[activeQuestion - 1].timeToPrepare ?? 0
          }
          timeToAnswer={
            data?.data?.questionSetting[activeQuestion - 1].timeToAnswer ?? 0
          }
          handleNextQuestion={handleNextQuestion}
        />
      )
    }
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
      <MainPanel className={"flex flex-col justify-center items-center gap-8"}>
        {renderVideoInterviewByStage()}
      </MainPanel>
    </>
  )
}

export default VideoInterviewPage
