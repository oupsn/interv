import { Outlet } from "react-router-dom"
import { isMobile } from "react-device-detect"
import NotAllowMobile from "@/components/layout/NotAllowMobile.tsx"
import { useState } from "react"

export default function MainLayout() {
  const [isAllowMobile, setIsAllowMobile] = useState(false)
  if (isMobile && !isAllowMobile) {
    return <NotAllowMobile setIsAllowMobile={setIsAllowMobile} />
  }

  return (
    <main className="w-dvw h-dvh flex">
      <Outlet />
    </main>
  )
}
