import { useParams } from "react-router-dom"
import { useGetCodingSubmission } from "@/hooks/useGetCodingSubmission"
import { useEffect, useState } from "react"
import CodingResultRecordItem from "./CodingResultRecordItem"
import CodingResultQuestionItem from "./CodingResultQuestionItem"
import { FaCheckCircle, FaStopwatch } from "react-icons/fa"
import { Separator } from "@/components/ui/separator"
function CodingResult() {
  const params = useParams()
  const { data: result, isLoading } = useGetCodingSubmission(
    Number(params.candidateId),
  )
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [questionPass, setQuestionPass] = useState<number>(0)
  const calculateQuestionPass = () => {
    if (result) {
      setQuestionNumber(result.data?.result?.length || 0)
      result.data?.result?.forEach((question) => {
        if (
          question.test_cases_result?.every(
            (testCase) => testCase.is_passed === true,
          )
        ) {
          setQuestionPass((prev) => prev + 1)
        }
      })
    }
  }
  const formatTimeTaken = (timeTaken: number) => {
    const hours = Math.floor(timeTaken / 3600)
    const minutes = Math.floor((timeTaken % 3600) / 60)
    const seconds = timeTaken % 60
    return `${hours}h ${minutes}m ${seconds}s`
  }
  useEffect(() => {
    if (result) {
      console.log(result)
      calculateQuestionPass()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : result ? (
        <div className="flex flex-col gap-6 w-full  p-4 overflow-y-auto items-center">
          <div className="flex flex-col gap-2 w-full items-center">
            <h2 className="text-3xl font-bold text-primary">
              Coding Submission Result
            </h2>
            <div className="flex flex-col gap-2 items-center">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500" />
                <p className="text-xl ml-2">
                  Total Passed: {questionPass} / {questionNumber}
                </p>
              </div>
              <div className="flex items-center">
                <FaStopwatch className="text-slate-700" />
                <p className="text-xl ml-2">
                  Time Taken:{" "}
                  {formatTimeTaken(result.data?.result?.[0].time_taken || 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl font-bold text-primary">Record Output</h3>
            <CodingResultRecordItem
              videoUrl={result.data?.video_url || ""}
              screenUrl={result.data?.screen_url || ""}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl font-bold text-primary">Question Results</h3>
            <div className="flex flex-col gap-4 w-full">
              {result.data?.result?.map((question, index) => (
                <>
                  <CodingResultQuestionItem
                    key={index}
                    question={question}
                    index={index}
                  />
                  {index + 1 == result.data?.result?.length ? (
                    <></>
                  ) : (
                    <Separator className="w-full" />
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  )
}

export default CodingResult
