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
import { FaEdit } from "react-icons/fa"
import { Button } from "@/components/ui/button"

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams()
  const { currentUser } = useCurrentUser()
  const disablePage = true
  const navigate = useNavigate()

  const { data: workspaceData } = useGetWorkspace(Number(workspaceId))
  const { data: codeQuestion, isLoading: isCodeQuestionLoading } =
    useGetCodingInterviewQuestionByPortalId(currentUser.portalId)
  const { data: videoQuestion, isLoading: isVideoQuestionLoading } =
    useGetVideoInterviewQuestionByPortalId(currentUser.portalId)
  const { data: codeWorkspaceQuestion } =
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

  useEffect(() => {
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
  }, [
    codeCurrentQuestion,
    codeQuestion,
    codeWorkspaceQuestion,
    videoQuestion,
    workspaceData,
  ])

  if (isCodeQuestionLoading && isVideoQuestionLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    )
  }
  return (
    <ContentLayout
      title={"Workspace"}
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
        </Breadcrumb>
      }
    >
      <ContentPanel>
        <div
          className={cn(
            "text-xl flex flex-col h-full",
            disablePage ? "gap-5" : "gap-4",
          )}
        >
          <div className="flex items-center gap-5">
            <Label className="text-3xl font-bold text-primary">
              Title: {truncatedTitle}
            </Label>

            {workspaceActive || workspaceData?.data?.userInWorkspace == null ? (
              <Button
                size="icon"
                className="hover:cursor-pointer"
                onClick={() => {
                  navigate("edit")
                }}
              >
                <FaEdit />
              </Button>
            ) : (
              <></>
            )}
          </div>
          <Label>Number of candidate : {workspaceData?.data?.memberNum}</Label>
          <Label>
            Time period :{" "}
            {dayjs(workspaceData?.data?.startDate).format("MM/DD/YYYY")} -{" "}
            {dayjs(workspaceData?.data?.endDate).format("MM/DD/YYYY")}
          </Label>
          <div className="flex w-full gap-5">
            <div className="w-1/2">
              <Label className="text-2xl text-primary">Coding Question</Label>
              <QuestionPicker
                currentQuestion={codeCurrentQuestion}
                setCurrentQuestion={setCodeCurrentQuestion}
                stockQuestion={codeStockQuestion}
                setStockQuestion={setCodeStockQuestion}
                disable={disablePage}
              />
            </div>
            <div className="w-1/2">
              <Label className="text-2xl text-primary">Video Question</Label>
              <QuestionPicker
                currentQuestion={videoCurrentQuestion}
                setCurrentQuestion={setVideoCurrentQuestion}
                stockQuestion={videoStockQuestion}
                setStockQuestion={setVideoStockQuestion}
                disable={true}
              />
            </div>
          </div>
          <div className="flex w-full gap-5">
            <div className="w-1/2 flex flex-col gap-7">
              <Label>
                Coding Time :{" "}
                {(workspaceData?.data?.codingTime
                  ? Math.round(workspaceData?.data?.codingTime / 60) > 0
                    ? Math.round(workspaceData?.data?.codingTime / 60)
                    : 1
                  : 0
                ).toString()}{" "}
                Minutes
              </Label>
              <Label>
                Screen:
                <span
                  className={
                    workspaceData?.data?.reqScreen
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.reqScreen ? " Require" : " Not Require"}
                </span>
              </Label>
              <Label>
                Microphone:
                <span
                  className={
                    workspaceData?.data?.reqMicrophone
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.reqMicrophone
                    ? " Require"
                    : " Not Require"}
                </span>
              </Label>
              <Label>
                Camera:
                <span
                  className={
                    workspaceData?.data?.reqCamera
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.reqCamera ? " Require" : " Not Require"}
                </span>
              </Label>
            </div>
            <div className="w-1/2 flex flex-col gap-7">
              <Label className="w-1/2">
                Video Time : {workspaceData?.data?.videoTime?.toString()}{" "}
                Seconds
              </Label>
              <Label>
                Microphone:
                <span
                  className={
                    workspaceData?.data?.isVideo
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.isVideo ? " Require" : " Not Require"}
                </span>
              </Label>
              <Label>
                Camera:
                <span
                  className={
                    workspaceData?.data?.isVideo
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.isVideo ? " Require" : " Not Require"}
                </span>
              </Label>
            </div>
          </div>
        </div>
      </ContentPanel>
    </ContentLayout>
  )
}

export default WorkspaceDetailPage
