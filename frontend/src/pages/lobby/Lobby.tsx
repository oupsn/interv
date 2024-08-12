import { Button } from "@/components/ui/button.tsx"
import { useNavigate } from "react-router-dom"
import SideBarItem from "@/components/layout/SideBarItem.tsx"
import SideBar from "@/components/layout/SideBar.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"

const NAV_ITEMS = [
  { name: "Help", isActive: false, onCLick: () => console.log("Helppppppp") },
]

const LobbyPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <SideBar>
        <SideBarItem title={"Welcome"} isActive={true} />
        {NAV_ITEMS.map((item) => (
          <SideBarItem
            title={item.name}
            isActive={item.isActive}
            onClick={() => {
              item.onCLick?.()
            }}
          />
        ))}
      </SideBar>
      <MainPanel className={"flex flex-col justify-center items-center gap-8"}>
        <div className={"w-[480px] rounded-xl p-4 space-y-4 text-center"}>
          <p className={"text-2xl font-semibold"}>Hi John Doe</p>
          <p>Please complete all the tasks before wan nan wan nee</p>
        </div>
        <div className={"flex gap-12"}>
          <div
            className={
              "shadow-xl text-center rounded-xl p-8 space-y-4 w-[340px]"
            }
          >
            <p className={"text-2xl font-semibold"}>Video interview</p>
            <p className={""}>1 hour 3 questions</p>
            <Button onClick={() => navigate("video")}>Start</Button>
          </div>
          <div
            className={
              "shadow-xl text-center rounded-xl p-8 space-y-4 w-[340px]"
            }
          >
            <p className={"text-2xl font-semibold"}>Coding interview</p>
            <p className={""}>1 hour 3 questions</p>
            <Button onClick={() => navigate("coding")}>Start</Button>
          </div>
        </div>
      </MainPanel>
    </>
  )
}

export default LobbyPage
