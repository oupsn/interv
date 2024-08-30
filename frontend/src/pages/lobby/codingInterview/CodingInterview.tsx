import SideBar from "@/components/layout/SideBar"
import CodingInterviewInstruction from "./components/CodingInterviewInstruction"
import CodingInterviewPanel from "./components/CodingInterviewPanel"
import { useEffect, useState } from "react"
import SideBarItem from "@/components/layout/SideBarItem"

const CodingInterviewPage = () => {
  const [isStart, setIsStart] = useState(mockData.isStart)
  const [timeRemain, setTimeRemain] = useState(mockData.timeRemain)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined
    if (isStart && timeRemain > 0) {
      timer = setInterval(() => {
        setTimeRemain((prevTime: number) => prevTime - 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isStart, timeRemain])
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
    <>
      <SideBar>
        {!isStart && <SideBarItem title={"Instruction"} isActive={!isStart} />}
        {isStart && (
          <SideBarItem title={"Coding Interview"} isActive={isStart} />
        )}
      </SideBar>
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
            setCurrentQuestionIndex={setCurrentQuestionIndex}
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
    </>
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
        exampleInputList: ["nums = [2,7,11,15]", "target = 9"],
        exampleOutputList: ["[0,1]"],
        testcaseList: [
          {
            input: "[2,7,11,15], 9",
            output: "[0,1]",
          },
          {
            input: "[3,2,4], 6",
            output: "[1,2]",
          },
        ],
      },
      {
        id: 2,
        title: "Add Two Numbers",
        description:
          "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
        exampleInputList: ["l1 = [2,4,3]", "l2 = [5,6,4]"],
        exampleOutputList: ["[7,0,8]"],
        testcaseList: [
          {
            input: "[2,4,3], [5,6,4]",
            output: "[7,0,8]",
          },
          {
            input: "[0], [0]",
            output: "[0]",
          },
        ],
      },
      {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        description:
          "Given a string s, find the length of the longest substring without repeating characters.",
        exampleInputList: ["s = 'abcabcbb'"],
        exampleOutputList: ["3"],
        testcaseList: [
          {
            input: "'abcabcbb'",
            output: "3",
          },
          {
            input: "'bbbbb'",
            output: "1",
          },
        ],
      },
    ],
  },
}
export default CodingInterviewPage
