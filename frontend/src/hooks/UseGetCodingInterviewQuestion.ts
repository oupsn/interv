import useSWR from "swr"
import { server } from "@/contexts/swr.tsx"

export const useGetCodingInterviewQuestion = () => {
  return useSWR(["codingInterview", "getCodingInterviewQuestion"], () =>
    server.codingInterview.getQuestions(),
  )
}
