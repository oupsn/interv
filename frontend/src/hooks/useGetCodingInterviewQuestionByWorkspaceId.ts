import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingInterviewQuestionByWorpsaceId = (
  workspaceId: number,
) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["codingInterview", "getCodingInterviewQuestionByWorkspaceId", workspaceId],
    () => server.codingInterview.getQuestionsInWorkspace(workspaceId),
  )
  return { data, error, isLoading, mutate }
}
