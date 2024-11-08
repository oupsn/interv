import { Label } from "@radix-ui/react-label"
import {
  DomainsCodingQuestion,
  GetVideoQuestionByPortalIdResponse,
} from "@/api/server"
import QuestionItem from "@/pages/portal/workspace/components/QuestionItem.tsx"
import { cn } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"

export type QuestionType =
  | DomainsCodingQuestion[]
  | GetVideoQuestionByPortalIdResponse[]
  | undefined

interface QuestionPickerProps {
  currentQuestion: QuestionType
  setCurrentQuestion: React.Dispatch<React.SetStateAction<QuestionType>>
  stockQuestion: QuestionType
  setStockQuestion: React.Dispatch<React.SetStateAction<QuestionType>>
  disable: boolean
}
const QuestionPicker: React.FC<QuestionPickerProps> = ({
  currentQuestion,
  setCurrentQuestion,
  stockQuestion,
  setStockQuestion,
  disable,
}) => {
  const questionBox = cn(
    "w-full h-56 border-solid border border-grey-500",
    "overflow-auto flex flex-col gap-2 rounded-lg p-4",
    "bg-white/50 shadow-sm overflow-y-scroll",
  )

  return (
    <div
      className={cn(
        "h-full w-full flex flex-col gap-4",
        "rounded-lg bg-gray-50/30",
        disable ? "opacity-90 overflow-y-scroll" : "",
      )}
    >
      {!disable && (
        <div className="w-full flex flex-col gap-2 overflow-y-scroll">
          <div className="flex items-center gap-2 text-gray-700">
            <Label className="font-medium">Available Questions</Label>
          </div>
          <div className={questionBox}>
            {Array.isArray(stockQuestion) || Array.isArray(currentQuestion) ? (
              stockQuestion?.length ? (
                stockQuestion.map((question) => (
                  <QuestionItem
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    stockQuestion={stockQuestion}
                    setStockQuestion={setStockQuestion}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No available questions
                </div>
              )
            ) : null}
          </div>
        </div>
      )}

      {!disable && (
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <ArrowUpDown className="w-6 h-6" />
        </div>
      )}

      <div className="w-full flex flex-col gap-2">
        {!disable && (
          <div className="flex items-center gap-2 text-gray-700">
            <Label className="font-medium">Selected Questions</Label>
          </div>
        )}
        <div className={questionBox}>
          {Array.isArray(stockQuestion) || Array.isArray(currentQuestion) ? (
            currentQuestion?.length ? (
              currentQuestion.map((question) => (
                <QuestionItem
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  currentQuestion={currentQuestion}
                  setCurrentQuestion={setCurrentQuestion}
                  stockQuestion={stockQuestion}
                  setStockQuestion={setStockQuestion}
                  disable={disable}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No questions selected
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default QuestionPicker
