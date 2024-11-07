import { FC, useEffect, useRef } from "react"
import React from "react"
interface VideoPreviewStreamProps {
  stream: MediaStream | null
}

const Preview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.load()
    }
  }, [stream])
  if (!stream) {
    return null
  }
  return <video ref={videoRef} className={"h-40 rounded-xl"} autoPlay />
}

export const CodingVideoPreviewStream: FC<VideoPreviewStreamProps> = React.memo(
  ({ stream }) => {
    return <Preview stream={stream} />
  },
)
