import { Label } from "@radix-ui/react-label"
import { DomainsCodingQuestion } from "@/api/server"
import QuestionItem from "@/pages/portal/workspace/components/QuestionItem.tsx"

interface QuestionPickerProps {
  currentQuestion: DomainsCodingQuestion[] | undefined
  setCurrentQuestion: React.Dispatch<
    React.SetStateAction<DomainsCodingQuestion[] | undefined>
  >
  stockQuestion: DomainsCodingQuestion[] | undefined
  setStockQuestion: React.Dispatch<
    React.SetStateAction<DomainsCodingQuestion[] | undefined>
  >
}
const QuestionPicker: React.FC<QuestionPickerProps> = ({
  currentQuestion,
  setCurrentQuestion,
  stockQuestion,
  setStockQuestion,
}) => {
  const questionBox =
    "w-full h-60 border-solid border-2 border-slate-950 overflow-auto flex flex-col gap-0.5 rounded-md shadow-lg"

  return (
    <div className="px-4 size-full flex flex-row size-60 gap-10">
      <div className="w-1/2">
        <Label>Stock Question</Label>
        <div className={questionBox}>
          {stockQuestion?.map((question) => {
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
          })}
        </div>
      </div>

      <div className="w-1/2">
        <Label>Current Question</Label>
        <div className={questionBox}>
          {currentQuestion?.map((question) => {
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
          })}
        </div>
      </div>
    </div>
  )
}

export default QuestionPicker
