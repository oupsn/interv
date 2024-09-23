import { FC, HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils.ts"
import { ClassValue } from "clsx"

interface MainPanelProps extends HTMLAttributes<HTMLDivElement> {
  isPaddingTop?: boolean
  children?: ReactNode
}
const MainPanel: FC<MainPanelProps> = ({
  isPaddingTop = false,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full h-full p-10 relative space-y-10 overflow-y-auto",
        className as ClassValue,
        isPaddingTop ? "pt-12" : undefined,
      )}
    >
      {children}
    </div>
  )
}

export default MainPanel
