import { FC, HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils.ts"
import { ClassValue } from "clsx"

interface MainPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}
const MainPanel: FC<MainPanelProps> = ({ children, className }) => {
  return (
    <div className={cn("w-full h-full p-4", className as ClassValue)}>
      {children}
    </div>
  )
}

export default MainPanel
