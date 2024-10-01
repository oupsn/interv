import React from "react"
import { LoadingContext } from "@/contexts/loading"
import { Button } from "@/components/ui/button"

interface CodingInterviewInstructionProps {
  title: string
  description: string
  clickStart: () => void
}

const CodingInterviewInstruction: React.FC<CodingInterviewInstructionProps> = ({
  title,
  description,
  clickStart,
}) => {
  const { setLoading } = React.useContext(LoadingContext)
  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      return setLoading(false)
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-md font-normal">{description}</p>
        <Button
          className="mt-4 px-4 py-2 text-white  rounded-md"
          onClick={clickStart}
        >
          Start
        </Button>
      </div>
    </>
  )
}

export default CodingInterviewInstruction
