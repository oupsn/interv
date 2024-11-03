import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetWorkspace = (id: number) => {
  return useSWR(["workspace", "getWorkspace", id], () =>
    server.workspace.getWorkspace({ id: id }),
  )
}
