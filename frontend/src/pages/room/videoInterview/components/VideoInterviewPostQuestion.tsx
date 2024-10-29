import { Dispatch, FC, SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { server } from "@/contexts/swr.tsx"
import { cn } from "@/lib/utils.ts"
import { useParams } from "react-router-dom"
import { useGetRoomContext } from "@/hooks/useGetRoomContext.ts"
import { toast } from "sonner"
import Cookies from "js-cookie"
import dayjs from "dayjs"

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
  const { data } = useGetRoomContext(roomId!)
  const [selectedVideo, setSelectedVideo] = useState("")
  const handleSubmitVideo = async () => {
    const videoBlob = await fetch(selectedVideo).then((response) =>
      response.blob(),
    )
    const videoFile = new File([videoBlob], Date.now().toString() + ".mp4", {
      type: "video/mp4",
      lastModified: Date.now(),
    })
    toast.promise(
      server.videoInterview.submitVideoInterview({
        file: videoFile,
        videoQuestionId: questionId,
        roomId: data!.data!.roomId,
        candidateId: data!.data!.candidateId,
      }),
      {
        loading: "Submitting video...",
        success: () => {
          Cookies.set("s_" + questionId.toString(), dayjs().toISOString()) //TODO: come back here one day
          handleNextQuestion()
          setMediaBlob([])
          setRecordState("pre")
          return "Submitted video successfully"
        },
        error: (err) => {
          return err.response.data.message
        },
      },
    )
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
        You have{" "}
        {attemptLeft - Number(Cookies.get("r_" + questionId.toString()) ?? "0")}{" "}
        attempts left.
      </p>
      <div className={"flex gap-10"}>
        {attemptLeft -
          Number(Cookies.get("r_" + questionId.toString()) ?? "0") >
        0 ? (
          <Button
            onClick={() => {
              setRecordState("detail")
              const currentAttempt =
                Cookies.get("r_" + questionId.toString()) ?? 0
              Cookies.set(
                "r_" + questionId.toString(),
                String(Number(currentAttempt ?? "0") + 1),
              ) //TODO: come back here one day
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
