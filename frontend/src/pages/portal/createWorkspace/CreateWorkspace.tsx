import SideBarItem from "@/components/layout/SideBarItem.tsx"
import SideBar from "@/components/layout/SideBar.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"

const CreateWorkspace = () => {
  return (
    <>
      <SideBar isSignOutEnabled={true}>
        <SideBarItem title={"Candidate"} isActive={true} />
        <SideBarItem title={"Assessment"} isActive={false} onClick={() => {}} />
      </SideBar>
      <MainPanel></MainPanel>
    </>
  )
}

export default CreateWorkspace
