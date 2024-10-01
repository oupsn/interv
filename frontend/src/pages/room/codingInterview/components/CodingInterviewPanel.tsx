import React, { useState, useEffect, useRef } from "react"
import CodingInterviewQuestion, {
  CodingInterviewQuestionProps,
} from "./codingInterviewPanel/CodingInterviewQuestion"
import CodeEditor from "./codingInterviewPanel/CodingInterviewEditor"
import { Button } from "@/components/ui/button"
import { server } from "@/contexts/swr"
import {
  DomainsCompilationResultResponse,
  DomainsCodingQuestionSnapshot,
} from "@/api/server"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CodingInterviewPanelProps {
  timeRemain: number
  questions: CodingInterviewQuestionProps[]
  currentQuestion: CodingInterviewQuestionProps
  currentQuestionIndex: number
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  isFirstQuestion: boolean
  isLastQuestion: boolean
  setCurrentQuestionIndex: (index: number) => void
  roomId: string
  setIsFinish: (isFinish: boolean) => void
  timeTaken: number
}

interface EditorState {
  content: string
  language: string
  isCompiling: boolean
  compileOutput: DomainsCompilationResultResponse[]
}

const CodingInterviewPanel: React.FC<CodingInterviewPanelProps> = ({
  timeRemain,
  questions,
  currentQuestion,
  currentQuestionIndex,
  onNextQuestion,
  onPreviousQuestion,
  isFirstQuestion,
  isLastQuestion,
  setCurrentQuestionIndex,
  roomId,
  setIsFinish,
  timeTaken,
}) => {
  const [countdown, setCountdown] = useState(timeRemain)
  const [editorStates, setEditorStates] = useState<EditorState[]>(
    new Array(questions.length).fill({
      content: "",
      language: "python",
      compileOutput: "",
    }),
  )
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isCompiling, setIsCompiling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)

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
      }
      return newStates
    })
  }
  const handleCompile = async (language: number, content: string) => {
    setIsCompiling(true)
    setEditorStates((prevStates) => {
      const newStates = [...prevStates]
      newStates[currentQuestionIndex] = {
        ...newStates[currentQuestionIndex],
        isCompiling: true,
      }
      return newStates
    })
    const result = await server.codingInterview.getCompileResult({
      body: {
        language,
        source_code: content,
        question_id: currentQuestion.id,
      },
    })
    setIsCompiling(false)
    if (result.data) {
      console.log(result.data)
      setEditorStates((prevStates) => {
        const newStates = [...prevStates]
        newStates[currentQuestionIndex] = {
          ...newStates[currentQuestionIndex],
          compileOutput: result.data || [],
          isCompiling: false,
        }
        return newStates
      })
    }
  }

  const handleSubmit = () => {
    setIsSubmitDialogOpen(true)
  }

  const confirmSubmit = async () => {
    const submissionData: DomainsCodingQuestionSnapshot[] = questions.map(
      (question, index) => ({
        room_id: roomId,
        question_id: question.id,
        code: editorStates[index].content,
        language: editorStates[index].language,
        time_taken: timeTaken,
        is_submitted: true,
      }),
    )

    console.log(submissionData)
    try {
      const response =
        await server.codingInterview.createQuestionSnapshot(submissionData)
      console.log("Submission successful:", response)
    } catch (error) {
      console.error("Submission failed:", error)
    }
    setIsFinish(true)
    setIsSubmitDialogOpen(false)
  }

  return (
    <div className="flex flex-col items-center justify-start h-full w-full gap-4 p-4">
      <p className="text-lg font-semibold">
        Time remaining: {formatTime(countdown)}
      </p>

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
            index={currentQuestionIndex}
            title={currentQuestion.title}
            description={currentQuestion.description}
            inputDescription={currentQuestion.inputDescription}
            outputDescription={currentQuestion.outputDescription}
            testcaseList={currentQuestion.testcaseList}
            testcaseCompileResult={currentQuestion.testcaseCompileResult}
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
            isCompiling={isCompiling}
            output={editorStates[currentQuestionIndex].compileOutput}
            testCasesList={currentQuestion.testcaseList}
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
        <div className="flex gap-4">
          <Button
            onClick={onNextQuestion}
            disabled={isLastQuestion}
            variant="outline"
          >
            Next Question
          </Button>
          {isLastQuestion && (
            <Button variant="default" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>

      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Coding Assessment</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your coding assessment? You won't
              be able to make any changes after submission.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSubmitDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="default" onClick={confirmSubmit}>
              Confirm Submission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CodingInterviewPanel
