import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useCheckAuthCandidate = (roomId: string, rt: string) => {
  return useSWR(["room", "checkAuthCandidate"], () =>
    server.room.checkAuthCandidate({ roomId: roomId, rt: rt }),
  )
}
