import { Label } from "@radix-ui/react-label"
import AssessmentItem from "./AssessmentItem"
import { DomainsCodingQuestion } from "@/api/server"

interface AssessmentPickerProps {
  currentAssessment: DomainsCodingQuestion[] | undefined
  setCurrentAssessment: React.Dispatch<
    React.SetStateAction<DomainsCodingQuestion[] | undefined>
  >
  stockAssessment: DomainsCodingQuestion[] | undefined
  setStockAssessment: React.Dispatch<
    React.SetStateAction<DomainsCodingQuestion[] | undefined>
  >
}
const AssessmentPicker: React.FC<AssessmentPickerProps> = ({
  currentAssessment,
  setCurrentAssessment,
  stockAssessment,
  setStockAssessment,
}) => {
  const assessmentBox =
    "w-full h-60 border-solid border-2 border-slate-950 overflow-auto flex flex-col gap-0.5 rounded-md shadow-lg"

  return (
    <div className="px-4 size-full flex flex-row size-60 gap-10">
      <div className="w-1/2">
        <Label>Stock Assessment</Label>
        <div className={assessmentBox}>
          {stockAssessment?.map((assessment) => {
            return (
              <AssessmentItem
                key={assessment.id}
                id={assessment?.id}
                title={assessment?.title}
                currentAssessment={currentAssessment}
                setCurrentAssessment={setCurrentAssessment}
                stockAssessment={stockAssessment}
                setStockAssessment={setStockAssessment}
              />
            )
          })}
        </div>
      </div>

      <div className="w-1/2">
        <Label>Current Assessment</Label>
        <div className={assessmentBox}>
          {currentAssessment?.map((assessment) => {
            return (
              <AssessmentItem
                key={assessment.id}
                id={assessment?.id}
                title={assessment?.title}
                currentAssessment={currentAssessment}
                setCurrentAssessment={setCurrentAssessment}
                stockAssessment={stockAssessment}
                setStockAssessment={setStockAssessment}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AssessmentPicker
