import SideBarItem from "@/components/layout/SideBarItem.tsx"
import SideBar from "@/components/layout/SideBar.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"
import { Button } from "@/components/ui/button"
import { useGetListWorkspace } from "@/hooks/useGetListWorkspace.ts"
import { useNavigate } from "react-router-dom"
import ListWorkspaceCard from "./components/ListWorkspace.tsx"

const Portal = () => {
  const { data } = useGetListWorkspace()
  const navigate = useNavigate()

  return (
    <>
      <SideBar isSignOutEnabled={true}>
        <SideBarItem title={"Workspace"} isActive={true} />
        <SideBarItem title={"Assessment"} isActive={false} onClick={() => {}} />
      </SideBar>
      <MainPanel isPaddingTop>
        <div className="flex justify-between">
          <p className="text-4xl font-bold">Candidate Group</p>
          <Button
            className={"text-center"}
            onClick={() => {
              navigate("workspace/create")
            }}
          >
            Add new group
          </Button>
        </div>

        <ListWorkspaceCard workspace={data?.data ?? []} />
      </MainPanel>
    </>
  )
}

export default Portal
