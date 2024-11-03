import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoSubmission = (
  candidateId: number,
  workspaceId: number,
) => {
  return useSWR(
    ["videoInterview", "getVideoInterviewResult", candidateId, workspaceId],
    () =>
      server.videoInterview.getVideoInterviewResult({
        userId: candidateId,
        workspaceId: workspaceId,
      }),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    },
  )
}
