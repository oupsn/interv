import { useParams } from "react-router-dom"
import { useGetCodingSubmission } from "@/hooks/useGetCodingSubmission"
import { useContext, useEffect, useState } from "react"
import CodingResultRecordItem from "./CodingResultRecordItem"
import CodingResultQuestionItem from "./CodingResultQuestionItem"
import { FaCheckCircle } from "react-icons/fa"
import { Separator } from "@/components/ui/separator"
import { LoadingContext } from "@/contexts/loading"
import { BiTime } from "react-icons/bi"
import { MdAssignment, MdVideoLibrary } from "react-icons/md"
import { Card } from "@/components/ui/card"

interface CodingResultProps {
  workspaceId: number
}

function CodingResult({ workspaceId }: CodingResultProps) {
  const params = useParams()
  const { data: result, isLoading } = useGetCodingSubmission(
    Number(params.candidateId),
    workspaceId,
  )
  const { setLoading } = useContext(LoadingContext)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [questionPass, setQuestionPass] = useState<number>(0)
  const calculateQuestionPass = () => {
    if (result) {
      let totalTestCases = 0
      let passedTestCases = 0

      result.data?.result?.forEach((question) => {
        totalTestCases += question.test_cases_result?.length || 0
        question.test_cases_result?.forEach((testCase) => {
          if (testCase.is_passed === true) {
            passedTestCases += 1
          }
        })
      })

      setQuestionNumber(totalTestCases)
      setQuestionPass(passedTestCases)
    }
  }
  const formatTimeTaken = (timeTaken: number) => {
    const hours = Math.floor(timeTaken / 3600)
    const minutes = Math.floor((timeTaken % 3600) / 60)
    const seconds = timeTaken % 60
    return `${hours}h ${minutes}m ${seconds}s`
  }
  useEffect(() => {
    setLoading(true)
    if (result) {
      // console.log(result)
      calculateQuestionPass()
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])
  return (
    <div className="container w-full mx-auto px-4">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600">Loading submission details...</p>
        </div>
      ) : result?.data && result?.data?.result?.length !== 0 ? (
        <div className="flex flex-col gap-8 w-full items-center py-8">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-primary">
              <MdAssignment className="inline-block mr-2 mb-1" />
              Coding Results
            </h2>
            <p className="text-gray-600">
              Detailed breakdown of the candidate's coding performance
            </p>
          </div>

          {/* Stats Card */}
          <Card className="w-full p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
                <FaCheckCircle className="text-3xl text-green-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Test Cases Passed</p>
                  <p className="text-2xl font-bold text-green-700">
                    {questionPass} / {questionNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    Success Rate:{" "}
                    {((questionPass / questionNumber) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                <BiTime className="text-3xl text-gray-400 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Total Time Spent</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {formatTimeTaken(result.data?.result?.[0].time_taken || 0)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Recording Section */}
          <Card className="w-full p-6">
            <div className="flex items-center gap-2 mb-4">
              <MdVideoLibrary className="text-xl text-primary" />
              <h3 className="text-xl font-bold text-primary">
                Session Recording
              </h3>
            </div>
            <CodingResultRecordItem
              isVideoRequired={result.data?.is_video || false}
              isScreenRequired={result.data?.is_screen || false}
              videoUrl={result.data?.video_url || ""}
              screenUrl={result.data?.screen_url || ""}
            />
          </Card>

          {/* Questions Section */}
          <Card className="w-full p-6">
            <h3 className="text-xl font-bold text-primary mb-6">
              Detailed Question Analysis
            </h3>
            <div className="flex flex-col gap-6 w-full">
              {result.data?.result?.map((question, index) => (
                <div key={index}>
                  <CodingResultQuestionItem question={question} index={index} />
                  {index + 1 !== result.data?.result?.length && (
                    <Separator className="my-6" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-4 p-8 mt-8 text-center">
          <MdAssignment className="text-4xl text-gray-400" />
          <h2 className="text-2xl font-bold text-primary">No Results Found</h2>
          <p className="text-gray-600">
            The coding submission data is currently not available. Please check
            back later or contact support if you believe this is an error.
          </p>
        </Card>
      )}
    </div>
  )
}

export default CodingResult
