import { SideBarRevamp } from "@/components/layout/SideBarRevamp.tsx"
import { Outlet } from "react-router-dom"
import { useSidebarToggle } from "@/hooks/useSidebarToggle.tsx"
import { useStore } from "@/hooks/useStore.tsx"
import { Footer } from "@/components/layout/Footer.tsx"

export default function MainLayoutRevamp() {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null
  return (
    <main className="max-h-dvh flex ">
      <SideBarRevamp />
      <div className={"flex flex-col w-full max-h-full bg-zinc-50"}>
        <Outlet />
        <Footer />
      </div>
    </main>
  )
}
