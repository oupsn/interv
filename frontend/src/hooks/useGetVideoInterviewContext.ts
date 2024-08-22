import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoInterviewContext = (lobbyId: string) => {
  return useSWR(["videoInterview", "getVideoInterviewContext"], () =>
    server.videoInterview.getVideoInterviewContext({ lobbyId: lobbyId }),
  )
}
