import { StatusMessages } from "react-media-recorder-2"
import { Label } from "@/components/ui/label.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import VideoInterviewStatusBox from "@/pages/lobby/videoInterview/components/VideoInterviewStatusBox.tsx"
import { Button } from "@/components/ui/button.tsx"
import { FC, useContext, useState } from "react"
import { DeviceContext } from "@/contexts/device.tsx"
import { VideoPreviewStream } from "@/pages/lobby/videoInterview/components/VideoPreviewStream.tsx"

interface VideoInterviewSetupDeviceSetupProps {
  handleNextQuestion: () => void
}

const VideoInterviewSetupDeviceSetup: FC<
  VideoInterviewSetupDeviceSetupProps
> = ({ handleNextQuestion }) => {
  const [mediaError, setMediaError] = useState<string>("")
  const [mediaStatus, setMediaStatus] = useState<StatusMessages>("idle")
  const {
    selectedCameraId,
    selectedMicrophoneId,
    setSelectedCameraId,
    setSelectedMicrophoneId,
    videoDevices,
    audioDevices,
  } = useContext(DeviceContext)

  return (
    <>
      <p className={"text-2xl font-semibold"}>Video Interview</p>
      <VideoPreviewStream
        setMediaError={setMediaError}
        setMediaStatus={setMediaStatus}
      />

      <div className={"flex gap-20"}>
        <div>
          <Label>Camera options</Label>
          <Select
            value={selectedCameraId}
            onValueChange={(value) => {
              setSelectedCameraId(value)
            }}
          >
            <SelectTrigger className="w-[180px]" value={selectedCameraId}>
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
            value={selectedMicrophoneId}
            onValueChange={(value) => {
              setSelectedMicrophoneId(value)
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
      <Button
        disabled={!!mediaError || mediaStatus != "idle"}
        onClick={() => {
          handleNextQuestion()
        }}
      >
        Start
      </Button>
    </>
  )
}

export default VideoInterviewSetupDeviceSetup
