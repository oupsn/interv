import { StatusMessages } from "react-media-recorder-2"
import { Label } from "@/components/ui/label.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import VideoInterviewStatusBox from "../../videoInterview/components/VideoInterviewStatusBox"
import { Button } from "@/components/ui/button.tsx"
import { FC, useContext, useEffect } from "react"
import { DeviceContext } from "@/contexts/device.tsx"
import { CodingVideoPreviewStream } from "./CodingVideoPreviewStream"
import { CodingScreenPreviewStream } from "./CodingScreenPreviewStream"

interface CodingInterviewDeviceSetupProps {
  handleClickStart: () => void
  mediaError: string
  mediaStatus: StatusMessages
  screenError: string
  screenStatus: StatusMessages
  previewVideoStream: MediaStream | null
  previewScreenStream: MediaStream | null
}

const CodingInterviewDeviceSetup: FC<CodingInterviewDeviceSetupProps> = ({
  handleClickStart,
  previewVideoStream,
  previewScreenStream,
  mediaError,
  mediaStatus,
  screenError,
  screenStatus,
}) => {
  const {
    selectedCameraId,
    selectedMicrophoneId,
    setSelectedCameraId,
    setSelectedMicrophoneId,
    videoDevices,
    audioDevices,
    fetchDevice,
  } = useContext(DeviceContext)
  useEffect(() => {
    fetchDevice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col gap-10 overflow-y-auto">
      <div className="flex flex-row gap-10 justify-center">
        <CodingVideoPreviewStream stream={previewVideoStream} />
        <CodingScreenPreviewStream stream={previewScreenStream} />
      </div>

      <div className={"flex flex-row gap-20 justify-center"}>
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
      <div
        className={"space-y-4 flex flex-row gap-16 items-center justify-center"}
      >
        <VideoInterviewStatusBox
          title={"Screen"}
          error={screenError}
          status={screenStatus}
        />
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
        disabled={
          !!mediaError ||
          mediaStatus != "idle" ||
          !!screenError ||
          screenStatus != "idle"
        }
        onClick={() => {
          handleClickStart()
        }}
      >
        Start
      </Button>
    </div>
  )
}

export default CodingInterviewDeviceSetup
