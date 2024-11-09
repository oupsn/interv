import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetRoomHistory = (roomId: string, questionId: number) => {
  return useSWR(["room", "getRoomHistory", roomId, questionId], () =>
    server.room.getRoomHistory({
      roomId: roomId,
      questionId: questionId,
    }),
  )
}
