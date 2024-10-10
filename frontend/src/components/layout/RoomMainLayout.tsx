import { Outlet, useParams, useSearchParams } from "react-router-dom"
import { isMobile } from "react-device-detect"
import NotAllowMobile from "@/components/layout/NotAllowMobile.tsx"
import { useEffect, useState } from "react"
import MainPanel from "@/components/layout/MainPanel.tsx"
import { server } from "@/contexts/swr.tsx"
import Cookies from "js-cookie"
import { Toaster } from "sonner"
import LoadingWrapper from "@/components/shared/LoadingWrapper.tsx"

export default function RoomMainLayout() {
  const [isAllowMobile, setIsAllowMobile] = useState(false)
  const [isAuthedCandidate, setIsAuthedCandidate] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [URLSearchParams] = useSearchParams()
  const { roomId } = useParams()

  useEffect(() => {
    server.room
      .checkAuthCandidate({
        roomId: roomId!,
        rt: Cookies.get("rt") ?? URLSearchParams.get("rt") ?? "",
      })
      .then(() => {
        setIsAuthedCandidate(true)
      })
      .finally(() => {
        setIsAuthLoading(false)
      })
  }, [roomId, URLSearchParams])

  if (isMobile && !isAllowMobile) {
    return <NotAllowMobile setIsAllowMobile={setIsAllowMobile} />
  }

  if (isAuthLoading) {
    return <LoadingWrapper isLoading={isAuthLoading} text={""}></LoadingWrapper>
  } else {
    if (!isAuthedCandidate) {
      return (
        <MainPanel
          className={"h-dvh flex flex-col justify-center text-center space-y-4"}
        >
          <p>TODO: Might change wording someday</p>
          <p>
            Please try to access this interview via email invitation again, or
            contact the interview owner if you believe something seems wrong.
          </p>
          <p>Need more info? Email: help@interv.cc</p>
        </MainPanel>
      )
    } else {
      return (
        <main className="w-dvw h-dvh flex">
          <Toaster />
          <Outlet />
        </main>
      )
    }
  }
}
