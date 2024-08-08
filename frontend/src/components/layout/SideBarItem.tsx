import React from "react"
import { cn } from "@/lib/utils.ts"

type SideBarItemProps = {
  title: string
  isActive?: boolean
  onClick?: () => void
}
const SideBarItem: React.FC<SideBarItemProps> = ({
  title,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "w-full p-4 text-center font-semibold text-xl rounded-xl bg",
        isActive ? "bg-iGreen text-white" : "",
        onClick ? "hover:bg-iWhiteHover cursor-pointer" : "",
      )}
      onClick={onClick}
    >
      {title}
    </div>
  )
}

export default SideBarItem
