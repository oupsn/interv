import React from "react"

interface VideoInterviewContentProps {
  children: React.ReactNode
}
const VideoInterviewContentLayout: React.FC<VideoInterviewContentProps> = ({
  children,
}) => {
  return (
    <div className={"w-full flex justify-center items-center"}>{children}</div>
  )
}

export default VideoInterviewContentLayout
