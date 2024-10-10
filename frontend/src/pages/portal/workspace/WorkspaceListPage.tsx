import { useGetListWorkspace } from "@/hooks/useGetListWorkspace.ts"
import ListWorkspaceCard from "./components/ListWorkspace.tsx"
import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"
import { Spinner } from "@/components/ui/spinner.tsx"

const WorkspaceListPage = () => {
  const { data, isLoading } = useGetListWorkspace()
  const navigate = useNavigate()
  const handleAdd = () => {
    navigate("/portal/workspace/create")
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
      title={"Workspace"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Workspaces</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            <Button
              variant="outline"
              onClick={() => handleAdd()}
              className="flex flex-row items-center gap-2"
            >
              <Plus />
              Create new
            </Button>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        <ListWorkspaceCard workspace={data?.data ?? []} />
      </ContentPanel>
    </ContentLayout>
  )
}

export default WorkspaceListPage
