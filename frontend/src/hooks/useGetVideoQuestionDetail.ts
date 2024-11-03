import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoQuestionDetail = (questionId: number) => {
  return useSWR(
    ["videoInterview", "getVideoInterviewQuestion", questionId],
    () =>
      server.videoQuestion.getVideoQuestionById({
        id: questionId,
      }),
  )
}
