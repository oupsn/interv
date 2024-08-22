import SideBarItem from "@/components/layout/SideBarItem.tsx"
import SideBar from "@/components/layout/SideBar.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"

const Dashboard = () => {
  return (
    <>
      <SideBar isSignOutEnabled={true}>
        <SideBarItem title={"Home"} isActive={true} />
      </SideBar>
      <MainPanel></MainPanel>
    </>
  )
}

export default Dashboard
