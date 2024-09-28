import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetListWorkspace = () => {
  return useSWR(["workspace", "GetPortalWorkspace"], () =>
    server.workspace.getPortalWorkspace({}),
  )
}
