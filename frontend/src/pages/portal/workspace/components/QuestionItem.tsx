import React from "react"
import { QuestionType } from "./QuestionPicker"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

interface QuestionItemProps {
  id: number | undefined
  title: string | undefined
  currentQuestion: QuestionType
  setCurrentQuestion: React.Dispatch<React.SetStateAction<QuestionType>>
  stockQuestion: QuestionType
  setStockQuestion: React.Dispatch<React.SetStateAction<QuestionType>>
  onPreviewConfirm?: () => void
  disable?: boolean
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  id,
  title,
  currentQuestion,
  setCurrentQuestion,
  stockQuestion,
  setStockQuestion,
  disable,
}) => {
  // Determine if the question is in current or stock list
  const isInCurrentList = currentQuestion?.some((q) => q?.id === id)

  const handleQuestionMove = () => {
    for (const asm of stockQuestion ?? []) {
      if (asm?.id == id) {
        setStockQuestion(
          stockQuestion?.filter((question) => question.id != id).sort(),
        )
        setCurrentQuestion((currentQuestion) =>
          [...(currentQuestion ?? []), asm].sort(),
        )
        break
      }
    }
    for (const asm of currentQuestion ?? []) {
      if (asm?.id == id) {
        setCurrentQuestion(
          currentQuestion?.filter((question) => question.id != id).sort(),
        )
        setStockQuestion((stockQuestion) =>
          [...(stockQuestion ?? []), asm].sort(),
        )
        break
      }
    }
  }

  return (
    <>
      <div
        className={`
          w-full flex items-center justify-between 
          ${isInCurrentList ? "bg-zinc-50 hover:bg-zinc-100" : "bg-zinc-50 hover:bg-zinc-100"}
          p-3 rounded-lg transition-all duration-200
          border border-transparent hover:border-gray-200
          group cursor-pointer shadow-sm
        `}
        onClick={() => {
          if (disable) return
          handleQuestionMove()
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-md font-medium text-gray-700">{title}</span>
        </div>

        {isInCurrentList && !disable ? (
          <ArrowLeftIcon className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        ) : (
          !disable && (
            <ArrowRightIcon className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          )
        )}
      </div>
    </>
  )
}

export default QuestionItem
