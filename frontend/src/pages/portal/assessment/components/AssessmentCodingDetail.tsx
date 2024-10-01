import { ContentLayout } from "@/components/layout/ContentLayout"
import ContentPanel from "@/components/layout/ContentPanel"
import parse from "html-react-parser"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetCodingInterviewQuestionByTitle } from "@/hooks/useGetCodingInterviewQuestionByTitle"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useEffect } from "react"
import DOMPurify from "dompurify"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

function AssessmentCodingDetail() {
  const { codingTitle } = useParams()
  const {
    data: codingQuestion,
    isLoading,
    error,
  } = useGetCodingInterviewQuestionByTitle(
    encodeURIComponent(codingTitle ?? ""),
  )
  const cleanDescription = DOMPurify.sanitize(
    codingQuestion?.data?.description || "",
  )
  const navigate = useNavigate()
  const formatTestCase = (text: string) => {
    return text.split("\\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }
  useEffect(() => {
    console.log(codingQuestion)
  }, [codingQuestion])
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <ContentLayout
      title={"Coding Assessments"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/portal/assessment/coding">Coding Assessments</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>View</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{codingTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        <Card className="h-full overflow-y-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                {codingQuestion?.data?.title}
              </CardTitle>
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() =>
                    navigate(
                      `/portal/assessment/coding/edit/${codingQuestion?.data?.title}`,
                    )
                  }
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="question" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="question" className="w-full">
                  Question
                </TabsTrigger>
                <TabsTrigger value="testcases" className="w-full">
                  Test Cases
                </TabsTrigger>
              </TabsList>
              <TabsContent value="question" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <CardDescription>{parse(cleanDescription)}</CardDescription>
                </div>
                {codingQuestion?.data?.input_description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Input Description
                    </h3>
                    <div>{parse(codingQuestion.data.input_description)}</div>
                  </div>
                )}
                {codingQuestion?.data?.output_description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Output Description
                    </h3>
                    <div>{parse(codingQuestion.data.output_description)}</div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="testcases">
                {codingQuestion?.data?.test_case && (
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
                      {codingQuestion?.data?.test_case.map(
                        (testcase, index) => (
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
                        ),
                      )}
                    </tbody>
                  </table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </ContentPanel>
    </ContentLayout>
  )
}

export default AssessmentCodingDetail
