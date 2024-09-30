import IntervLogo from "@/assets/interv-logo.png"
import { FC, useMemo, useState } from "react"
import { NOT_ALLOW_MOBILE_BLOCK_REASON } from "@/constants/NotAllowMobileBlockReason.ts"

interface NotAllowMobileProps {
  setIsAllowMobile: (isAllowMobile: boolean) => void
}

const NotAllowMobile: FC<NotAllowMobileProps> = ({ setIsAllowMobile }) => {
  const [totalClick, setTotalClick] = useState(0)
  const randomReason = useMemo(() => {
    return NOT_ALLOW_MOBILE_BLOCK_REASON[
      Math.floor(Math.random() * NOT_ALLOW_MOBILE_BLOCK_REASON.length)
    ]
  }, [])

  return (
    <div
      id="app-loading"
      className={
        "min-h-dvh flex flex-col transition-all duration-1000 items-center justify-center inset-0 bg-white p-10"
      }
    >
      <img
        src={IntervLogo}
        alt="Interv"
        className={"w-40"}
        onClick={() => {
          setTotalClick(totalClick + 1)
          if (totalClick === 3) {
            setIsAllowMobile(true)
          }
        }}
      />
      <p className={"text-center text-2xl"}>{randomReason}</p>
    </div>
  )
}

export default NotAllowMobile
