import { FC } from "react"

interface VideoResultRecordItemProps {
  questionTopic: string
  videoPath: string
}

const VideoResultRecordItem: FC<VideoResultRecordItemProps> = ({
  videoPath,
  questionTopic,
}) => {
  return (
    <>
      <p className={"font-semibold text-lg place-self-start"}>
        {questionTopic}
      </p>
      <video controls className="rounded-xl h-64 w-fit place-self-center">
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  )
}

export default VideoResultRecordItem
