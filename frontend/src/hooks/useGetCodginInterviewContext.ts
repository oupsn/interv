import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingInterviewContext = (roomId: string) => {
  return useSWR(["codingInterview", "getQuestionRoomContext"], () =>
    server.codingInterview.getQuestionRoomContext(roomId),
  )
}
