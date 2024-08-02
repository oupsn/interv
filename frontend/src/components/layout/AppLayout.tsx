import { Outlet } from "react-router-dom"
import AppLoading from "./AppLoading.tsx"

export default function AppLayout() {
  return (
    <AppLoading>
      <Outlet />
    </AppLoading>
  )
}
