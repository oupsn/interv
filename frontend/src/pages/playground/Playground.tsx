import { useContext, useEffect, useRef } from "react"
import { DeviceContext } from "@/contexts/device.tsx"
import { ReactMediaRecorder } from "react-media-recorder-2"

const Playground = () => {
  const { fetchDevice, videoDevices } = useContext(DeviceContext)
  useEffect(() => {
    fetchDevice()
  }, [fetchDevice])
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
  return (
    <>
      {JSON.stringify(videoDevices)}
      <ReactMediaRecorder
        key={videoDevices[0].deviceId}
        video={{ deviceId: videoDevices[0].deviceId }}
        render={({ previewStream }) => {
          console.log(videoDevices[0].deviceId)
          console.log(previewStream)
          return (
            <>
              <VideoPreview stream={previewStream} />
            </>
          )
        }}
      />
    </>
  )
}

export default Playground
