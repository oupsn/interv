import { StatusMessages } from "react-media-recorder-2"
import { Label } from "@/components/ui/label.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import VideoInterviewStatusBox from "@/pages/room/videoInterview/components/VideoInterviewStatusBox.tsx"
import { Button } from "@/components/ui/button.tsx"
import { FC, useContext, useState } from "react"
import { DeviceContext } from "@/contexts/device.tsx"
import { VideoPreviewStream } from "@/pages/room/videoInterview/components/VideoPreviewStream.tsx"

interface VideoInterviewSetupDeviceSetupProps {
  handleNextQuestion: (arg0?: number) => void
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
    <div className="flex flex-col gap-4 w-full items-center justify-center rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className={"text-lg font-semibold"}>Device Setup</p>
        <p className="text-sm text-gray-500">
          Please ensure your camera and microphone are working properly.
        </p>
      </div>
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
      <div className={"flex flex-row items-center justify-center gap-8"}>
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
    </div>
  )
}

export default VideoInterviewSetupDeviceSetup
