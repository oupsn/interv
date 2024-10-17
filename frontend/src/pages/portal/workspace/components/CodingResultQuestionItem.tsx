import { DomainsCodingQuestionSubmission } from "@/api/server"
import CodeMirror from "@uiw/react-codemirror"
import { langs } from "@uiw/codemirror-extensions-langs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Updated import
import CodingResultQuestionTestCasesTable from "./CodingResultQuestionTestCasesTable"
import CodingResultQuestionLint from "./CodingResultQuestionLint"
import { FaInfoCircle } from "react-icons/fa"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
function CodingResultQuestionItem({
  question,
  index,
}: {
  question: DomainsCodingQuestionSubmission
  index: number
}) {
  const getLanguageExtension = (language: string) => {
    switch (language) {
      case "javascript":
        return langs.javascript()
      case "python":
        return langs.python()
      case "c":
        return langs.c()
      default:
        return langs.javascript()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row  items-center gap-1">
        {" "}
        <Link
          to={`/portal/question/coding/${question?.question?.title}`}
          className="hover:cursor-pointer"
        >
          <h4 className="text-lg font-semibold">
            {index + 1}. {question?.question?.title}{" "}
          </h4>
        </Link>
        <Badge variant={"secondary"}>{question.question?.difficulty}</Badge>
      </div>

      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-2 w-7/12">
          <Tabs defaultValue="code">
            <TabsList>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
              <TabsTrigger value="lint-results">Lint Results</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <CodeMirror
                value={question.code}
                editable={false}
                extensions={[
                  getLanguageExtension(question.language || "javascript"),
                ]}
                className="border border-gray-300 rounded-md overflow-hidden min-h-[200px]"
              />
            </TabsContent>
            <TabsContent value="test-cases">
              <CodingResultQuestionTestCasesTable
                testCasesResult={question.test_cases_result || []}
              />
            </TabsContent>
            <TabsContent value="lint-results">
              <CodingResultQuestionLint lint={question.linter_result || ""} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 items-center">
            <FaInfoCircle className="text-primary" />
            <h4 className="text-lg font-semibold">Information</h4>
          </div>
          <div className="flex flex-col">
            <p className="text-md mb-1">
              Test Case Pass:{" "}
              <span>
                {
                  question.test_cases_result?.filter(
                    (testCase) => testCase.is_passed,
                  ).length
                }{" "}
                / {question.test_cases_result?.length}
              </span>
            </p>
            <p className="text-md mb-1">
              Average Time Used:{" "}
              <span>
                {question.test_cases_result &&
                question.test_cases_result.length > 0
                  ? (
                      question.test_cases_result.reduce(
                        (acc, testCase) =>
                          acc +
                          parseFloat(
                            JSON.parse(testCase.compile_result || "")?.time,
                          ),
                        0,
                      ) / question.test_cases_result.length
                    ).toFixed(2)
                  : "N/A"}{" "}
                ms
              </span>
            </p>
            <p className="text-md mb-1">
              Average Memory Used:{" "}
              <span>
                {question.test_cases_result &&
                question.test_cases_result.length > 0
                  ? (
                      question.test_cases_result.reduce(
                        (acc, testCase) =>
                          acc +
                          parseFloat(
                            JSON.parse(testCase.compile_result || "")?.memory,
                          ),
                        0,
                      ) /
                      (question.test_cases_result.length * 1024)
                    ).toFixed(2)
                  : "N/A"}{" "}
                MB
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodingResultQuestionItem
