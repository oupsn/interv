import { Outlet } from "react-router-dom"

//TODO: add nav bar here
export default function MainLayout() {
  return (
    <main className="w-dvw h-dvh flex">
      <Outlet />
    </main>
  )
}
