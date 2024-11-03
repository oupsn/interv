import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoInterviewQuestionByPortalId = (portalId: number) => {
  return useSWR(["videoQuestion", "getVideoQuestionByPortalId", portalId], () =>
    server.videoQuestion.getVideoQuestionByPortalId({
      id: portalId,
    }),
  )
}
