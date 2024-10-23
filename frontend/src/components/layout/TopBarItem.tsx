import { ButtonHTMLAttributes, FC } from "react"
import { cn } from "@/lib/utils.ts"
import { ClassValue } from "clsx"
import { Button } from "@/components/ui/button.tsx"

interface TopBarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isActive?: boolean
}
const TopBarItem: FC<TopBarItemProps> = ({
  title,
  isActive = false,
  onClick,
  className,
}) => {
  return (
    <Button
      className={cn(
        "text-center text-md rounded-xl disabled:opacity-100",
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

export default TopBarItem
