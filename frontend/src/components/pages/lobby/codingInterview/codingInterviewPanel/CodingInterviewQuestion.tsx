import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface CodingInterviewQuestionProps {
  id: number
  title: string
  description: string
  inputList: string[]
  outputList: string[]
}

const CodingInterviewQuestion: React.FC<CodingInterviewQuestionProps> = ({
  id,
  title,
  description,
  inputList,
  outputList,
}) => {
  return (
    <Card className="w-full mx-auto min-h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Question {id}: {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          defaultValue={["input", "output"]}
          className="w-full"
        >
          <AccordionItem value="input">
            <AccordionTrigger>Input Examples</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6">
                {inputList.map((input, index) => (
                  <li key={index} className="my-2">
                    <code className="bg-gray-100 p-1 rounded">{input}</code>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="output">
            <AccordionTrigger>Expected Output</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6">
                {outputList.map((output, index) => (
                  <li key={index} className="my-2">
                    <code className="bg-gray-100 p-1 rounded">{output}</code>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default CodingInterviewQuestion
