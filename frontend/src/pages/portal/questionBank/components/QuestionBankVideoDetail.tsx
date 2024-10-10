import { ContentLayout } from "@/components/layout/ContentLayout"
import ContentPanel from "@/components/layout/ContentPanel"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Spinner } from "@/components/ui/spinner.tsx"
import { useGetVideoQuestionDetail } from "@/hooks/useGetVideoQuestionDetail.ts"

function QuestionBankVideoDetail() {
  const { videoQuestionId } = useParams()
  const navigate = useNavigate()
  const handleEdit = (id: number) => {
    navigate(`/portal/question/video/${encodeURIComponent(id)}/edit`)
  }
  const {
    data: videoQuestion,
    isLoading,
    error,
  } = useGetVideoQuestionDetail(parseInt(videoQuestionId!))

  const handleDelete = (id: number) => {
    console.log("delete", id)
  }

  return (
    <ContentLayout
      title={"Video Question"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/portal/question/video">Video Questions</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Question {videoQuestionId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            <Button
              variant="outline"
              onClick={() => handleEdit(parseInt(videoQuestionId!))}
              size="icon"
            >
              <FaEdit />
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDelete(parseInt(videoQuestionId!))}
              size="icon"
            >
              <FaTrash />
            </Button>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div>Error: {error.message}</div>
          </div>
        ) : (
          <div className={"space-y-6"}>
            <div>
              <p className="text-lg font-semibold mb-2">Question Title</p>
              <div>{videoQuestion?.data?.title}</div>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">Time To Prepare</p>
              <div>{videoQuestion?.data?.timeToPrepare}</div>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">Time To Answer</p>
              <div>{videoQuestion?.data?.timeToAnswer}</div>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">Max Attempt</p>
              <div>{videoQuestion?.data?.totalAttempt}</div>
            </div>
          </div>
        )}
      </ContentPanel>
    </ContentLayout>
  )
}

export default QuestionBankVideoDetail
