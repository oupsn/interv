import { useState } from "react"
import IntervLogo from "@/assets/intervLOGGOG.png"
import SideBar from "@/pages/lobby/components/SideBar.tsx"
import SideBarItem from "@/pages/lobby/components/SideBarItem.tsx"
import VideoInterviewContentLayout from "@/pages/lobby/videoInterview/components/VideoInterviewContentLayout.tsx"
import { useReactMediaRecorder } from "react-media-recorder-2"

const NAV_ITEMS = [
  { name: "Question 1" },
  { name: "Question 2" },
  { name: "Question 3" },
  { name: "Question 4" },
  { name: "Question 5" },
]

const VideoInterviewPage = () => {
  //const { id } = useParams() // TODO: add swr for fetching interview data
  const [activeTab] = useState("setup")

  const isActive = (name: string) => {
    return activeTab.toLocaleLowerCase() == name.toLocaleLowerCase()
  }

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true })

  /*  const handleTabChange = (name: string) => {
    setActiveTab(name)
  }*/

  return (
    <>
      <SideBar>
        <img src={IntervLogo} alt="interv" className="w-40 rounded-full" />
        <SideBarItem title={"Setup"} isActive={isActive("setup")} />
        {NAV_ITEMS.map((item, index) => (
          <SideBarItem
            key={index}
            title={item.name}
            isActive={isActive(item.name)}
            onClick={() => {}}
          />
        ))}
      </SideBar>
      <VideoInterviewContentLayout>
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <video src={mediaBlobUrl} controls autoPlay loop />
        </div>
      </VideoInterviewContentLayout>
    </>
  )
}

export default VideoInterviewPage
