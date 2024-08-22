import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetVideoInterviewQuestion = (
  lobbyId: string,
  index: number,
) => {
  return useSWR(["videoInterview", "getVideoInterviewQuestion"], () =>
    server.videoInterview.getVideoInterviewQuestion({
      lobbyId: lobbyId,
      questionIndex: index,
    }),
  )
}
