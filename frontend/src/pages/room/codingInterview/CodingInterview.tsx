import SideBar from "@/components/layout/SideBar"
import CodingInterviewInstruction from "./components/CodingInterviewInstruction"
import CodingInterviewPanel from "./components/CodingInterviewPanel"
import { useEffect, useState } from "react"
import SideBarItem from "@/components/layout/SideBarItem"
import { useGetCodingInterviewQuestion } from "@/hooks/UseGetCodingInterviewQuestion"
import {
  DomainsCodingQuestionResponse,
  DomainsCodingQuestionTestCase,
  DomainsCompilationResultResponse,
} from "@/api/server"
import { useParams } from "react-router-dom"
import CodingInterviewFinish from "./components/CodingInterviewFinish"

interface Question {
  index: number
  id: number
  title: string
  description: string
  inputDescription: string
  outputDescription: string
  testcaseList: DomainsCodingQuestionTestCase[]
  testcaseCompileResult: DomainsCompilationResultResponse[]
}
const CodingInterviewPage = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const [isStart, setIsStart] = useState(mockData.isStart)
  const [timeRemain, setTimeRemain] = useState(mockData.timeRemain)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionList, setQuestionList] = useState<Question[]>([])
  const { data: fetchedQuestions, mutate } = useGetCodingInterviewQuestion()
  const [isFinish, setIsFinish] = useState(false)

  // Add a new state to track if questions are loaded
  const [questionsLoaded, setQuestionsLoaded] = useState(false)

  /*   
  transform question
   */
  useEffect(() => {
    if (fetchedQuestions) {
      const newQuestions: Question[] =
        fetchedQuestions?.data?.map(
          (question: DomainsCodingQuestionResponse, index: number) => ({
            index: index,
            id: question.id ?? 0,
            title: question.title ?? "",
            description: question.description ?? "",
            inputDescription: question.input_description ?? "",
            outputDescription: question.output_description ?? "",
            testcaseList: question.test_case ?? [],
            testcaseCompileResult: [] as DomainsCompilationResultResponse[],
          }),
        ) ?? []
      setQuestionList(newQuestions)
      setQuestionsLoaded(true) // Set to true when questions are loaded
    }
  }, [fetchedQuestions])

  /*   
  start coding interview
   */
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    if (isStart && !isFinish) {
      timer = setInterval(() => {
        setTimeRemain((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1
          }
          clearInterval(timer)
          return 0
        })
      }, 1000)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [isStart, isFinish])

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateTimeTaken = () => {
    const timeTaken = mockData.timeRemain - timeRemain
    return timeTaken
  }

  return (
    <>
      <SideBar>
        {!isStart && <SideBarItem title={"Instruction"} isActive={!isStart} />}
        {isStart && !isFinish && (
          <SideBarItem title={"Coding Interview"} isActive={true} />
        )}
      </SideBar>
      <div className={"w-dvw h-dvh flex max-h-sr z-0"}>
        {isStart ? (
          isFinish ? (
            <CodingInterviewFinish
              timeTaken={calculateTimeTaken()}
              roomId={roomId ?? ""}
            />
          ) : questionsLoaded && questionList.length > 0 && !isFinish ? (
            <CodingInterviewPanel
              timeTaken={calculateTimeTaken()}
              roomId={roomId ?? ""}
              timeRemain={timeRemain}
              questions={questionList}
              currentQuestion={questionList[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              onNextQuestion={handleNextQuestion}
              onPreviousQuestion={handlePreviousQuestion}
              isFirstQuestion={currentQuestionIndex === 0}
              isLastQuestion={currentQuestionIndex === questionList.length - 1}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              setIsFinish={setIsFinish}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-xl font-semibold">No questions available.</p>
            </div>
          )
        ) : (
          <CodingInterviewInstruction
            title={mockData.title}
            description={mockData.instuction}
            clickStart={() => {
              setIsStart(true)
              mutate()
            }}
          />
        )}
      </div>
    </>
  )
}

//FIXME: replace this with actual data naja
const mockData = {
  isStart: false,
  timeRemain: 3600,
  title: "This is a coding interview instruction",
  instuction: "You have 30 minutes to solve the question",
}
export default CodingInterviewPage
