import { DomainsCodingQuestionSubmissionTestCaseResult } from "@/api/server"
import React from "react"
import { FaCheckCircle } from "react-icons/fa"
import { FaTimesCircle } from "react-icons/fa"

function CodingResultQuestionTestCasesTable({
  testCasesResult,
}: {
  testCasesResult: DomainsCodingQuestionSubmissionTestCaseResult[]
}) {
  const formatTestCase = (text: string) => {
    return text.split("\\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }
  return (
    <div className="flex flex-col gap-2">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2">Input</th>
            <th className="border border-gray-300 p-2">Expected</th>
            <th className="border border-gray-300 p-2">Output</th>
            <th className="border border-gray-300 p-2">Result</th>
          </tr>
        </thead>
        <tbody>
          {testCasesResult?.map((testCase, index) => (
            <tr key={index} className="border-b">
              <td className="border border-gray-300 p-2 text-center w-12">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2">
                {formatTestCase(testCase.test_case?.input || "")}
              </td>
              <td className="border border-gray-300 p-2">
                {formatTestCase(testCase.test_case?.output || "")}
              </td>
              <td className="border border-gray-300 p-2">
                {formatTestCase(
                  JSON.parse(testCase.compile_result || "")?.stdout || "",
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {testCase.is_passed ? (
                  <span className="text-green-600 flex flex-row gap-1 items-center">
                    <FaCheckCircle />
                    Passed
                  </span>
                ) : (
                  <span className="text-red-600 flex flex-row gap-1 items-center">
                    <FaTimesCircle />
                    Failed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CodingResultQuestionTestCasesTable
