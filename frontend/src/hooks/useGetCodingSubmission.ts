import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingSubmission = (userId: number) => {
  return useSWR(["codingSubmission", "getCodingSubmission"], () =>
    server.codingInterview.getSubmissionResultByUser({
      userID: userId,
    }),
  )
}
