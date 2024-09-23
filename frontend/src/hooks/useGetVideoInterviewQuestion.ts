import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoInterviewQuestion = (questionId: number) => {
  return useSWR(["videoInterview", "getVideoInterviewQuestion"], () =>
    server.videoInterview.getVideoInterviewQuestion({
      questionId: questionId,
    }),
  )
}
