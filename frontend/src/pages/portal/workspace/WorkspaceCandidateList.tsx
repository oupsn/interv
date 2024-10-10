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

  function parseUserData(input: unknown[]): UserData[] {
    const currentTimestamp = new Date().toISOString() // or any timestamp logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return input
      .slice(1)
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      Papa.parse(file, {
        skipEmptyLines: true,
        complete: (results) => {
          setImportUser(parseUserData(results.data))
        },
      })
    }
  }

  const handleSubmitFile = () => {
    const importData: ImportData = {
      listUser: importUser ?? [],
      workspaceId: Number(workspaceId),
    }
    if (importUser) {
      server.user.createUser(importData).finally(() => {
        mutate()
      })
    }
    console.log(data?.data?.workspaceDetail)
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
              <BreadcrumbPage>Candidate List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            <Button
              className="mr-5"
              onClick={() => {
                toast.promise(
                  server.workspace.inviteAllCandidate({
                    workspaceId: data?.data?.workspaceDetail.id ?? 0,
                  }),
                  {
                    loading: "Sending invitation",
                    success: "Invitation send successfully",
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
                Import Template
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
