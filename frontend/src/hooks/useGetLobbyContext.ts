import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetLobbyContext = (lobbyId: number) => {
  return useSWR(["lobby", "lobbyGetLobbyContextList"], () =>
    server.lobby.getLobbyContext({
      lobbyId: lobbyId,
    }),
  )
}
