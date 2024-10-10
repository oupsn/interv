import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoQuestionDetail = (questionId: number) => {
  return useSWR(["videoInterview", "getVideoInterviewQuestion"], () =>
    server.videoQuestion.getVideoQuestionById({
      id: questionId,
    }),
  )
}
