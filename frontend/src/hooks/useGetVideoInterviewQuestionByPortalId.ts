import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoInterviewQuestionByPortalId = (portalId: number) => {
  return useSWR(["videoQuestion", "getVideoQuestionByPortalId"], () =>
    server.videoQuestion.getVideoQuestionByPortalId({
      id: portalId,
    }),
  )
}
