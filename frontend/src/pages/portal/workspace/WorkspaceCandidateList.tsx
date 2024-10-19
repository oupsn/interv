import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input.tsx"
import Papa from "papaparse"
import React, { useState } from "react"
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

const WorkspaceCandidateList = () => {
  const [importUser, setImportUser] = useState<UserData[]>()
  const [page, setPage] = useState(1)
  const size = 10
  const { workspaceId } = useParams()
  const { data, mutate, isLoading } = useGetWorkspace(Number(workspaceId))

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
    const currentTimestamp = new Date().toISOString() // Generate once for all entries
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return input
      .slice(1) // Skip header
      .filter(
        (item): item is string[] =>
          Array.isArray(item) &&
          item.length === 2 &&
          item.every((i) => typeof i === "string") &&
          emailRegex.test(item[1]), // Validate email format
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
    const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB limit in bytes

    // Early return if no file or the file exceeds size limit
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

            // Regex to check for special characters (allows alphanumeric, space, comma, dot, dash, and @)
            const specialCharRegex = /^[a-zA-Z\s,.\-@]+$/

            // Validate each row and cell for special characters and length
            const isValid = data.every((row: string[]) =>
              row.every(
                (cell: string) =>
                  specialCharRegex.test(cell) && cell.length <= 30, // Check special chars and length
              ),
            )

            if (isValid) {
              setImportUser(parseUserData(data))
              resolve()
            } else {
              reject(
                new Error(
                  "File contains special characters that are not allowed, or some cells exceed 30 characters.",
                ),
              )
            }
          },
          error: (error) => {
            reject(error) // Handle parse errors
          },
        })
      })

      // Show a toast for promise
      await toast.promise(fileUploadPromise, {
        loading: "Processing file...",
        success: "File processed successfully!",
        error: (err) =>
          err instanceof Error ? err.message : "Something went wrong",
      })
    } catch (error: unknown) {
      // Narrow down the error type to access message
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred"
      toast.error(errorMessage) // Display the error message
    }
    console.log(importUser)
  }

  const handleSubmitFile = () => {
    const importData: ImportData = {
      listUser: importUser ?? [],
      workspaceId: Number(workspaceId),
    }
    if (importUser && importUser.length > 0) {
      // Proceed with the toast promise if there are users
      toast.promise(
        server.user.createUser(importData).finally(() => {
          mutate() // Refresh the data after the operation
        }),
        {
          loading: "Processing file...",
          success: "File processed successfully!",
          error: (err) =>
            err instanceof Error ? err.message : "Something went wrong",
        },
      )
    } else {
      // If importUser has no data, show an error message
      toast.error("No Data or File might be invalid") // Notify user about the absence of data
    }
  }

  const handleExportFile = () => {
    const csvRows = [["name", "username"]]
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
      title={data?.data?.workspaceDetail.title ?? ""}
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
              <BreadcrumbPage>Applicant List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            <Button
              className="mr-5"
              onClick={() => {
                toast.promise(
                  server.workspace
                    .inviteAllCandidate({
                      workspaceId: data?.data?.workspaceDetail.id ?? 0,
                    })
                    .finally(() => {
                      mutate() // Refresh the data after sending invitations
                    }),
                  {
                    loading: "Sending invitation",
                    success: "Invitation sent successfully",
                    error: (err) => {
                      return err.response.data.message
                    },
                  },
                )
              }}
            >
              Invite All
            </Button>

            <div className="flex flex-row gap-2">
              <Button
                onClick={() => {
                  handleExportFile()
                }}
              >
                Download Template
              </Button>
              <Input
                className="w-1/2"
                type="file"
                accept=".csv"
                id="userMail"
                onChange={(e) => {
                  handleFileUpload(e)
                }}
              />

              <Button
                onClick={() => {
                  handleSubmitFile()
                }}
              >
                Submit
              </Button>
            </div>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        {data?.data?.individualUser ? (
          <Panigator
            dataLength={
              data?.data?.individualUser ? data?.data?.individualUser.length : 0
            }
            children={
              <ListUser
                listUser={data?.data?.individualUser ?? []}
                page={page}
                size={size}
                workspace={Number(data.data.workspaceDetail.id)}
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
