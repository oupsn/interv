import { FC, PropsWithChildren } from "react"
import { SWRConfig } from "swr"
import { Server } from "../api/server.ts"

const SERVER_PROTOCOL = location.protocol
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST || location.host
const SERVER_URL = `${SERVER_PROTOCOL}//${SERVER_HOST}/api`

console.log("[SERVER] ", SERVER_URL)

export const server = new Server({
  //baseURL: "/api", // already set in swagger codegen
  withCredentials: true,
})

//window.server = server

const SWRProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SWRConfig
    /*value={{
        fetcher: (url) => server.instance.get(url).then((res) => res.data),
      }}*/
    >
      {children}
    </SWRConfig>
  )
}

export default SWRProvider
