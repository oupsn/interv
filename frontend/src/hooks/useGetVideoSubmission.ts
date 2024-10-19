import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoSubmission = (candidateId: number) => {
  return useSWR(
    ["videoInterview", "getVideoInterviewResult"],
    () =>
      server.videoInterview.getVideoInterviewResult({
        userId: candidateId,
      }),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    },
  )
}
