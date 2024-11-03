import { Dispatch, FC, SetStateAction, useContext, useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { server } from "@/contexts/swr.tsx"
import { cn } from "@/lib/utils.ts"
import { useParams } from "react-router-dom"
import { useGetRoomContext } from "@/hooks/useGetRoomContext.ts"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { LoadingContext } from "@/contexts/loading"

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
  const { setLoading, setText } = useContext(LoadingContext)
  const [selectedVideo, setSelectedVideo] = useState("")
  const handleSubmitVideo = async () => {
    setLoading(true)
    const videoBlob = await fetch(selectedVideo).then((response) =>
      response.blob(),
    )
    const videoFile = new File([videoBlob], Date.now().toString() + ".mp4", {
      type: "video/mp4",
      lastModified: Date.now(),
    })
    setText("Submitting video...")
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
          Cookies.set("s_" + questionId.toString(), "true") //TODO: come back here one day
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
    setLoading(false)
    setText("")
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold text-center mb-4">
        Review Your Recordings
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-8 justify-center p-6 relative">
        {/* Video Preview Section */}
        <div className="flex flex-col gap-6 relative">
          <div className="flex flex-row gap-6 relative max-w-[800px] overflow-x-scroll">
            {mediaBlob.map((blob, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <div className="relative">
                  <video
                    src={blob}
                    controls
                    className={cn(
                      "w-[320px] md:w-[400px] lg:w-[500px] rounded-xl transition-all duration-300",
                      selectedVideo === blob
                        ? "border-4 border-iGreen shadow-lg"
                        : "opacity-50 hover:opacity-75",
                    )}
                  />
                  {selectedVideo === blob && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-iGreen text-white px-3 py-1 rounded-full text-sm">
                        Selected
                      </span>
                    </div>
                  )}
                </div>
                {selectedVideo !== blob && (
                  <Button
                    onClick={() => setSelectedVideo(blob)}
                    variant="outline"
                    className="w-32"
                  >
                    Select Video
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Controls Section */}
        <div className="flex flex-col items-center gap-6 mt-6 md:mt-0">
          {/* Attempts Counter */}
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Remaining Attempts</h3>
            <p className="text-xl font-semibold">
              {attemptLeft - Number(Cookies.get(`r_${questionId}`) ?? "0")}{" "}
              <span className="text-base font-normal">attempts left</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              disabled={!selectedVideo}
              onClick={() => {
                Cookies.remove("a_" + questionId.toString()) //TODO: come back here one day
                Cookies.remove("p_" + questionId.toString()) //TODO: come back here one day
                handleSubmitVideo()
              }}
              className="w-48"
            >
              Submit Recording
            </Button>

            {attemptLeft - Number(Cookies.get(`r_${questionId}`) ?? "0") >
              0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setRecordState("detail")
                  setRecordState("detail")
                  const currentAttempt =
                    Cookies.get("r_" + questionId.toString()) ?? 0
                  Cookies.set(
                    "r_" + questionId.toString(),
                    String(Number(currentAttempt ?? "0") + 1),
                  ) //TODO: come back here one day
                  Cookies.remove("a_" + questionId.toString()) //TODO: come back here one day
                  Cookies.remove("p_" + questionId.toString()) //TODO: come back here one day
                }}
                className="w-48"
              >
                Retake
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
