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

const WorkspaceListPage = () => {
  const { data } = useGetListWorkspace()

  return (
    <ContentLayout title={"Workspace"}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Workspaces</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ContentPanel>
        <ListWorkspaceCard workspace={data?.data ?? []} />
      </ContentPanel>
    </ContentLayout>
  )
}

export default WorkspaceListPage
