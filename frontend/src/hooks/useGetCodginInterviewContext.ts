import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingInterviewContext = (roomId: string) => {
  const { data, error, isLoading } = useSWR(
    ["codingInterview", "getQuestionRoomContext", roomId],
    () => server.codingInterview.getQuestionRoomContext(roomId),
    { refreshInterval: 5000 },
  )
  return { data, error, isLoading }
}
