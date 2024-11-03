import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoInterviewContext = (roomId: string) => {
  return useSWR(["videoInterview", "getVideoInterviewContext", roomId], () =>
    server.videoInterview.getVideoInterviewContext({ roomId: roomId }),
  )
}
