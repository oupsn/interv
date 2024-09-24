import ReactDOM from "react-dom/client"
import "./global.css"
import router from "./contexts/router.tsx"
import { RouterProvider } from "react-router-dom"
import Provider from "./utils/provider.ts"
import SWRProvider from "./contexts/swr.tsx"
import { DeviceProvider } from "@/contexts/device.tsx"
import LoadingProvider from "./contexts/loading.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider
    providers={[<SWRProvider />, <DeviceProvider />, <LoadingProvider />]}
  >
    <RouterProvider router={router} />
  </Provider>,
)
