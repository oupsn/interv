import { useParams } from "react-router-dom"
import { useGetCodingSubmission } from "@/hooks/useGetCodingSubmission"

function CodingResult() {
  const params = useParams()
  const { data, isLoading } = useGetCodingSubmission(Number(params.userId))

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  )
}

export default CodingResult
