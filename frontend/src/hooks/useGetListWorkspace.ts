import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetListWorkspace = () => {
  return useSWR(["workspace", "GetAllWorkspace"], () =>
    server.workspace.getAllWorkspace({}),
  )
}
