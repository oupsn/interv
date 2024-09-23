import SideBarItem from "@/components/layout/SideBarItem.tsx"
import SideBar from "@/components/layout/SideBar.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"
import { Button } from "@/components/ui/button"
import { useGetListWorkspace } from "@/hooks/useGetListWorkspace.ts"
import { useNavigate } from "react-router-dom"
import ListWorkspaceCard from "./components/ListWorkspace.tsx"

const Dashboard = () => {
  const { data } = useGetListWorkspace()
  const navigate = useNavigate()

  return (
    <>
      <SideBar isSignOutEnabled={true}>
        <SideBarItem title={"Workspace"} isActive={true} />
        <SideBarItem title={"Assessment"} isActive={false} onClick={() => {}} />
      </SideBar>
      <MainPanel>
        <div className="w-full mt-8 p-10 grid gap-10">
          <div className="flex justify-between">
            <p className="text-5xl font-bold text-gray-900">Candidate Group</p>
            <Button
              className={
                "w-52 h-14 text-center font-semibold text-xl rounded-xl disabled:opacity-100"
              }
              onClick={() => {
                navigate("workspace/create")
              }}
            >
              Add new group
            </Button>
          </div>

          <ListWorkspaceCard workspace={data?.data ?? []} />
        </div>
      </MainPanel>
    </>
  )
}

export default Dashboard
