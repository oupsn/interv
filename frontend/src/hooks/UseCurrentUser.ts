import useSWR from "swr"
import { CurrentUser } from "@/api/server.ts"
import { server } from "@/contexts/swr.tsx"

export default function useCurrentUser() {
  const { data, ...rest } = useSWR(["authenticate", "login"], () =>
    server.authentication.me(),
  )
  return { currentUser: data?.data as CurrentUser, ...rest }
}
