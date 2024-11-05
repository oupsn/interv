import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingInterviewPlagarism = (workspaceId: number) => {
  const { data, error, isLoading } = useSWR(
    ["codingInterview", "getPlagarism", workspaceId],
    () => server.codingInterview.getPlagarism(workspaceId),
  )
  return { data, error, isLoading }
}
