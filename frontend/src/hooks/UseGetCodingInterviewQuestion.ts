import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingInterviewQuestion = (roomId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["codingInterview", "getCodingInterviewQuestion", roomId],
    () => server.codingInterview.getQuestions(roomId),
  )
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
