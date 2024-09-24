import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/components/layout/AppLayout.tsx"
import MainLayout from "@/components/layout/MainLayout.tsx"
import LoginPage from "@/pages/login/Login.tsx"
import LobbyPage from "@/pages/lobby/Lobby.tsx"
import Playground from "@/pages/playground/Playground.tsx"
import Portal from "@/pages/portal/Portal.tsx"
import CodingInterviewPage from "@/pages/lobby/codingInterview/CodingInterview.tsx"
import VideoInterviewPage from "@/pages/lobby/videoInterview/VideoInterview.tsx"
import CreateCodingQuestion from "@/pages/portal/assessment/components/AssessmentCreateCodingQuestionForm"
import CreateWorkspace from "@/pages/portal/createWorkspace/CreateWorkspace"
import WorkspaceWithId from "@/pages/portal/WorkspaceWithId"

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
            element: <Portal />,
          },
          {
            path: "create",
            element: <CreateWorkspace />,
          },
          /* Temporary */
          {
            path: "assessment",
            element: <CreateCodingQuestion />,
            children: [
              {
                path: "coding",
                element: <CreateCodingQuestion />,
              },
            ],
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
