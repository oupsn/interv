import { Dispatch, FC, SetStateAction } from "react"
import { Button } from "@/components/ui/button.tsx"

interface VideoInterviewPostQuestion {
  retryLeft: number
  mediaBlob: string[]
  handleNextQuestion: () => void
  setRecordState: Dispatch<SetStateAction<"pre" | "detail" | "post">>
  setMediaBlob: Dispatch<SetStateAction<string[]>>
}
export const VideoInterviewPostQuestion: FC<VideoInterviewPostQuestion> = ({
  retryLeft,
  mediaBlob,
  handleNextQuestion,
  setRecordState,
  setMediaBlob,
}) => {
  return (
    <>
      <div className={"flex gap-10"}>
        {mediaBlob.map((blob, index) => {
          return (
            <video
              key={index}
              src={blob}
              controls
              className={"w-[500px] rounded-xl"}
            />
          )
        })}
      </div>

      <p className={"text-xl font-semibold"}>
        You have {retryLeft} attempts left.
      </p>
      <div className={"flex gap-10"}>
        {retryLeft > 0 ? (
          <Button
            onClick={() => {
              setRecordState("detail")
            }}
          >
            Retake
          </Button>
        ) : null}
        <Button
          onClick={() => {
            handleNextQuestion()
            setMediaBlob([])
            setRecordState("pre")
          }}
        >
          Submit
        </Button>
      </div>
    </>
  )
}
