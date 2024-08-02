import { Outlet } from "react-router-dom"

export default function LobbyLayout() {
  return (
    <main className={"w-dvw h-dvh flex"}>
      <Outlet />
    </main>
  )
}
