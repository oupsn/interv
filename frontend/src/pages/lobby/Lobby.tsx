import { Button } from "@/components/ui/button.tsx"
import { useNavigate } from "react-router-dom"
import SideBarItem from "@/pages/lobby/components/SideBarItem.tsx"
import SideBar from "@/pages/lobby/components/SideBar.tsx"

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
      <div
        className={"flex flex-col justify-center items-center w-full h-full"}
      >
        <div className={"w-[480px] rounded-xl p-4 space-y-4 text-center"}>
          <p className={"text-2xl font-semibold"}>Hi John Doe</p>
          <p>Please complete all the tasks before wan nan wan nee</p>
        </div>
        <div className={"flex gap-12"}>
          <div
            className={
              "shadow-xl text-center rounded-xl p-8 space-y-4 w-[300px]"
            }
          >
            <p className={"text-2xl font-semibold"}>Video interview</p>
            <p className={""}>1 hour 3 questions</p>
            <Button onClick={() => navigate("video")}>Start</Button>
          </div>
          <div
            className={
              "shadow-xl text-center rounded-xl p-8 space-y-4 w-[300px]"
            }
          >
            <p className={"text-2xl font-semibold"}>Coding interview</p>
            <p className={""}>1 hour 3 questions</p>
            <Button onClick={() => navigate("coding")}>Start</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LobbyPage
