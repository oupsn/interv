import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/components/layout/AppLayout.tsx"
import RoomMainLayout from "@/components/layout/RoomMainLayout.tsx"
import LoginPage from "@/pages/login/Login.tsx"
import RoomPage from "@/pages/room/Room.tsx"
import Playground from "@/pages/playground/Playground.tsx"
import WorkspaceListPage from "@/pages/portal/workspace/WorkspaceListPage"
import CodingInterviewPage from "@/pages/room/codingInterview/CodingInterview.tsx"
import VideoInterviewPage from "@/pages/room/videoInterview/VideoInterview.tsx"
import CreateWorkspace from "@/pages/portal/workspace/CreateWorkspace"
import QuestionBankCreateVideoQuestionForm from "@/pages/portal/questionBank/components/QuestionBankCreateVideoQuestionForm.tsx"
import WorkspaceDetailPage from "@/pages/portal/workspace/WorkspaceDetailPage"
import MainLayoutRevamp from "@/components/layout/MainLayoutRevamp.tsx"
import QuestionBankCreateCodingQuestionForm from "@/pages/portal/questionBank/components/QuestionBankCreateCodingQuestionForm"
import QuestionBankVideoListPage from "@/pages/portal/questionBank/QuestionBankVideoListPage.tsx"
import QuestionBankCodingListPage from "@/pages/portal/questionBank/QuestionBankCodingListPage.tsx"
import QuestionBankCodingDetail from "@/pages/portal/questionBank/components/QuestionBankCodingDetail"
import WorkspaceCandidateList from "@/pages/portal/workspace/WorkspaceCandidateList"
import QuestionBankVideoDetail from "@/pages/portal/questionBank/components/QuestionBankVideoDetail.tsx"
import QuestionBankCodingEdit from "@/pages/portal/questionBank/components/QuestionBankCodingEdit"
import QuestionBankEditVideoQuestionForm from "@/pages/portal/questionBank/components/QuestionBankEditVideoQuestionForm.tsx"
import WorkspaceInterestPage from "@/pages/portal/workspace/WorkspaceInterestPage"
import CodingResult from "@/pages/portal/workspace/components/CodingResult"
import CandidateDetailPage from "@/pages/portal/workspace/CandidateDetailPage"
import EditWorkspacePage from "@/pages/portal/workspace/EditWorkspacePage"

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
                children: [
                  {
                    path: "",
                    element: <WorkspaceDetailPage />,
                  },
                  {
                    path: "edit",
                    element: <EditWorkspacePage />,
                  },
                  {
                    path: "candidateList",
                    children: [
                      {
                        path: "",
                        element: <WorkspaceCandidateList />,
                      },
                      {
                        path: ":candidateId",
                        element: <CandidateDetailPage />,
                      },
                    ],
                  },
                  {
                    path: "interestList",
                    children: [
                      {
                        path: "",
                        element: <WorkspaceInterestPage />,
                      },
                      {
                        path: ":candidateId",
                        element: <CandidateDetailPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "question/coding",
            children: [
              {
                path: "",
                element: <QuestionBankCodingListPage />,
              },
              {
                path: "create",
                element: <QuestionBankCreateCodingQuestionForm />,
              },
              {
                path: ":codingTitle",
                element: <QuestionBankCodingDetail />,
              },
              {
                path: "edit/:codingTitle",
                element: <QuestionBankCodingEdit />,
              },
              {
                path: "edit/:codingTitle",
                element: <QuestionBankCodingEdit />,
              },
            ],
          },
          {
            path: "question/video",
            children: [
              {
                path: "",
                element: <QuestionBankVideoListPage />,
              },
              {
                path: "create",
                element: <QuestionBankCreateVideoQuestionForm />,
              },
              {
                path: ":videoQuestionId",
                element: <QuestionBankVideoDetail />,
              },
              {
                path: ":videoQuestionId/edit",
                element: <QuestionBankEditVideoQuestionForm />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/room/:roomId",
    element: <RoomMainLayout />,
    children: [
      {
        path: "",
        element: <RoomPage />,
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
  {
    path: "coding/:userId",
    element: <CodingResult />,
  },
])

export default router
