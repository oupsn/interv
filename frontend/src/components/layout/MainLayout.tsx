import { Outlet } from "react-router-dom"
import { isMobile } from "react-device-detect"
import NotAllowMobile from "@/components/layout/NotAllowMobile.tsx"

export default function MainLayout() {
  if (isMobile) {
    return <NotAllowMobile />
  }

  return (
    <main className="w-dvw h-dvh flex">
      <Outlet />
    </main>
  )
}
