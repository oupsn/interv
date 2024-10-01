import { FC, PropsWithChildren, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useCurrentUser from "@/hooks/UseCurrentUser.ts"
import { Toaster } from "sonner"
import { isMobile } from "react-device-detect"
import NotAllowMobile from "@/components/layout/NotAllowMobile.tsx"

const AppLoading: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const { currentUser, isLoading } = useCurrentUser()
  const isLoggedIn = currentUser != null
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAllowMobile, setIsAllowMobile] = useState(false)
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

  if (isMobile && !isAllowMobile) {
    return <NotAllowMobile setIsAllowMobile={setIsAllowMobile} />
  }

  return (
    <>
      <Toaster />
      {isLoaded ? children : null}
    </>
  )
}

export default AppLoading
