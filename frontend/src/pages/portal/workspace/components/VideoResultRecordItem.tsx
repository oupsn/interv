import { FC, ReactNode } from "react"

interface VideoResultRecordItemProps {
  questionTopic: ReactNode
  videoPath: string
}

const VideoResultRecordItem: FC<VideoResultRecordItemProps> = ({
  videoPath,
  questionTopic,
}) => {
  return (
    <div className="space-y-4">
      <p className={"font-semibold text-lg place-self-start"}>
        {questionTopic}
      </p>
      <video controls className="rounded-xl h-80 w-fit place-self-center">
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoResultRecordItem
