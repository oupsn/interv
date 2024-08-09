import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <main className="w-dvw h-dvh flex">
      <Outlet />
    </main>
  )
}
