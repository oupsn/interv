import React, { useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { langs } from "@uiw/codemirror-extensions-langs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  DomainsCodingQuestionTestCase,
  DomainsCompilationResultResponse,
} from "@/api/server"
import { Loader2 } from "lucide-react" // Add this import for the spinner icon

interface CodeEditorProps {
  content: string
  onChange: (newContent: string) => void
  language: string
  onLanguageChange: (newLanguage: string) => void
  onCompile: (language: number, content: string, input: string) => void
  isCompiling: boolean
  testCasesList: DomainsCodingQuestionTestCase[]
  output: DomainsCompilationResultResponse[]
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  content,
  onChange,
  language,
  onLanguageChange,
  onCompile,
  isCompiling,
  testCasesList,
  output,
}) => {
  const handleLanguageChange = (value: string) => {
    onLanguageChange(value)
    onChange(getDefaultCode(value))
  }
  const formatTestCase = (text: string) => {
    return text.split("\\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }
  const getDefaultCode = (lang: string) => {
    switch (lang) {
      case "python":
        return '# Python3 code here\nprint("Hello, World!")'
      case "java":
        return '// Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
      case "c":
        return '// C code here\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}'
      default:
        return "// Start coding here"
    }
  }
  const getLanguageNumber = (lang: string) => {
    switch (lang) {
      case "python":
        return 71
      case "java":
        return 62
      case "c":
        return 48
      default:
        return 0
    }
  }

  const getLanguageExtension = () => {
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

  useEffect(() => {
    if (!content) {
      onChange(getDefaultCode(language))
    }
  }, [language, content, onChange])

  return (
    <div className="p-6 w-full min-h-full mx-auto rounded-lg border shadow-lg bg-white">
      <div className="mb-4 flex justify-between items-center">
        <Select onValueChange={handleLanguageChange} value={language}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="python">Python3</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="c">C</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            onCompile(getLanguageNumber(language), content, "")
          }}
          className="text-white"
          disabled={isCompiling}
        >
          {isCompiling ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Compiling...
            </>
          ) : (
            "Compile & Run"
          )}
        </Button>
      </div>
      <div className="mb-4">
        <CodeMirror
          value={content}
          height="300px"
          extensions={[getLanguageExtension()]}
          onChange={onChange}
          className="border border-gray-300 rounded-md overflow-hidden"
        />
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Output:</h3>
        {!isCompiling &&
          testCasesList?.map((item, index) => (
            <div key={index} className="mb-6 p-4 border rounded-md">
              <h4 className="text-lg font-semibold mb-2">
                Test Case {index + 1}:
              </h4>
              <div className="mb-2">
                <strong>Input:</strong>
                <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-md">
                  {formatTestCase(item.input ?? "")}
                </pre>
              </div>
              {output && output[index] ? (
                <>
                  <div className="mb-2">
                    <strong>Output:</strong>
                    <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-md">
                      {output[index].compile_result?.stdout}
                    </pre>
                  </div>
                  <div
                    className={`mt-2 font-semibold ${
                      output[index].is_passed
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {output[index].is_passed ? "Passed" : "Not Passed"}
                  </div>
                </>
              ) : (
                <div className="text-gray-500 italic">
                  Run the code to see the output and status.
                </div>
              )}
            </div>
          ))}
      </div>
      {!isCompiling && output && output.length > testCasesList.length && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Hidden Test Cases:</h3>
          <div className="flex items-center space-x-2">
            {output
              .slice(testCasesList.length)
              .every((item) => item.is_passed) ? (
              <span className="text-green-600 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                You have passed all hidden test cases
              </span>
            ) : (
              <>
                <span className="text-green-600 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {
                    output
                      .slice(testCasesList.length)
                      .filter((item) => item.is_passed).length
                  }{" "}
                  has passed
                </span>
                <span className="text-gray-600">/</span>
                <span className="text-red-600 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {output.length -
                    testCasesList.length -
                    output
                      .slice(testCasesList.length)
                      .filter((item) => item.is_passed).length}
                  {" has failed"}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeEditor
