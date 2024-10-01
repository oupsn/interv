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
import { Link, useParams } from "react-router-dom"

function AssessmentVideoDetail() {
  const { videoQuestionId } = useParams()
  return (
    <ContentLayout
      title={"Coding Questions"}
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
              <BreadcrumbPage>Id</BreadcrumbPage>
            </BreadcrumbItem>
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

export default AssessmentVideoDetail
