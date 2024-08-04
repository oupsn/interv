import { useEffect, useRef, useState } from "react"
import SideBar from "@/pages/lobby/components/SideBar.tsx"
import SideBarItem from "@/pages/lobby/components/SideBarItem.tsx"
import VideoInterviewContentLayout from "@/pages/lobby/videoInterview/components/VideoInterviewContentLayout.tsx"
import { ReactMediaRecorder, StatusMessages } from "react-media-recorder-2"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import VideoInterviewStatusBox from "@/pages/lobby/videoInterview/components/VideoInterviewStatusBox.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Label } from "@/components/ui/label.tsx"

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
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDevice, setSelectedDevice] = useState<{
    videoId: string
    audioId: string
  }>({
    videoId: "",
    audioId: "",
  })
  const [mediaError, setMediaError] = useState<string>("")
  const [mediaStatus, setMediaStatus] = useState<StatusMessages>("idle")

  const isActive = (name: string) => {
    return activeTab.toLocaleLowerCase() == name.toLocaleLowerCase()
  }

  const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
    const videoRef = useRef<HTMLVideoElement>(
      null as unknown as HTMLVideoElement,
    )

    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream
      }
    }, [stream])
    if (!stream) {
      return null
    }
    return <video ref={videoRef} className={"h-96 rounded-xl"} autoPlay />
  }

  const fetchDevice = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setVideoDevices(devices.filter((device) => device.kind === "videoinput"))
      setAudioDevices(devices.filter((device) => device.kind === "audioinput"))
      setSelectedDevice({
        videoId: devices.filter((device) => device.kind === "videoinput")[0]
          .deviceId,
        audioId: devices.filter((device) => device.kind === "audioinput")[0]
          .deviceId,
      })
    })
  }

  // necessary?
  useEffect(() => {
    const requestPermissionAndFetchDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      } catch (error) {
        console.error("Permission denied or error occurred", error)
      }
    }

    requestPermissionAndFetchDevices().then(() => {
      fetchDevice()
    })
  }, [])

  return (
    <>
      <SideBar>
        <SideBarItem title={"Setup"} isActive={isActive("setup")} />
        {NAV_ITEMS.map((item, index) => (
          <SideBarItem
            key={index}
            title={item.name}
            isActive={isActive(item.name)}
          />
        ))}
      </SideBar>
      <VideoInterviewContentLayout>
        <div className={"flex flex-col items-center gap-8"}>
          <p className={"text-2xl font-semibold"}>Video Interview</p>
          <ReactMediaRecorder
            key={selectedDevice.videoId}
            video={{ deviceId: selectedDevice.videoId }}
            askPermissionOnMount
            render={({ previewStream, error, status }) => {
              setMediaError(error)
              setMediaStatus(status)
              return (
                <>
                  <VideoPreview stream={previewStream} />
                </>
              )
            }}
          />
          <div className={"flex gap-20"}>
            <div>
              <Label>Camera options</Label>
              <Select
                value={selectedDevice.videoId}
                onValueChange={(value) => {
                  setSelectedDevice({
                    ...selectedDevice,
                    videoId: value,
                  })
                }}
              >
                <SelectTrigger
                  className="w-[180px]"
                  value={selectedDevice.videoId}
                >
                  <SelectValue placeholder="Camera" />
                </SelectTrigger>
                <SelectContent>
                  {videoDevices[0]?.deviceId
                    ? videoDevices.map((device, index) => (
                        <SelectItem value={device.deviceId} key={index}>
                          {device.label}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Microphone options</Label>
              <Select
                value={selectedDevice.audioId}
                onValueChange={(value) => {
                  setSelectedDevice({
                    ...selectedDevice,
                    audioId: value,
                  })
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Microphone" />
                </SelectTrigger>
                <SelectContent>
                  {audioDevices[0]?.deviceId
                    ? audioDevices.map((device, index) => (
                        <SelectItem value={device.deviceId} key={index}>
                          {device.label}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className={"space-y-4"}>
            <VideoInterviewStatusBox
              title={"Camera"}
              error={mediaError}
              status={mediaStatus}
            />
            <VideoInterviewStatusBox
              title={"Microphone"}
              error={mediaError}
              status={mediaStatus}
            />
          </div>
          <Button disabled={!!mediaError || mediaStatus != "idle"}>
            Start
          </Button>
        </div>
      </VideoInterviewContentLayout>
    </>
  )
}

export default VideoInterviewPage
