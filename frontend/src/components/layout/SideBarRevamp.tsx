import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebarToggle } from "@/hooks/useSidebarToggle.tsx"
import { useStore } from "@/hooks/useStore.tsx"
import { Menu } from "@/components/layout/Menu.tsx"
import { SidebarToggle } from "@/components/layout/SidebarToggle.tsx"
import { Link } from "react-router-dom"
import IntervLogo from "@/assets/interv-logo.png"

export function SideBarRevamp() {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <aside
      className={cn(
        "h-full relative transition-[width] ease-in-out duration-300 z-20",
        sidebar?.isOpen === false ? "w-[90px]" : "w-80",
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link to="/portal/workspace">
            <img src={IntervLogo} alt="interv" className="w-40" />
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  )
}
