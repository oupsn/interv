import { Link, useParams } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import { useGetIndividualUser } from "@/hooks/userGetIndividualUser"
import { Spinner } from "@/components/ui/spinner"

const CandidateDetailPage = () => {
  const { workspaceId, candidateId } = useParams()
  const { data, isLoading } = useGetIndividualUser(
    Number(candidateId),
    Number(workspaceId),
  )
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    )
  }
  return (
    <>
      <ContentLayout
        title={data?.data?.userData.name ?? ""}
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/portal/workspace">Workspaces</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link
                  to={"/portal/workspace/" + workspaceId + "/candidateList"}
                >
                  Applicant List
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {data?.data?.userData.name ?? ""}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <ContentPanel>
          <div className="text-xl mt-5 flex flex-col"></div>
        </ContentPanel>
      </ContentLayout>
    </>
  )
}

export default CandidateDetailPage
