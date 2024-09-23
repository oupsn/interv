import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetWorkspace = (id: number) => {
  return useSWR(["workspace", "getWorkspace"], () =>
    server.workspace.getWorkspace({ id: id }),
  )
}
