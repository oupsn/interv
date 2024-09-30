import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingInterviewQuestionByPortalId = (portalId: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["codingInterview", "getCodingInterviewQuestionByPortalId", portalId],
    () => server.codingInterview.getQuestionsInPortal(portalId),
  )
  return { data, error, isLoading, mutate }
}
