import React from "react"
import parse from "html-react-parser"

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
import { DomainsCodingQuestionTestCase } from "@/api/server"
import DOMPurify from "dompurify"

export interface CodingInterviewQuestionProps {
  id: number
  index: number
  title: string
  description: string
  testcaseList: DomainsCodingQuestionTestCase[]
}

const CodingInterviewQuestion: React.FC<CodingInterviewQuestionProps> = ({
  index,
  title,
  description,
  testcaseList,
}) => {
  const cleanDescription = DOMPurify.sanitize(description)
  return (
    <Card className="h-full overflow-y-auto">
      <CardHeader>
        <CardTitle>
          Question {index + 1}: {title}
        </CardTitle>
        <CardDescription>{parse(cleanDescription)}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={["test-cases"]}>
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
