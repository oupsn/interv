import { Outlet, useSearchParams } from "react-router-dom"
import { isMobile } from "react-device-detect"
import NotAllowMobile from "@/components/layout/NotAllowMobile.tsx"
import { useEffect, useState } from "react"

export default function MainLayout() {
  const [isAllowMobile, setIsAllowMobile] = useState(false)
  const [rt, setRt] = useState("")
  const [URLSearchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    if (URLSearchParams.get("rt")) {
      setRt(URLSearchParams.get("rt")!)
    } else {
      setSearchParams((params) => {
        params.set("rt", rt)
        return params
      })
    }
  }, [URLSearchParams, rt, setSearchParams])

  if (isMobile && !isAllowMobile) {
    return <NotAllowMobile setIsAllowMobile={setIsAllowMobile} />
  }

  return (
    <main className="w-dvw h-dvh flex">
      <Outlet />
    </main>
  )
}
