import { useParams } from "react-router-dom"
import { useGetWorkspace } from "@/hooks/useGetWorkspace"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import { Label } from "@radix-ui/react-label"
import dayjs from "dayjs"
import { Spinner } from "@/components/ui/spinner"

const CandidateDetailPage = () => {
  const { workspaceId } = useParams()
  const { data, isLoading } = useGetWorkspace(Number(workspaceId))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    )
  }
  return (
    <ContentLayout
      title={data?.data?.workspaceDetail.title ?? ""}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Create Workspace</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        <div className="text-xl mt-5 flex flex-col">
          <Label>Workspace title: {data?.data?.workspaceDetail.title}</Label>
          <Label>
            Start Date:{" "}
            {dayjs(data?.data?.workspaceDetail.startDate).format("MM/DD/YYYY")}
          </Label>
          <Label>
            End Date:{" "}
            {dayjs(data?.data?.workspaceDetail.endDate).format("MM/DD/YYYY")}
          </Label>
          <Label>
            Have Video Question:
            {data?.data?.workspaceDetail.isVideo?.toString()}
          </Label>
          <Label>
            Have Coding Question:
            {data?.data?.workspaceDetail.isCoding?.toString()}
          </Label>
          <Label>
            Coding Time: {data?.data?.workspaceDetail.codingTime?.toString()}{" "}
            mins
          </Label>
          <Label>Portal Id: {data?.data?.workspaceDetail.portalId}</Label>
          <Label>
            Require Camera: {data?.data?.workspaceDetail.reqScreen?.toString()}
          </Label>
          <Label>
            Require Microphone:
            {data?.data?.workspaceDetail.reqMicrophone?.toString()}
          </Label>
          <Label>
            Require Camera: {data?.data?.workspaceDetail.reqCamera?.toString()}
          </Label>
          <Label>
            Number of candidate:{data?.data?.workspaceDetail.memberNum}
          </Label>
        </div>
      </ContentPanel>
    </ContentLayout>
  )
}

export default CandidateDetailPage
