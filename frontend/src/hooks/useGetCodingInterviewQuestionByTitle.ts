import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingInterviewQuestionByTitle = (title: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["codingInterview", "getCodingInterviewQuestionByTitle", title],
    () => server.codingInterview.getQuestionByTitle(title),
  )
  return { data, error, isLoading, mutate }
}
