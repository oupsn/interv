import { clx } from "@/utils/clx.ts"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useCurrentUser from "@/hooks/UseCurrentUser.ts"
import IntervLogo from "@/assets/interv-logo.png"
import { Toaster } from "sonner"
import { isMobile } from "react-device-detect"
import NotAllowMobile from "@/components/layout/NotAllowMobile.tsx"

const AppLoading: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const { currentUser, isLoading } = useCurrentUser()
  const isLoggedIn = currentUser != null
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchParams] = useSearchParams()
  useEffect(() => {
    if (isLoading) {
      return
    }

    if (isLoggedIn && !window.location.href.includes("/portal")) {
      navigate("/portal/workspace")
      const timeout = setTimeout(() => {
        setIsLoaded(true)
      }, 500)

      return () => {
        clearTimeout(timeout)
      }
    }

    if (!isLoggedIn && !isLoading) {
      navigate("/login")
      const timeout = setTimeout(() => {
        setIsLoaded(true)
      }, 500)

      return () => {
        clearTimeout(timeout)
      }
    }

    setIsLoaded(true)
  }, [isLoggedIn, navigate, isLoading])

  if (isMobile && searchParams.get("in") != "terv") {
    return <NotAllowMobile />
  }

  return (
    <>
      <Toaster />
      <div
        id="app-loading"
        className={clx(
          "flex z-[9999] transition-all duration-700 items-center justify-center bg-bgblackwelcome absolute inset-0 pointer-events-none bg-white",
          {
            "opacity-0": isLoaded,
            "opacity-100": !isLoaded,
          },
        )}
      >
        <img src={IntervLogo} alt="Interv" className={clx("w-96")} />
      </div>
      {isLoaded ? children : null}
    </>
  )
}

export default AppLoading
