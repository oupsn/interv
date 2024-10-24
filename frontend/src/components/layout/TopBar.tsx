import { FC, ReactNode } from "react"
import IntervLogo from "@/assets/interv-logo.png"

interface TopBarProps {
  children?: ReactNode
}

const TopBar: FC<TopBarProps> = ({ children }) => {
  const handleReportIssue = () => {
    window.location.href = "mailto:interv.cc"
  }

  return (
    <div className="flex flex-row justify-between w-full outline outline-1 outline-gray-200 py-4 px-16 items-center">
      <img src={IntervLogo} alt="interv" className="w-28" />
      <div className="flex flex-row w-full items-center h-full mt-4 ml-12">
        {children}
      </div>
      <button
        onClick={handleReportIssue}
        className="text-red-500 text-sm font-semibold text-nowrap border border-red-500 rounded-md px-4 h-12 "
      >
        Report Issue
      </button>
    </div>
  )
}

export default TopBar
