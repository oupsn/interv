import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingInterviewQuestion = () => {
  const { data, error, isLoading, mutate } = useSWR(
    ["codingInterview", "getCodingInterviewQuestion"],
    () => server.codingInterview.getQuestions(),
  )
  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
