import SideBar from "@/components/layout/SideBar.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"
import SideBarItem from "@/components/layout/SideBarItem.tsx"
import { Outlet, useNavigate } from "react-router-dom"

const AssessmentPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <SideBar>
        <SideBarItem
          title={"Video"}
          onClick={() => {
            navigate("video")
          }}
        />
        <SideBarItem
          title={"Coding"}
          onClick={() => {
            navigate("coding")
          }}
        />
      </SideBar>
      <MainPanel>
        <Outlet />
      </MainPanel>
    </>
  )
}

export default AssessmentPage
