import React from "react"
import { QuestionType } from "./QuestionPicker"

interface QuestionItemProps {
  id: number | undefined
  title: string | undefined
  currentQuestion: QuestionType
  setCurrentQuestion: React.Dispatch<React.SetStateAction<QuestionType>>
  stockQuestion: QuestionType
  setStockQuestion: React.Dispatch<React.SetStateAction<QuestionType>>
}
const QuestionItem: React.FC<QuestionItemProps> = ({
  id,
  title,
  currentQuestion,
  setCurrentQuestion,
  stockQuestion,
  setStockQuestion,
}) => {
  return (
    <>
      <div
        className="w-full flex justify-start bg-zinc-100 p-2 text-lg "
        onClick={() => {
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
        }}
      >
        {title}
      </div>
    </>
  )
}
export default QuestionItem
