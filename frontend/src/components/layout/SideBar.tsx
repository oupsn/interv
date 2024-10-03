import { FC, ReactNode } from "react"
import IntervLogo from "@/assets/interv-logo.png"
import SideBarItem from "@/components/layout/SideBarItem.tsx"
import { toast } from "sonner"
import { server } from "@/contexts/swr.tsx"
import { useNavigate } from "react-router-dom"

interface SideBarProps {
  children?: ReactNode
  isSignOutEnabled?: boolean
}

const SideBar: FC<SideBarProps> = ({ isSignOutEnabled, children }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    toast.promise(server.authentication.logout, {
      loading: "Signing out...",
      success: () => {
        navigate("/login", {
          replace: true,
        })
        return "Signed out successfully"
      },
      error: (err) => {
        return err.response.data.message
      },
    })
  }

  return (
    <div className="flex flex-col justify-between min-w-[300px] max-w-[300px] outline outline-1 outline-gray-200 p-4">
      <div className={"flex flex-col items-center w-full gap-8"}>
        <img src={IntervLogo} alt="interv" className="w-40" />
        {children}
      </div>
      {isSignOutEnabled ? (
        <SideBarItem
          title={"Sign Out"}
          onClick={handleClick}
          className={"hover:bg-iWhiteHover"}
        />
      ) : null}
    </div>
  )
}

export default SideBar
