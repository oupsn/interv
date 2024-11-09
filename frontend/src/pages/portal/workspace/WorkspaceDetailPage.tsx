import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetWorkspace } from "@/hooks/useGetWorkspace"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import { Label } from "@radix-ui/react-label"
import dayjs from "dayjs"
import QuestionPicker from "./components/QuestionPicker"
import {
  DomainsCodingQuestion,
  GetVideoQuestionByPortalIdResponse,
} from "@/api/server"
import { useEffect, useState } from "react"
import useCurrentUser from "@/hooks/UseCurrentUser"
import { useGetCodingInterviewQuestionByPortalId } from "@/hooks/useGetCodingInterviewQuestionByPortalId"
import { useGetVideoInterviewQuestionByPortalId } from "@/hooks/useGetVideoInterviewQuestionByPortalId"
import { useGetCodingInterviewQuestionByWorpsaceId } from "@/hooks/useGetCodingInterviewQuestionByWorkspaceId"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import {
  FaEdit,
  FaFilePdf,
  FaTrash,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaDesktop,
  FaMicrophone,
  FaVideo,
} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { server } from "@/contexts/swr"
import { toast } from "sonner"

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams()
  const { currentUser } = useCurrentUser()
  const disablePage = true
  const navigate = useNavigate()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const {
    data: workspaceData,
    error,
    isLoading: isWorkspaceLoading,
  } = useGetWorkspace(Number(workspaceId), Number(currentUser.portalId))
  const { data: codeQuestion, isLoading: isCodeQuestionLoading } =
    useGetCodingInterviewQuestionByPortalId(currentUser.portalId)
  const { data: videoQuestion, isLoading: isVideoQuestionLoading } =
    useGetVideoInterviewQuestionByPortalId(currentUser.portalId)
  const { data: codeWorkspaceQuestion, isLoading: isCodeWorkspaceLoading } =
    useGetCodingInterviewQuestionByWorpsaceId(Number(workspaceId) ?? 0)

  const [codeCurrentQuestion, setCodeCurrentQuestion] = useState<
    DomainsCodingQuestion[] | undefined
  >(codeWorkspaceQuestion?.data)
  const [codeStockQuestion, setCodeStockQuestion] = useState<
    DomainsCodingQuestion[] | undefined
  >(
    codeQuestion?.data?.filter(
      (question) => !codeCurrentQuestion?.includes(question),
    ),
  )

  const [videoCurrentQuestion, setVideoCurrentQuestion] = useState<
    GetVideoQuestionByPortalIdResponse[] | undefined
  >(workspaceData?.data?.videoQueston)
  const [videoStockQuestion, setVideoStockQuestion] = useState<
    GetVideoQuestionByPortalIdResponse[] | undefined
  >(
    videoQuestion?.data
      ? videoQuestion.data.filter((question) =>
          workspaceData?.data?.videoQueston?.some(
            (workspaceQ) => question.id == workspaceQ.id,
          ),
        )
      : videoQuestion?.data,
  )
  const workspaceActive = workspaceData?.data?.userInWorkspace?.every(
    (user) => user.status === "idle",
  )
  const truncatedTitle = workspaceData?.data?.title
    ? workspaceData.data.title.length > 30
      ? `${workspaceData.data.title.slice(0, 30)}...`
      : workspaceData.data.title
    : ""

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (workspaceId) {
      toast.promise(
        server.workspace
          .deleteWorkspaceById({ id: Number(workspaceId) })
          .then(() => navigate("/portal/workspace")),
        {
          loading: "Deleting...",
          success: "Deleted successfully",
          error: "Failed to delete",
        },
      )
    }
    setIsDeleteDialogOpen(false)
  }

  useEffect(() => {
    if (error !== undefined) {
      toast.error("That workspace does not exist")
      navigate("/portal/workspace")
    } else {
      setCodeCurrentQuestion(codeWorkspaceQuestion?.data?.sort())
      setCodeStockQuestion(
        codeQuestion?.data?.filter(
          (question) => !codeCurrentQuestion?.includes(question),
        ),
      )

      setVideoCurrentQuestion(workspaceData?.data?.videoQueston)
      setVideoStockQuestion(
        videoQuestion?.data?.filter((question) =>
          workspaceData?.data?.videoQueston
            ? workspaceData.data.videoQueston.some(
                (workspaceQ) => question.id == workspaceQ.id,
              )
            : true,
        ),
      )
    }
  }, [
    codeCurrentQuestion,
    codeQuestion,
    codeWorkspaceQuestion,
    error,
    navigate,
    videoQuestion,
    workspaceData,
  ])

  if (
    isCodeQuestionLoading ||
    isVideoQuestionLoading ||
    isWorkspaceLoading ||
    isCodeWorkspaceLoading
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <ContentLayout
      title={"Workspace Details"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/portal/workspace">Workspaces</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{truncatedTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            {workspaceActive || workspaceData?.data?.userInWorkspace == null ? (
              <Button
                variant="outline"
                onClick={() => {
                  navigate("edit")
                }}
                size="icon"
              >
                <FaEdit />
              </Button>
            ) : (
              <></>
            )}
            <Button
              variant="outline"
              onClick={() => handleDelete()}
              size="icon"
            >
              <FaTrash />
            </Button>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        <div className={cn("flex flex-col h-full gap-8")}>
          {/* Header Section */}
          <div className="flex flex-row justify-between items-center border-b pb-4">
            <div>
              <Label className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
                {truncatedTitle}
              </Label>
              <div className="flex gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-primary" />
                  <span>{workspaceData?.data?.memberNum} Candidates</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  <span>
                    {dayjs(workspaceData?.data?.startDate).format(
                      "MMM DD, YYYY",
                    )}{" "}
                    -{" "}
                    {dayjs(workspaceData?.data?.endDate).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {!workspaceActive ||
              workspaceData?.data?.userInWorkspace == null ? (
                <Button
                  variant="outline"
                  onClick={() => navigate("plagarism")}
                  className="flex items-center gap-2"
                >
                  <FaFilePdf />
                  Plagiarism Report
                </Button>
              ) : null}
            </div>
          </div>

          {/* Questions Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Coding Questions */}
            <div className="border rounded-lg p-6">
              <Label className="text-xl text-primary mb-4 flex items-center gap-2 font-semibold">
                Coding Questions
              </Label>
              <div className="mb-4 flex items-center gap-2">
                <FaClock className="text-primary" />
                <Label>
                  Time Limit:{" "}
                  {Math.max(
                    1,
                    Math.round((workspaceData?.data?.codingTime || 0) / 60),
                  )}{" "}
                  Minutes
                </Label>
              </div>
              <QuestionPicker
                currentQuestion={codeCurrentQuestion}
                setCurrentQuestion={setCodeCurrentQuestion}
                stockQuestion={codeStockQuestion}
                setStockQuestion={setCodeStockQuestion}
                disable={disablePage}
              />
            </div>

            {/* Video Questions */}
            <div className="border rounded-lg p-6">
              <Label className="text-xl text-primary mb-4 flex items-center gap-2 font-semibold">
                Video Questions
              </Label>
              <div className="mb-4 flex items-center gap-2">
                <FaClock className="text-primary" />
                <Label>
                  Time Limit: {workspaceData?.data?.videoTime} Seconds
                </Label>
              </div>
              <QuestionPicker
                currentQuestion={videoCurrentQuestion}
                setCurrentQuestion={setVideoCurrentQuestion}
                stockQuestion={videoStockQuestion}
                setStockQuestion={setVideoStockQuestion}
                disable={true}
              />
            </div>
          </div>

          {/* Requirements Section */}
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Technical Requirements
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <RequirementItem
                icon={<FaDesktop />}
                label="Screen Sharing (Coding)"
                required={workspaceData?.data?.reqScreen ?? false}
              />
              <RequirementItem
                icon={<FaMicrophone />}
                label="Microphone (Coding)"
                required={workspaceData?.data?.reqMicrophone ?? false}
              />
              <RequirementItem
                icon={<FaVideo />}
                label="Camera (Coding)"
                required={workspaceData?.data?.reqCamera ?? false}
              />
              <RequirementItem
                icon={<FaVideo />}
                label="Video Recording"
                required={workspaceData?.data?.isVideo ?? false}
              />
            </div>
          </div>

          {/* Delete Dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this workspace? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ContentPanel>
    </ContentLayout>
  )
}

// New component for requirement items
const RequirementItem = ({
  icon,
  label,
  required,
}: {
  icon: React.ReactNode
  label: string
  required: boolean
}) => (
  <div className="flex items-center gap-3">
    <span
      className={cn("text-lg", required ? "text-primary" : "text-gray-400")}
    >
      {icon}
    </span>
    <span className="font-medium">
      {label}:{" "}
      <span className={cn(required ? "text-red-500" : "text-gray-500")}>
        {required ? "Required" : "Not Required"}
      </span>
    </span>
  </div>
)

export default WorkspaceDetailPage
