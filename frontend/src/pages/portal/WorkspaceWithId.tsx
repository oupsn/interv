import SideBarItem from "@/components/layout/SideBarItem.tsx"
import SideBar from "@/components/layout/SideBar.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input.tsx"
import Papa from "papaparse"
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { server } from "@/contexts/swr"
import { useGetWorkspace } from "@/hooks/useGetWorkspace"
import ListUser from "./components/ListUser"

const WorkspaceWithId = () => {
  const [importUser, setImportUser] = useState<UserData[]>()
  const { workspaceId } = useParams()
  const { data, mutate } = useGetWorkspace(Number(workspaceId))

  type UserData = {
    name: string
    username: string
    password: string
    role: string
  }

  type ImportData = {
    listuser: UserData[]
    workspaceId: number
  }

  function parseUserData(input: unknown[]): UserData[] {
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
      listuser: importUser ?? [],
      workspaceId: Number(workspaceId),
    }
    console.log(workspaceId)
    console.log(importUser)
    if (importUser) {
      server.user.createUser(importData).finally(() => {
        mutate()
      })
    }
  }

  return (
    <>
      <SideBar isSignOutEnabled={true}>
        <SideBarItem title={"Candidate"} isActive={true} />
        <SideBarItem title={"Assessment"} isActive={false} onClick={() => {}} />
      </SideBar>
      <MainPanel>
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
      </MainPanel>
    </>
  )
}

export default WorkspaceWithId
