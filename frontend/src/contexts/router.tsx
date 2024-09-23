import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/components/layout/AppLayout.tsx"
import MainLayout from "@/components/layout/MainLayout.tsx"
import LoginPage from "@/pages/login/Login.tsx"
import LobbyPage from "@/pages/lobby/Lobby.tsx"
import Playground from "@/pages/playground/Playground.tsx"
import Dashboard from "@/pages/dashboard/Dashboard.tsx"
import CodingInterviewPage from "@/pages/lobby/codingInterview/CodingInterview.tsx"
import VideoInterviewPage from "@/pages/lobby/videoInterview/VideoInterview.tsx"
import CreateWorkspace from "@/pages/dashboard/createWorkspace/CreateWorkspace"
import WorkspaceWithId from "@/pages/dashboard/WorkspaceWithId"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "workspace",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "create",
            element: <CreateWorkspace />,
          },
          {
            path: ":workspaceId",
            element: <WorkspaceWithId />,
          },
        ],
      },
    ],
  },
  {
    path: "/lobby/:lobbyId",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <LobbyPage />,
      },
      {
        path: "coding",
        element: <CodingInterviewPage />,
      },
      {
        path: "video",
        element: <VideoInterviewPage />,
      },
    ],
  },
  {
    path: "playground",
    element: <Playground />,
  },
])

export default router
