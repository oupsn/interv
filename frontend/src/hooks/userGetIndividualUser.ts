import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetIndividualUser = (
  candidateId: number,
  workspaceId: number,
) => {
  return useSWR(
    ["userInWorkspace", "GetIndividualUser", candidateId, workspaceId],
    () =>
      server.userInWorkspace.getIndividualUser({
        userId: candidateId,
        workspaceId: workspaceId,
      }),
  )
}
