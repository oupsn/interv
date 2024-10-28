import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input.tsx"
import Papa from "papaparse"
import React, { useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { server } from "@/contexts/swr"
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
import Panigator from "./components/Panigator"
import ListUser from "./components/ListUser"
import { Spinner } from "@/components/ui/spinner"
import saveAs from "file-saver"
import { toast } from "sonner"
import { FaDownload, FaFile, FaUpload } from "react-icons/fa"

const WorkspaceCandidateList = () => {
  const [importUser, setImportUser] = useState<UserData[]>()
  const [page, setPage] = useState(1)
  const size = 10
  const { workspaceId } = useParams()
  const { data, mutate, isLoading } = useGetWorkspace(Number(workspaceId))

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [fileName, setFileName] = useState("")

  const truncatedTitle = data?.data?.title
    ? data.data.title.length > 15
      ? `${data.data.title.slice(0, 15)}...`
      : data.data.title
    : ""
  type UserData = {
    name: string
    username: string
    role: string
    createdAt: string
    updatedAt: string
  }

  type ImportData = {
    listUser: UserData[]
    workspaceId: number
  }

  function parseUserData(input: string[][]): UserData[] {
    const currentTimestamp = new Date().toISOString()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return input
      .slice(1) // Skip header
      .filter(
        (item): item is string[] =>
          Array.isArray(item) &&
          item.length === 2 &&
          item.every((i) => typeof i === "string") &&
          emailRegex.test(item[1]),
      )
      .map(([name, username]) => ({
        name,
        username,
        role: "candidate",
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      }))
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    setIsFileSelected(!!file)
    setFileName(file?.name ?? "")
    const MAX_FILE_SIZE = 2 * 1024 * 1024
    if (!file) return
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large. Maximum size is 2MB.")
      return
    }

    try {
      const fileUploadPromise = new Promise<void>((resolve, reject) => {
        Papa.parse(file, {
          skipEmptyLines: true,
          complete: (results: Papa.ParseResult<string[]>) => {
            const data = results.data as string[][]
            const specialCharRegex = /^[a-zA-Z0-9\s,.\-@]+$/

            const isValid = data.every((row: string[], rowIndex: number) =>
              row.every((cell: string, cellIndex: number) => {
                const valid = specialCharRegex.test(cell) && cell.length <= 40
                if (!valid) {
                  console.error(
                    `Validation error in row ${rowIndex + 1}, cell ${cellIndex + 1}: "${cell}"`,
                  )
                }
                return valid
              }),
            )

            if (isValid) {
              setImportUser(parseUserData(data))
              resolve()
            } else {
              reject(console.log(Error))
            }
          },
          error: (error) => {
            reject(error)
          },
        })
      })

      await toast.promise(fileUploadPromise, {
        loading: "Processing file...",
        success: "File processed successfully!",
        error: (err) =>
          err instanceof Error ? err.message : "Something went wrong",
      })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred"
      toast.error(errorMessage)
    }
  }

  const handleSubmitFile = () => {
    const importData: ImportData = {
      listUser: importUser ?? [],
      workspaceId: Number(workspaceId),
    }
    if (importUser && importUser.length > 0) {
      toast.promise(
        server.user.createUser(importData).finally(() => {
          mutate()
        }),
        {
          loading: "Processing file...",
          success: "File processed successfully!",
          error: (err) =>
            err instanceof Error ? err.message : "Something went wrong",
        },
      )
    } else {
      toast.error("No Data or File might be invalid")
    }
    setIsFileSelected(false)
  }

  const handleExportFile = () => {
    const csvRows = [["name", "email"]]
    const csvContent = csvRows.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "candidate_import_template.csv")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <ContentLayout
      title="Applicant List"
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
              <BreadcrumbLink asChild>
                <Link to={"/portal/workspace/" + workspaceId}>
                  {truncatedTitle}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Applicant List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            <div className="flex flex-row gap-2 justify-between">
              <Button
                onClick={() => {
                  if (!data?.data?.isCoding && !data?.data?.isVideo) {
                    toast.error(
                      "Please add a question before sending invitations",
                    )
                    return
                  }

                  toast.promise(
                    server.workspace
                      .inviteAllCandidate({
                        workspaceId: data?.data?.id ?? 0,
                      })
                      .finally(() => {
                        mutate()
                      }),
                    {
                      loading: "Sending invitation",
                      success: "Invitation sent successfully",
                      error: (err) => err.response.data.message,
                    },
                  )
                }}
              >
                Send Invite
              </Button>
              <Button
                onClick={() => {
                  handleExportFile()
                }}
              >
                <FaDownload className="mr-2" /> Template
              </Button>

              <Button onClick={() => fileInputRef.current?.click()}>
                {!isFileSelected ? (
                  <>
                    <FaUpload className="mr-2" />
                    Candidates
                  </>
                ) : (
                  <>
                    <FaFile className="mr-2" />
                    {fileName}
                  </>
                )}
              </Button>

              <Input
                className="hidden"
                type="file"
                accept=".csv"
                id="userMail"
                ref={fileInputRef}
                onChange={(e) => {
                  handleFileUpload(e)
                }}
              />

              <Button
                onClick={() => {
                  handleSubmitFile()
                }}
                disabled={!isFileSelected}
              >
                Submit
              </Button>
            </div>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        {data?.data?.userInWorkspace?.length ? (
          <Panigator
            dataLength={
              data?.data?.userInWorkspace
                ? data?.data?.userInWorkspace.length
                : 0
            }
            children={
              <ListUser
                listUser={data?.data?.userInWorkspace ?? []}
                page={page}
                size={size}
                workspace={Number(data.data.id)}
              />
            }
            size={size}
            page={page}
            setPage={setPage}
          />
        ) : (
          <></>
        )}
      </ContentPanel>
    </ContentLayout>
  )
}

export default WorkspaceCandidateList
