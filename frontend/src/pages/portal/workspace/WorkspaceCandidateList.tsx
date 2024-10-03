import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input.tsx"
import Papa from "papaparse"
import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { server } from "@/contexts/swr"
import { useGetWorkspace } from "@/hooks/useGetWorkspace"
import ListUser from "./components/ListUser"
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

const WorkspaceCandidateList = () => {
  const [importUser, setImportUser] = useState<UserData[]>()
  const { workspaceId } = useParams()
  const { data, mutate } = useGetWorkspace(Number(workspaceId))

  type UserData = {
    name: string
    username: string
    password: string
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

    return input
      .filter(
        (item): item is string[] =>
          Array.isArray(item) &&
          item.length === 4 &&
          item.every((i) => typeof i === "string"),
      )
      .map(([name, username, password, role]) => ({
        name,
        username,
        password,
        role,
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

  return (
    <ContentLayout
      title={"${Workspace name}"}
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
              <BreadcrumbPage>Workspace name</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        <Input
          className="w-64"
          type="file"
          accept=".csv"
          id="userMail"
          onChange={(e) => {
            handleFileUpload(e)
          }}
        />

        <Button
          className={
            "w-52 h-14 text-center font-semibold text-xl rounded-xl disabled:opacity-100"
          }
          onClick={() => {
            handleSubmitFile()
          }}
        >
          Submit
        </Button>

        <ListUser listUser={data?.data?.individualUser ?? []} />
      </ContentPanel>
    </ContentLayout>
  )
}

export default WorkspaceCandidateList
