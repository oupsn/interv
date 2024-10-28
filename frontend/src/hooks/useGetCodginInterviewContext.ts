import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingInterviewContext = (roomId: string) => {
  const { data, error, isLoading } = useSWR(
    ["codingInterview", "getQuestionRoomContext"],
    () => server.codingInterview.getQuestionRoomContext(roomId),
  )
  return { data, error, isLoading }
}
