import { Link, useParams } from "react-router-dom"
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

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams()
  const { currentUser } = useCurrentUser()
  const disablePage = true

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
  >(workspaceData?.data?.workspaceDetail.videoQueston)
  const [videoStockQuestion, setVideoStockQuestion] = useState<
    GetVideoQuestionByPortalIdResponse[] | undefined
  >(
    videoQuestion?.data
      ? videoQuestion.data.filter((question) =>
          workspaceData?.data?.workspaceDetail?.videoQueston?.some(
            (workspaceQ) => question.id == workspaceQ.id,
          ),
        )
      : videoQuestion?.data,
  )

  useEffect(() => {
    setCodeCurrentQuestion(codeWorkspaceQuestion?.data?.sort())
    setCodeStockQuestion(
      codeQuestion?.data?.filter(
        (question) => !codeCurrentQuestion?.includes(question),
      ),
    )

    setVideoCurrentQuestion(workspaceData?.data?.workspaceDetail.videoQueston)
    setVideoStockQuestion(
      videoQuestion?.data?.filter((question) =>
        workspaceData?.data?.workspaceDetail?.videoQueston
          ? workspaceData.data.workspaceDetail.videoQueston.some(
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
      title={workspaceData?.data?.workspaceDetail.title ?? ""}
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
              <BreadcrumbPage>
                {workspaceData?.data?.workspaceDetail.title ?? ""}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        <div
          className={cn(
            "text-xl flex flex-col h-full",
            disablePage ? "gap-8" : "gap-4",
          )}
        >
          <Label className="text-3xl font-bold text-primary">
            Title : {workspaceData?.data?.workspaceDetail.title}
          </Label>
          <Label>
            Number of candidate :{" "}
            {workspaceData?.data?.workspaceDetail.memberNum}
          </Label>
          <Label>
            Time period :{" "}
            {dayjs(workspaceData?.data?.workspaceDetail.startDate).format(
              "MM/DD/YYYY",
            )}{" "}
            -{" "}
            {dayjs(workspaceData?.data?.workspaceDetail.endDate).format(
              "MM/DD/YYYY",
            )}
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
                {workspaceData?.data?.workspaceDetail.codingTime?.toString()}{" "}
                Minutes
              </Label>
              <Label
                className={cn(
                  workspaceData?.data?.workspaceDetail.reqScreen
                    ? "disabled:opacity-30"
                    : "",
                )}
              >
                Screen:
                <span
                  className={
                    workspaceData?.data?.workspaceDetail.reqScreen
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.workspaceDetail.reqScreen
                    ? " Require"
                    : " Not Require"}
                </span>
              </Label>
              <Label>
                Microphone:
                <span
                  className={
                    workspaceData?.data?.workspaceDetail.reqMicrophone
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.workspaceDetail.reqMicrophone
                    ? " Require"
                    : " Not Require"}
                </span>
              </Label>
              <Label>
                Camera:
                <span
                  className={
                    workspaceData?.data?.workspaceDetail.reqCamera
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.workspaceDetail.reqCamera
                    ? " Require"
                    : " Not Require"}
                </span>
              </Label>
            </div>
            <div className="w-1/2 flex flex-col gap-7">
              <Label className="w-1/2">
                Video Time :{" "}
                {workspaceData?.data?.workspaceDetail.videoTime?.toString()}{" "}
                Seconds
              </Label>
              <Label
                className={cn(
                  workspaceData?.data?.workspaceDetail.reqScreen
                    ? "disabled:opacity-30"
                    : "",
                )}
              >
                Screen:
                <span
                  className={
                    workspaceData?.data?.workspaceDetail.isVideo
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.workspaceDetail.isVideo
                    ? " Require"
                    : " Not Require"}
                </span>
              </Label>
              <Label>
                Microphone:
                <span
                  className={
                    workspaceData?.data?.workspaceDetail.isVideo
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.workspaceDetail.isVideo
                    ? " Require"
                    : " Not Require"}
                </span>
              </Label>
              <Label>
                Camera:
                <span
                  className={
                    workspaceData?.data?.workspaceDetail.isVideo
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                >
                  {workspaceData?.data?.workspaceDetail.isVideo
                    ? " Require"
                    : " Not Require"}
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
