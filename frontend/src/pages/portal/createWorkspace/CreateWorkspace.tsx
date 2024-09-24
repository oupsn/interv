import SideBarItem from "@/components/layout/SideBarItem.tsx"
import SideBar from "@/components/layout/SideBar.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"
import { Outlet } from "react-router-dom"

const CreateWorkspace = () => {
  return (
    <>
      <SideBar isSignOutEnabled={true}>
        <SideBarItem title={"Candidate"} isActive={true} />
        <SideBarItem title={"Assessment"} isActive={false} onClick={() => {}} />
      </SideBar>
      <MainPanel>
        <Outlet />
      </MainPanel>
    </>
  )
}

export default CreateWorkspace
