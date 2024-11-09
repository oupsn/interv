import { FC, ReactNode } from "react"
import IntervLogo from "@/assets/interv-logo.png"
import { Button } from "@/components/ui/button.tsx"
import TopBarItem from "./TopBarItem"

interface TopBarProps {
  children?: ReactNode
  timeRemain?: string
}

const TopBar: FC<TopBarProps> = ({ children, timeRemain }) => {
  const handleReportIssue = () => {
    window.location.href = "mailto:interv.cc"
  }

  return (
    <div className="flex flex-row justify-between w-full outline outline-1 outline-gray-200 px-16 items-center">
      <div className={"flex gap-10 flex-row items-center justify-between"}>
        <img src={IntervLogo} alt="interv" className="w-28 mb-2" />
        <div>{children}</div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        {timeRemain !== undefined && timeRemain !== "" && (
          <TopBarItem title={"Time Remaining: " + timeRemain} />
        )}
        <Button
          variant={"outline"}
          onClick={handleReportIssue}
          className="text-red-500 hover:text-red-500 text-sm font-semibold text-nowrap border border-red-500 md:flex hidden rounded-md px-4"
        >
          Report Issue
        </Button>
      </div>
    </div>
  )
}

export default TopBar
