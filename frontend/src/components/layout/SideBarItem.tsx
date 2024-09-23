import { ButtonHTMLAttributes, FC } from "react"
import { cn } from "@/lib/utils.ts"
import { ClassValue } from "clsx"
import { Button } from "@/components/ui/button.tsx"

interface SideBarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isActive?: boolean
}
const SideBarItem: FC<SideBarItemProps> = ({
  title,
  isActive = false,
  onClick,
  className,
}) => {
  return (
    <Button
      className={cn(
        "w-full h-16 text-center font-semibold text-xl rounded-xl disabled:opacity-100",
        !isActive ? "bg-white text-black hover:bg-iWhiteHover" : "",
        className as ClassValue,
      )}
      onClick={onClick}
      disabled={!onClick}
    >
      {title}
    </Button>
  )
}

export default SideBarItem
