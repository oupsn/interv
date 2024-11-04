import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetRoomContext = (roomId: string) => {
  return useSWR(["room", "getRoomContext", roomId], () =>
    server.room.getRoomContext({
      roomId: roomId,
    }),
  )
}
