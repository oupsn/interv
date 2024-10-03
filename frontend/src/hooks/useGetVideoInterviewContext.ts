import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoInterviewContext = (roomId: string) => {
  return useSWR(["videoInterview", "getVideoInterviewContext"], () =>
    server.videoInterview.getVideoInterviewContext({ roomId: roomId }),
  )
}
