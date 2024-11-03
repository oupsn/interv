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
import React, { useState } from "react"
import DOMPurify from "dompurify"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { FaEdit, FaTrash } from "react-icons/fa"
import { CheckCircle2, XCircle } from "lucide-react"
import { server } from "@/contexts/swr"
import { DialogHeader, DialogFooter } from "@/components/ui/dialog"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { textTruncate } from "../utils/utils"

function QuestionBankCodingDetail() {
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
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const navigate = useNavigate()
  const formatTestCase = (text: string) => {
    return text.split("\\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }
  const handleEdit = (title: string) => {
    navigate(`/portal/question/coding/edit/${encodeURIComponent(title)}`)
  }

  const handleDelete = (id: number) => {
    setDeleteItemId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (deleteItemId) {
      toast.promise(
        server.codingInterview
          .deleteQuestion(deleteItemId)
          .then(() => navigate("/portal/question/coding")),
        {
          loading: "Deleting...",
          success: "Deleted successfully",
          error: "Failed to delete",
        },
      )
    }
    setIsDeleteDialogOpen(false)
    setDeleteItemId(null)
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <>
      {codingQuestion?.data && !error ? (
        <ContentLayout
          title={"Coding Question"}
          breadcrumb={
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/portal/question/coding">Coding Question</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>View</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {textTruncate(codingTitle ?? "", 50)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
              <BreadcrumbList>
                <Button
                  variant="outline"
                  onClick={() => handleEdit(codingTitle!)}
                  size="icon"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(codingQuestion?.data?.id || 0)}
                  size="icon"
                >
                  <FaTrash />
                </Button>
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
                      <h3 className="text-lg font-semibold mb-2">
                        Description
                      </h3>
                      <CardDescription>
                        {parse(cleanDescription)}
                      </CardDescription>
                    </div>
                    {codingQuestion?.data?.input_description && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Input Description
                        </h3>
                        <div>
                          {parse(codingQuestion.data.input_description)}
                        </div>
                      </div>
                    )}
                    {codingQuestion?.data?.output_description && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Output Description
                        </h3>
                        <div>
                          {parse(codingQuestion.data.output_description)}
                        </div>
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
                                width: "40%",
                              }}
                            >
                              Input
                            </th>
                            <th
                              style={{
                                textAlign: "left",
                                padding: "8px",
                                border: "1px solid #ddd",
                                width: "40%",
                              }}
                            >
                              Output
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                                padding: "8px",
                                border: "1px solid #ddd",
                                width: "10%",
                              }}
                            >
                              Hidden
                            </th>
                            <th
                              style={{
                                textAlign: "center",
                                padding: "8px",
                                border: "1px solid #ddd",
                                width: "10%",
                              }}
                            >
                              Example
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
                                <td
                                  style={{
                                    textAlign: "center",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {testcase.is_hidden ? (
                                    <CheckCircle2
                                      className="inline-block text-green-500"
                                      size={20}
                                    />
                                  ) : (
                                    <XCircle
                                      className="inline-block text-red-500"
                                      size={20}
                                    />
                                  )}
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {testcase.is_example ? (
                                    <CheckCircle2
                                      className="inline-block text-green-500"
                                      size={20}
                                    />
                                  ) : (
                                    <XCircle
                                      className="inline-block text-red-500"
                                      size={20}
                                    />
                                  )}
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
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this coding question? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ContentPanel>
        </ContentLayout>
      ) : (
        <ContentLayout
          title={"Coding Question"}
          breadcrumb={
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/portal/question/coding">Coding Question</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>View</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
        >
          <ContentPanel>
            <div>Coding question not found</div>
          </ContentPanel>
        </ContentLayout>
      )}
    </>
  )
}

export default QuestionBankCodingDetail
