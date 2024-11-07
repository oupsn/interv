import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetWorkspace = (workspaceId: number, portalId: number) => {
  return useSWR(["workspace", "getWorkspace", workspaceId, portalId], () =>
    server.workspace.getWorkspace({
      workspaceId: workspaceId,
      portalId: portalId,
    }),
  )
}
