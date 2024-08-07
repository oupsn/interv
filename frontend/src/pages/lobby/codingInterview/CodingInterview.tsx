import CodingInterviewInstruction from "@/components/pages/lobby/codingInterview/CodingInterviewInstruction"
import CodingInterviewPanel from "@/components/pages/lobby/codingInterview/CodingInterviewPanel"
import { useState } from "react"

const CodingInterviewPage = () => {
  const [isStart, setIsStart] = useState(mockData.isStart)
  const [timeRemain] = useState(mockData.timeRemain)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockData.data.questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  return (
    // TODO: add sidebar in layout
    <div className={"w-dvw h-dvh flex max-h-sr z-0"}>
      {isStart ? (
        <CodingInterviewPanel
          timeRemain={timeRemain}
          questions={mockData.data.questionList}
          currentQuestionIndex={currentQuestionIndex}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={
            currentQuestionIndex === mockData.data.questionList.length - 1
          }
        />
      ) : (
        <CodingInterviewInstruction
          title={mockData.title}
          description={mockData.instuction}
          clickStart={() => {
            setIsStart(true)
          }}
        />
      )}
    </div>
  )
}

//FIXME: replace this with actual data naja
const mockData = {
  isStart: false,
  timeRemain: 3600,
  title: "This is a coding interview instruction",
  instuction: "You have 30 minutes to solve the question",
  data: {
    questionList: [
      {
        id: 1,
        title: "Two Sum",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        inputList: ["nums = [2,7,11,15]", "target = 9"],
        outputList: ["[0,1]"],
      },
      {
        id: 2,
        title: "Add Two Numbers",
        description:
          "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
        inputList: ["l1 = [2,4,3]", "l2 = [5,6,4]"],
        outputList: ["[7,0,8]"],
      },
      {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        description:
          "Given a string s, find the length of the longest substring without repeating characters.",
        inputList: ["s = 'abcabcbb'"],
        outputList: ["3"],
      },
    ],
  },
}
export default CodingInterviewPage
