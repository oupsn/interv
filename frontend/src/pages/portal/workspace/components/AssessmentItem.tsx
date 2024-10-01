import { DomainsCodingQuestion } from "@/api/server"
import React from "react"

interface AssessmentItemProps {
  id: number | undefined
  title: string | undefined
  currentAssessment: DomainsCodingQuestion[] | undefined
  setCurrentAssessment: React.Dispatch<
    React.SetStateAction<DomainsCodingQuestion[] | undefined>
  >
  stockAssessment: DomainsCodingQuestion[] | undefined
  setStockAssessment: React.Dispatch<
    React.SetStateAction<DomainsCodingQuestion[] | undefined>
  >
}
const AssessmentItem: React.FC<AssessmentItemProps> = ({
  id,
  title,
  currentAssessment,
  setCurrentAssessment,
  stockAssessment,
  setStockAssessment,
}) => {
  return (
    <>
      <div
        className="w-full flex justify-start bg-zinc-100 p-2 text-lg "
        onClick={() => {
          for (const asm of stockAssessment ?? []) {
            if (asm?.id == id) {
              setStockAssessment(
                stockAssessment?.filter((assessment) => assessment.id != id),
              )
              setCurrentAssessment((currentAssessment) =>
                [...(currentAssessment ?? []), asm].sort(),
              )
              break
            }
          }
          for (const asm of currentAssessment ?? []) {
            if (asm?.id == id) {
              setCurrentAssessment(
                currentAssessment?.filter((assessment) => assessment.id != id),
              )
              setStockAssessment((stockAssessment) =>
                [...(stockAssessment ?? []), asm].sort(),
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
export default AssessmentItem
