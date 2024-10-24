import { ButtonHTMLAttributes, FC } from "react"
import { cn } from "@/lib/utils.ts"
import { ClassValue } from "clsx"
interface TopBarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isActive?: boolean
}
const TopBarItem: FC<TopBarItemProps> = ({
  title,
  onClick,
  className,
  isActive,
}) => {
  return (
    <button
      className={cn(
        "text-sm font-semibold px-4 rounded-md py-2",
        isActive ? "bg-white text-black hover:bg-iWhiteHover" : "text-gray-500",
        className as ClassValue,
      )}
      onClick={onClick}
      disabled={!onClick}
    >
      {title}
    </button>
  )
}

export default TopBarItem
