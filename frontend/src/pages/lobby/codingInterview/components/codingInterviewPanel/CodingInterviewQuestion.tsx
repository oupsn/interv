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
import {
  DomainsCodingQuestionTestCase,
  DomainsCompilationResultResponse,
} from "@/api/server"
import DOMPurify from "dompurify"

export interface CodingInterviewQuestionProps {
  id: number
  index: number
  title: string
  description: string
  inputDescription: string
  outputDescription: string
  testcaseList: DomainsCodingQuestionTestCase[]
  testcaseCompileResult: DomainsCompilationResultResponse[]
}

const CodingInterviewQuestion: React.FC<CodingInterviewQuestionProps> = ({
  index,
  title,
  description,
  inputDescription,
  outputDescription,
  testcaseList,
}) => {
  const cleanDescription = DOMPurify.sanitize(description)

  const formatTestCase = (text: string) => {
    return text.split("\\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }

  return (
    <Card className="h-full overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Question {index + 1}: {title}
        </CardTitle>
        <CardDescription>{parse(cleanDescription)}</CardDescription>
      </CardHeader>
      <CardContent>
        {inputDescription && (
          <Accordion type="multiple" defaultValue={["input-description"]}>
            <AccordionItem value="input-description">
              <AccordionTrigger className="text-lg font-semibold">
                Input Description
              </AccordionTrigger>
              <AccordionContent>{parse(inputDescription)}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {outputDescription && (
          <Accordion type="multiple" defaultValue={["output-description"]}>
            <AccordionItem value="output-description">
              <AccordionTrigger className="text-lg font-semibold">
                Output Description
              </AccordionTrigger>
              <AccordionContent>{parse(outputDescription)}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <Accordion type="multiple" defaultValue={["test-cases"]}>
          <AccordionItem value="test-cases">
            <AccordionTrigger className="text-lg font-semibold">
              Example Test Cases
            </AccordionTrigger>
            <AccordionContent>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #ddd",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px",
                        border: "1px solid #ddd",
                      }}
                    >
                      Input
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px",
                        border: "1px solid #ddd",
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
                          border: "1px solid #ddd",
                        }}
                      >
                        <pre
                          style={{
                            margin: 0,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {formatTestCase(testcase.input || "")}
                        </pre>
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                        }}
                      >
                        <pre
                          style={{
                            margin: 0,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {formatTestCase(testcase.output || "")}
                        </pre>
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
