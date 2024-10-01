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

function QuestionBankVideoDetail() {
  const { videoQuestionId } = useParams()
  const navigate = useNavigate()
  const handleEdit = (id: number) => {
    navigate(`/portal/question/video/${encodeURIComponent(id)}/edit`)
  }

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
        This is detail page for video question ID {videoQuestionId}
      </ContentPanel>
    </ContentLayout>
  )
}

export default QuestionBankVideoDetail
