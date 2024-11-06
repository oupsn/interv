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
import { toast } from "sonner"
import useCurrentUser from "@/hooks/UseCurrentUser"

const WorkspaceInterestPage = () => {
  const [page, setPage] = useState(1)
  const { currentUser } = useCurrentUser()
  const size = 10
  const { workspaceId } = useParams()
  const { data, isLoading } = useGetWorkspace(
    Number(workspaceId),
    Number(currentUser.portalId),
  )
  const interest = data?.data
    ? data?.data?.userInWorkspace?.filter((candidate) => candidate.isInterest)
    : []
  const truncatedTitle = data?.data?.title
    ? data.data.title.length > 15
      ? `${data.data.title.slice(0, 15)}...`
      : data.data.title
    : ""

  const handleExportFile = () => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        if (interest && interest.length > 0) {
          const interestedUsers = interest.map((candidate) => ({
            name: candidate.name,
            username: candidate.username,
          }))

          const csvRows = [
            ["name", "email"],
            ...interestedUsers.map((user) => [user.name, user.username]),
          ]

          const csvContent = csvRows.map((row) => row.join(",")).join("\n")
          const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
          })
          saveAs(blob, `${data?.data?.title}_candidates.csv`)

          resolve()
        } else {
          reject(new Error("No candidates found"))
        }
      }),
      {
        loading: "Exporting file...",
        success: "File exported successfully!",
        error: "No interested users to export",
      },
    )
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
      title="Candidate List"
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
              <BreadcrumbLink asChild>
                <Link to={"/portal/workspace/" + workspaceId}>
                  {truncatedTitle}
                </Link>
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
                listScore={data?.data?.workspaceScore ?? {}}
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
