import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react"
import { ReactMediaRecorder, StatusMessages } from "react-media-recorder-2"
import { DeviceContext } from "@/contexts/device.tsx"

interface VideoPreviewStreamProps {
  setMediaError?: Dispatch<SetStateAction<string>>
  setMediaStatus?: Dispatch<SetStateAction<StatusMessages>>
}

const Preview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

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

export const VideoPreviewStream: FC<VideoPreviewStreamProps> = ({
  setMediaError,
  setMediaStatus,
}) => {
  const { selectedCameraId, fetchDevice } = useContext(DeviceContext)

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    fetchDevice()
  }, [])

  return (
    <ReactMediaRecorder
      key={selectedCameraId}
      video={{ deviceId: selectedCameraId }}
      askPermissionOnMount
      render={({ previewStream, status, error }) => {
        if (setMediaError) {
          setMediaError(error)
        }
        if (setMediaStatus) {
          setMediaStatus(status)
        }
        return (
          <>
            <Preview stream={previewStream} />
          </>
        )
      }}
    />
  )
}
