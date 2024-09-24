import React, { useState, useEffect, useRef } from "react"
import CodingInterviewQuestion, {
  CodingInterviewQuestionProps,
} from "./codingInterviewPanel/CodingInterviewQuestion"
import CodeEditor from "./codingInterviewPanel/CodingInterviewEditor"
import { Button } from "@/components/ui/button"
import { server } from "@/contexts/swr"

interface CodingInterviewPanelProps {
  timeRemain: number
  questions: CodingInterviewQuestionProps[]
  currentQuestionIndex: number
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  isFirstQuestion: boolean
  isLastQuestion: boolean
  setCurrentQuestionIndex: (index: number) => void
}

interface EditorState {
  content: string
  language: string
  output: string
}

const CodingInterviewPanel: React.FC<CodingInterviewPanelProps> = ({
  timeRemain,
  questions,
  currentQuestionIndex,
  onNextQuestion,
  onPreviousQuestion,
  isFirstQuestion,
  isLastQuestion,
  setCurrentQuestionIndex,
}) => {
  const [countdown, setCountdown] = useState(timeRemain)
  const [editorStates, setEditorStates] = useState<EditorState[]>(
    new Array(questions.length).fill({
      content: "",
      language: "javascript",
      output: "",
    }),
  )
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const newLeftWidth =
          ((e.clientX - containerRect.left) / containerRect.width) * 100
        setLeftPanelWidth(Math.min(Math.max(newLeftWidth, 20), 80))
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const currentQuestion = questions[currentQuestionIndex]

  const handleEditorChange = (newContent: string) => {
    setEditorStates((prevStates) => {
      const newStates = [...prevStates]
      newStates[currentQuestionIndex] = {
        ...newStates[currentQuestionIndex],
        content: newContent,
      }
      return newStates
    })
  }

  const handleLanguageChange = (newLanguage: string) => {
    setEditorStates((prevStates) => {
      const newStates = [...prevStates]
      newStates[currentQuestionIndex] = {
        ...newStates[currentQuestionIndex],
        language: newLanguage,
        output: "",
      }
      return newStates
    })
  }
  const handleCompile = async (
    language: number,
    content: string,
    input: string,
  ) => {
    const tokenResponse = await server.codingInterview.generateCompileToken({
      body: {
        language,
        source_code: content,
        input,
      },
    })
    const token = tokenResponse.data?.token
    if (!token) {
      return
    }
    setEditorStates((prevStates) => {
      const newStates = [...prevStates]
      newStates[currentQuestionIndex] = {
        ...newStates[currentQuestionIndex],
        output: "Compiling...",
      }
      return newStates
    })

    const pollCompileResult = async () => {
      const compileResponse =
        await server.codingInterview.getCompileResult(token)
      const compileStatus =
        compileResponse.data?.compileResult?.status?.description

      if (compileStatus === "Accepted") {
        const compileResult = compileResponse.data?.compileResult
        if (compileResult) {
          console.log(compileResult)
          const formattedResult =
            compileResult.stdout +
            "\n" +
            compileResult.stderr +
            "\n" +
            "Time: " +
            compileResult.time +
            "ms" +
            "\n" +
            "Memory: " +
            compileResult.memory +
            "KB"
          setEditorStates((prevStates) => {
            const newStates = [...prevStates]
            newStates[currentQuestionIndex] = {
              ...newStates[currentQuestionIndex],
              output: formattedResult,
            }
            return newStates
          })
        }
      } else {
        setTimeout(pollCompileResult, 1000)
      }
    }

    pollCompileResult()
  }

  return (
    <div className="flex flex-col items-center justify-start h-full w-full gap-4 p-4">
      <p className="text-lg font-semibold">
        Time remaining: {formatTime(countdown)}
      </p>
      <div className="flex gap-2 mb-4">
        {questions.map((_, index) => (
          <Button
            key={index}
            variant={index === currentQuestionIndex ? "default" : "outline"}
            onClick={() => {
              setCurrentQuestionIndex(index)
            }}
            className="w-10 h-10"
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <div
        className="flex flex-row w-full h-[calc(100vh-200px)] relative"
        ref={containerRef}
      >
        <div
          className="overflow-y-auto"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <CodingInterviewQuestion
            id={currentQuestion.id}
            title={currentQuestion.title}
            description={currentQuestion.description}
            exampleInputList={currentQuestion.exampleInputList}
            exampleOutputList={currentQuestion.exampleOutputList}
            testcaseList={currentQuestion.testcaseList}
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-2 bg-gray-200 cursor-ew-resize z-10 rounded -translate-x-1"
          style={{ left: `calc(${leftPanelWidth}% - 1px)` }}
          onMouseDown={() => setIsDragging(true)}
        >
          <button
            className="bg-primary rounded p-1  text-white font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onClick={() => setLeftPanelWidth(50)}
          >
            |
          </button>
        </div>
        <div
          className="overflow-y-auto"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <CodeEditor
            content={editorStates[currentQuestionIndex].content}
            onChange={handleEditorChange}
            language={editorStates[currentQuestionIndex].language}
            onLanguageChange={handleLanguageChange}
            onCompile={handleCompile}
            output={editorStates[currentQuestionIndex].output}
          />
        </div>
      </div>
      <div className="flex justify-between w-full mt-4">
        <Button
          onClick={onPreviousQuestion}
          disabled={isFirstQuestion}
          variant="outline"
        >
          Previous Question
        </Button>
        <div className="flex gap-4">
          <Button
            onClick={onNextQuestion}
            disabled={isLastQuestion}
            variant="outline"
          >
            Next Question
          </Button>
          {isLastQuestion && <Button variant="default">Submit</Button>}
        </div>
      </div>
    </div>
  )
}

export default CodingInterviewPanel
