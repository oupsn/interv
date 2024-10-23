import { Outlet } from "react-router-dom"
import { isMobile } from "react-device-detect"
import NotAllowMobile from "@/components/layout/NotAllowMobile.tsx"
import { useState } from "react"
export default function RoomMainLayout() {
  const [isAllowMobile, setIsAllowMobile] = useState(false)
  if (isMobile && !isAllowMobile) {
    return <NotAllowMobile setIsAllowMobile={setIsAllowMobile} />
  }

  return (
    <main className="w-dvw h-dvh flex flex-col">
      <Outlet />
    </main>
  )
}
