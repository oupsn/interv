import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/components/layout/AppLayout.tsx"
import MainLayout from "@/components/layout/MainLayout.tsx"
import LoginPage from "@/pages/login/Login.tsx"
import LobbyPage from "@/pages/lobby/Lobby.tsx"
import Playground from "@/pages/playground/Playground.tsx"
import WorkspaceListPage from "@/pages/portal/WorkspaceListPage.tsx"
import CodingInterviewPage from "@/pages/lobby/codingInterview/CodingInterview.tsx"
import VideoInterviewPage from "@/pages/lobby/videoInterview/VideoInterview.tsx"
import CreateWorkspace from "@/pages/portal/createWorkspace/CreateWorkspace"
import AssessmentCreateVideoQuestionForm from "@/pages/portal/assessment/components/AssessmentCreateVideoQuestionForm.tsx"
import WorkspaceDetailPage from "@/pages/portal/WorkspaceDetailPage.tsx"
import MainLayoutRevamp from "@/components/layout/MainLayoutRevamp.tsx"
import AssessmentCreateCodingQuestionForm from "@/pages/portal/assessment/components/AssessmentCreateCodingQuestionForm"
import AssessmentVideoListPage from "@/pages/portal/assessment/AssessmentVideoListPage.tsx"
import AssessmentCodingListPage from "@/pages/portal/assessment/AssessmentCodingListPage.tsx"
import AssessmentCodingDetail from "@/pages/portal/assessment/components/AssessmentCodingDetail"

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
        path: "portal",
        element: <MainLayoutRevamp />,
        children: [
          {
            path: "workspace",
            children: [
              {
                path: "",
                element: <WorkspaceListPage />,
              },
              {
                path: "create",
                element: <CreateWorkspace />,
              },
              {
                path: ":workspaceId",
                element: <WorkspaceDetailPage />,
              },
            ],
          },
          {
            path: "assessment/coding",
            children: [
              {
                path: "",
                element: <AssessmentCodingListPage />,
              },
              {
                path: "create",
                element: <AssessmentCreateCodingQuestionForm />,
              },
              {
                path: ":codingTitle",
                element: <AssessmentCodingDetail />,
              },
            ],
          },
          {
            path: "assessment/video",
            children: [
              {
                path: "",
                element: <AssessmentVideoListPage />,
              },
              {
                path: "create",
                element: <AssessmentCreateVideoQuestionForm />,
              },
            ],
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
