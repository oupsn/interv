import { FC, ReactNode } from "react"
import IntervLogo from "@/assets/interv-logo.png"
import { Button } from "@/components/ui/button.tsx"

interface TopBarProps {
  children?: ReactNode
  isCodingInterview?: boolean
}

const TopBar: FC<TopBarProps> = ({ children, isCodingInterview }) => {
  const handleReportIssue = () => {
    window.location.href = "mailto:interv.cc"
  }

  return (
    <div className="flex flex-row justify-between w-full outline outline-1 outline-gray-200 px-16 items-center">
      <div className={"flex gap-10"}>
        <img src={IntervLogo} alt="interv" className="w-28 mb-2" />
        <div
          style={{
            justifyContent: isCodingInterview ? "end" : "start",
            marginTop: isCodingInterview ? "0px" : "16px",
          }}
        >
          {children}
        </div>
      </div>
      <Button
        variant={"outline"}
        onClick={handleReportIssue}
        className="text-red-500 hover:text-red-500 text-sm font-semibold text-nowrap border border-red-500 rounded-md px-4"
      >
        Report Issue
      </Button>
    </div>
  )
}

export default TopBar
