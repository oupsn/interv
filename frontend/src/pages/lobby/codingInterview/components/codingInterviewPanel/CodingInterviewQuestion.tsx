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
  exampleInputList: string[]
  exampleOutputList: string[]
  testcaseList: { input: string; output: string }[]
}

const CodingInterviewQuestion: React.FC<CodingInterviewQuestionProps> = ({
  id,
  title,
  description,
  exampleInputList,
  exampleOutputList,
  testcaseList,
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          Question {id}: {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          defaultValue={["input-examples", "output-examples", "test-cases"]}
        >
          <AccordionItem value="input-examples">
            <AccordionTrigger>Input Examples</AccordionTrigger>
            <AccordionContent>
              <ul>
                {exampleInputList.map((input, index) => (
                  <li key={index}>{input}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="output-examples">
            <AccordionTrigger>Expected Output</AccordionTrigger>
            <AccordionContent>
              <ul>
                {exampleOutputList.map((output, index) => (
                  <li key={index}>{output}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="test-cases">
            <AccordionTrigger>Test Cases</AccordionTrigger>
            <AccordionContent>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      Input
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      Output
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {testcaseList.map((testcase, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {testcase.input}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {testcase.output}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default CodingInterviewQuestion
