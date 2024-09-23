import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoInterviewContext = (lobbyId: number) => {
  return useSWR(["videoInterview", "getVideoInterviewContext"], () =>
    server.videoInterview.getVideoInterviewContext({ lobbyId: lobbyId }),
  )
}
