import { useParams } from "react-router-dom"
import { useGetVideoSubmission } from "@/hooks/useGetVideoSubmission.ts"
import VideoResultRecordItem from "@/pages/portal/workspace/components/VideoResultRecordItem.tsx"
import { Separator } from "@/components/ui/separator.tsx"
function VideoResult() {
  const { candidateId } = useParams()
  const { data, isLoading } = useGetVideoSubmission(Number(candidateId))

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          <h2 className="text-3xl font-bold text-primary text-center mt-6">
            Video Submission Result
          </h2>
          <div className="flex flex-col w-full mt-6">
            <h3 className="text-xl font-bold text-primary">Record Output</h3>
            {data.data?.map((result, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-6 w-full items-center mt-4"
                >
                  <VideoResultRecordItem
                    key={index}
                    videoPath={result.videoPath}
                    questionTopic={index + 1 + ". " + result.question}
                  />

                  {index + 1 == data.data?.length ? (
                    <></>
                  ) : (
                    <Separator key={index} className="w-full" />
                  )}
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  )
}

export default VideoResult
