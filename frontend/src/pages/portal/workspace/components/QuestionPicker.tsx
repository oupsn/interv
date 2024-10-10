import { Label } from "@radix-ui/react-label"
import {
  DomainsCodingQuestion,
  GetVideoQuestionByPortalIdResponse,
} from "@/api/server"
import QuestionItem from "@/pages/portal/workspace/components/QuestionItem.tsx"
import { cn } from "@/lib/utils"

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
  const questionBox =
    "w-full h-56 border-solid border border-grey-500 overflow-auto flex flex-col gap-0.5 rounded-lg"

  return (
    <div
      className={cn(
        "h-full w-full flex flex-col gap-2 text-sm",
        disable ? "opacity-90 pointer-events-none" : "",
      )}
    >
      {!disable ? (
        <div className="w-full flex flex-col">
          <Label>Stock Question</Label>
          <div className={questionBox}>
            {Array.isArray(stockQuestion) || Array.isArray(currentQuestion) ? (
              stockQuestion?.map((question) => {
                return (
                  <QuestionItem
                    key={question.id}
                    id={question?.id}
                    title={question?.title}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    stockQuestion={stockQuestion}
                    setStockQuestion={setStockQuestion}
                  />
                )
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      {!disable ? (
        <div className="flex justify-center text-5xl font-medium gap-5">
          {"↑↓"}
        </div>
      ) : (
        <></>
      )}

      <div className="w-full flex flex-col">
        {!disable ? <Label>Picked Question</Label> : <></>}
        <div className={questionBox}>
          {Array.isArray(stockQuestion) || Array.isArray(currentQuestion) ? (
            currentQuestion?.map((question) => {
              return (
                <QuestionItem
                  key={question.id}
                  id={question?.id}
                  title={question?.title}
                  currentQuestion={currentQuestion}
                  setCurrentQuestion={setCurrentQuestion}
                  stockQuestion={stockQuestion}
                  setStockQuestion={setStockQuestion}
                />
              )
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionPicker
