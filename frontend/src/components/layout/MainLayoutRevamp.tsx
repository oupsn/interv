import { SideBarRevamp } from "@/components/layout/SideBarRevamp.tsx"
import { Outlet } from "react-router-dom"
import { useSidebarToggle } from "@/hooks/useSidebarToggle.tsx"
import { useStore } from "@/hooks/useStore.tsx"
import { cn } from "@/lib/utils.ts"
import { Footer } from "@/components/layout/Footer.tsx"

export default function MainLayoutRevamp() {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null
  return (
    <main className="w-dvw h-dvh flex">
      <SideBarRevamp />
      <div className={"w-full"}>
        <main
          className={cn(
            "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          )}
        >
          <Outlet />
        </main>
        <footer className={"transition-[margin-left] ease-in-out duration-300"}>
          <Footer />
        </footer>
      </div>
    </main>
  )
}
