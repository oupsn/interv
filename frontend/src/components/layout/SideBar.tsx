import React from "react"
import IntervLogo from "@/assets/interv-logo.png"

type SideBarProps = {
  children?: React.ReactNode
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  return (
    <div className="min-w-[300px] max-w-[300px] flex flex-col items-center gap-8 outline outline-1 outline-gray-200 p-4">
      <img src={IntervLogo} alt="interv" className="w-40" />
      {children}
    </div>
  )
}

export default SideBar
