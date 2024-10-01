import * as React from "react"
import WorkspaceCard from "./WorkspaceCard"
import { WorkspaceDetail } from "@/api/server"

export type ListWorkspaceProps = {
  workspace: WorkspaceDetail[]
}
const ListWorkspaceCard: React.FC<ListWorkspaceProps> = ({ workspace }) => {
  return (
    <div className="w-full flex flex-wrap justify-start gap-8">
      {workspace?.map((Workspace) => {
        return (
          <WorkspaceCard
            key={Workspace.id}
            workspaceId={Workspace.id ?? 0}
            title={Workspace.title ?? ""}
            createAt={Workspace.startDate ?? ""}
            member={Workspace.memberNum ?? 0}
          />
        )
      })}
    </div>
  )
}

export default ListWorkspaceCard
