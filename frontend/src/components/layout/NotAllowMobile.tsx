import IntervLogo from "@/assets/interv-logo.png"
import { useMemo } from "react"
import { NOT_ALLOW_MOBILE_BLOCK_REASON } from "@/constants/NotAllowMobileBlockReason.ts"

const NotAllowMobile = () => {
  const randomReason = useMemo(() => {
    return NOT_ALLOW_MOBILE_BLOCK_REASON[
      Math.floor(Math.random() * NOT_ALLOW_MOBILE_BLOCK_REASON.length)
    ]
  }, [])

  return (
    <div
      id="app-loading"
      className={
        "flex flex-col z-[9999] transition-all duration-1000 items-center justify-center bg-bgblackwelcome absolute inset-0 pointer-events-none bg-white p-10"
      }
    >
      <img src={IntervLogo} alt="Interv" className={"w-40"} />
      <p className={"text-center text-2xl"}>{randomReason}</p>
    </div>
  )
}

export default NotAllowMobile
