import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingSubmission = (userId: string) => {
  return useSWR(["codingSubmission", "getCodingSubmission"], () =>
    server.codingInterview.getSubmissionResultByUser({
      userID: userId,
    }),
  )
}
