import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingSubmission = (userId: number, workspaceId: number) => {
  return useSWR(
    ["codingSubmission", "getCodingSubmission"],
    () =>
      server.codingInterview.getSubmissionResultByUser({
        userID: userId,
        workspaceID: workspaceId,
      }),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    },
  )
}
