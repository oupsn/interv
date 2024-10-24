import { Outlet, useParams } from "react-router-dom"
import { isMobile } from "react-device-detect"
import NotAllowMobile from "@/components/layout/NotAllowMobile.tsx"
import { useEffect, useState } from "react"
import { server } from "@/contexts/swr.tsx"
import IntervLogo from "@/assets/interv-logo.png"
import { nanoid } from "nanoid"
import { Spinner } from "@/components/ui/spinner.tsx"
import TermsModal from "@/components/ui/term-modal.tsx"
export default function RoomMainLayout() {
  const { roomId } = useParams()
  const [isSessionValid, setIsSessionValid] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  useEffect(() => {
    if (!window.name) {
      const si = nanoid(10)
      window.name = si
      server.room
        .getRoomSession({ roomId: roomId! })
        .then((res) => {
          if (res.data == si) {
            server.room.extendRoomSession({
              roomId: roomId!,
              sessionIdentifier: si,
            })
          } else {
            setIsSessionValid(false)
          }
        })
        .catch(() => {
          setIsSessionValid(true)
        })
        .finally(() => {
          setIsCheckingSession(false)
        })
    } else {
      server.room
        .getRoomSession({ roomId: roomId! })
        .then((res) => {
          if (res.data == window.name) {
            setIsSessionValid(true)
          } else {
            setIsSessionValid(false)
          }
        })
        .catch(() => {
          setIsSessionValid(true)
        })
        .finally(() => {
          setIsCheckingSession(false)
        })
    }

    const intervalId = setInterval(() => {
      if (isSessionValid) {
        server.room.extendRoomSession({
          roomId: roomId!,
          sessionIdentifier: window.name,
        })
      }
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [isSessionValid, roomId])

  const [isAllowMobile, setIsAllowMobile] = useState(false)
  if (isMobile && !isAllowMobile) {
    return <NotAllowMobile setIsAllowMobile={setIsAllowMobile} />
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [termsAccepted, setTermsAccepted] = useState(false)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const hasAcceptedTerms = localStorage.getItem("termsAccepted")
    setTermsAccepted(!!hasAcceptedTerms)
  }, [])

  const handleAcceptTerms = () => {
    localStorage.setItem("termsAccepted", "true")
    setTermsAccepted(true)
  }
  return (
    <main className="w-dvw h-dvh flex">
      {isCheckingSession ? (
        <div className={"flex w-full justify-center items-center"}>
          <Spinner size="lg" />
        </div>
      ) : isSessionValid ? (
        <Outlet />
      ) : (
        <div
          className={
            "flex flex-col p-4 space-y-4 w-full h-full items-center justify-center "
          }
        >
          <img src={IntervLogo} alt="Interv" className={"w-40"} />
          <p>Multiple sessions are not allowed.</p>
          <p>
            Please contact the interview owner if you believe something seems
            wrong.
          </p>
          <p>Need more info? Email: help@interv.cc</p>
        </div>
      )}
      {!termsAccepted && <TermsModal onAccept={handleAcceptTerms} />}
    </main>
  )
}
