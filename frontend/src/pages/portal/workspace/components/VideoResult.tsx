import { useParams } from "react-router-dom"
import { useGetVideoSubmission } from "@/hooks/useGetVideoSubmission.ts"
import VideoResultRecordItem from "@/pages/portal/workspace/components/VideoResultRecordItem.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { Card } from "@/components/ui/card"
import { MdVideoCameraFront, MdVideoLibrary } from "react-icons/md"
import { BiError } from "react-icons/bi"
import { Skeleton } from "@/components/ui/skeleton"

function VideoResult() {
  const { candidateId, workspaceId } = useParams()
  const { data, isLoading } = useGetVideoSubmission(
    Number(candidateId),
    Number(workspaceId),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Card className="p-6">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-[200px] w-full" />
          </Card>
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-3">
              <MdVideoCameraFront className="text-4xl" />
              Video Results
            </h2>
            <p className="text-gray-600">
              Review candidate's recorded responses to interview questions
            </p>
          </div>

          {/* Video Responses Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <MdVideoLibrary className="text-xl text-primary" />
              <h3 className="text-xl font-bold text-primary">
                Recorded Responses
              </h3>
            </div>

            <div className="space-y-8">
              {data.data?.map((result, index) => (
                <div key={index} className="space-y-6">
                  <div className="rounded-lg">
                    <VideoResultRecordItem
                      videoPath={result.videoPath}
                      questionTopic={
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                              {index + 1}
                            </span>
                            <h4 className="font-semibold text-lg">
                              {result.question}
                            </h4>
                          </div>
                        </div>
                      }
                    />
                  </div>

                  {index + 1 !== data.data?.length && (
                    <Separator className="my-6" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <BiError className="text-4xl text-gray-400" />
          <h2 className="text-2xl font-bold text-primary">
            No Responses Found
          </h2>
          <p className="text-gray-600">
            No video interview responses are available for this candidate. This
            might be because the interview hasn't been completed yet or there
            was an issue with the submission.
          </p>
        </Card>
      )}
    </div>
  )
}

export default VideoResult
