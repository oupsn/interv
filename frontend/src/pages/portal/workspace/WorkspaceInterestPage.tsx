import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useGetWorkspace } from "@/hooks/useGetWorkspace"
import ListUser from "./components/ListUser"
import { saveAs } from "file-saver"
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
import Panigator from "./components/Panigator"
import { Spinner } from "@/components/ui/spinner"

const WorkspaceInterestPage = () => {
  const [page, setPage] = useState(1)
  const size = 4
  const { workspaceId } = useParams()
  const { data, isLoading } = useGetWorkspace(Number(workspaceId))
  const interest = data?.data?.individualUser
    ? data?.data?.individualUser.filter(
        (candidate) => candidate.userInWorkspace.isInterest,
      )
    : []

  const handleExportFile = () => {
    const interestedUsers =
      interest?.map((candidate) => ({
        name: candidate.userData?.name,
        username: candidate.userData?.username,
      })) ?? []

    const csvRows = [
      ["name", "username"],
      ...interestedUsers.map((user) => [user.name, user.username]),
    ]

    const csvContent = csvRows.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, data?.data?.workspaceDetail.title + "interested_users.csv")
  }
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
              <BreadcrumbLink asChild>
                <Link to="/portal/workspace">Workspaces</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Candidate List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            <Button
              onClick={() => {
                handleExportFile()
              }}
            >
              Export List
            </Button>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        {interest ? (
          <Panigator
            dataLength={interest ? interest.length : 0}
            children={
              <ListUser
                listUser={interest ?? []}
                page={page}
                size={size}
                workspace={Number(workspaceId)}
              />
            }
            size={size}
            page={page}
            setPage={setPage}
          />
        ) : (
          <></>
        )}
      </ContentPanel>
    </ContentLayout>
  )
}

export default WorkspaceInterestPage
