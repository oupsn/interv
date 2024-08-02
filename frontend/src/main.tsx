import React from "react"
import ReactDOM from "react-dom/client"
import "./global.css"
import router from "./contexts/router.tsx"
import { RouterProvider } from "react-router-dom"
import Provider from "./utils/provider.ts"
import SWRProvider from "./contexts/swr.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider providers={[<React.StrictMode />, <SWRProvider />]}>
    <RouterProvider router={router} />
  </Provider>,
)
