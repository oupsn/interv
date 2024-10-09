import { Dispatch, FC, SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { server } from "@/contexts/swr.tsx"
import { cn } from "@/lib/utils.ts"
import { useParams, useSearchParams } from "react-router-dom"
import { useGetRoomContext } from "@/hooks/useGetRoomContext.ts"

interface VideoInterviewPostQuestion {
  attemptLeft: number
  mediaBlob: string[]
  handleNextQuestion: () => void
  setRecordState: Dispatch<SetStateAction<"pre" | "detail" | "post">>
  setMediaBlob: Dispatch<SetStateAction<string[]>>
  questionId: number
}
export const VideoInterviewPostQuestion: FC<VideoInterviewPostQuestion> = ({
  attemptLeft,
  mediaBlob,
  handleNextQuestion,
  setRecordState,
  setMediaBlob,
  questionId,
}) => {
  const { roomId } = useParams()
  const [URLSearchParams] = useSearchParams()
  const { data } = useGetRoomContext(roomId!, URLSearchParams.get("rt")!)
  const [selectedVideo, setSelectedVideo] = useState("")
  const handleSubmitVideo = async () => {
    const videoBlob = await fetch(selectedVideo).then((response) =>
      response.blob(),
    )
    const videoFile = new File([videoBlob], Date.now().toString() + ".mp4", {
      type: "video/mp4",
      lastModified: Date.now(),
    })
    server.videoInterview
      .submitVideoInterview({
        file: videoFile,
        videoQuestionId: questionId,
        roomId: data!.data!.roomId,
        candidateId: data!.data!.candidateId,
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        handleNextQuestion()
        setMediaBlob([])
        setRecordState("pre")
      })
  }
  return (
    <>
      <div className={"flex gap-10"}>
        {mediaBlob.map((blob, index) => {
          return (
            <div className={"flex flex-col items-center gap-4"}>
              <video
                key={index}
                src={blob}
                controls
                className={cn(
                  "w-[500px] rounded-xl",
                  selectedVideo === blob
                    ? "border-4 border-iGreen"
                    : "opacity-40",
                )}
              />
              {selectedVideo !== blob ? (
                <Button
                  disabled={selectedVideo === blob}
                  onClick={() => {
                    setSelectedVideo(blob)
                  }}
                >
                  Select
                </Button>
              ) : null}
            </div>
          )
        })}
      </div>

      <p className={"text-xl font-semibold"}>
        You have {attemptLeft} attempts left.
      </p>
      <div className={"flex gap-10"}>
        {attemptLeft > 0 ? (
          <Button
            onClick={() => {
              setRecordState("detail")
            }}
          >
            Retake
          </Button>
        ) : null}
        <Button
          disabled={selectedVideo === ""}
          onClick={() => {
            handleSubmitVideo()
          }}
        >
          Submit
        </Button>
      </div>
    </>
  )
}
