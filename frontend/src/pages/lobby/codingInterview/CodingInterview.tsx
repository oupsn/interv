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
  const [isStart, setIsStart] = useState(mockData.isStart)
  const [timeRemain, setTimeRemain] = useState(mockData.timeRemain)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionList, setQuestionList] = useState<Question[]>([])
  const { data: fetchedQuestions, mutate } = useGetCodingInterviewQuestion()

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

    if (isStart) {
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

    return () => clearInterval(timer)
  }, [isStart])

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

  return (
    <>
      <SideBar>
        {!isStart && <SideBarItem title={"Instruction"} isActive={!isStart} />}
        {isStart && (
          <SideBarItem title={"Coding Interview"} isActive={isStart} />
        )}
      </SideBar>
      <div className={"w-dvw h-dvh flex max-h-sr z-0"}>
        {isStart ? (
          questionsLoaded && questionList.length > 0 ? (
            <CodingInterviewPanel
              timeRemain={timeRemain}
              questions={questionList}
              currentQuestion={questionList[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              onNextQuestion={handleNextQuestion}
              onPreviousQuestion={handlePreviousQuestion}
              isFirstQuestion={currentQuestionIndex === 0}
              isLastQuestion={currentQuestionIndex === questionList.length - 1}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
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
