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
import SearchBar from "./components/SearchBar"

const WorkspaceCandidateList = () => {
  const [importUser, setImportUser] = useState<UserData[]>()
  const [page, setPage] = useState(1)
  const size = 10
  const { workspaceId } = useParams()
  const { data, mutate, isLoading } = useGetWorkspace(Number(workspaceId))
  const [searchTerm, setSearchTerm] = useState("")
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
    setIsFileSelected(!!file)
    setFileName(file?.name ?? "")
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
                  specialCharRegex.test(cell) && cell.length <= 40, // Check special chars and length
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

  const filteredUsers =
    data?.data?.userInWorkspace?.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) ?? []

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <ContentLayout
      title={data?.data?.title ?? ""}
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
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
              />
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
        {filteredUsers.length ? (
          <Panigator
            dataLength={filteredUsers.length}
            children={
              <ListUser
                listUser={filteredUsers}
                page={page}
                size={size}
                workspace={Number(workspaceId)}
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
