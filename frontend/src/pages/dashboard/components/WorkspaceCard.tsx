import * as React from "react"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

export type WorkspaceProps = {
  workspaceId: number
  title: string
  member: number
  createAt: string
}

const WorkspaceCard: React.FC<WorkspaceProps> = ({
  workspaceId,
  title,
  member,
  createAt,
}) => {
  const navigate = useNavigate()
  return (
    <div
      className={
        "w-80 h-72 p-6 flex flex-col justify-between text-lg text-start text-slate-600 text-wrap shadow-lg rounded-lg border-solid border-2 border-slate-200 hover:scale-105 cursor-pointer"
      }
      onClick={() => navigate(workspaceId.toString())}
    >
      <div className="w-52 grid gap-3">
        <div className="text-primary text-4xl font-bold">{title}</div>
        <div className="text-2xl font-semibold">
          {member > 1 ? member + " Candidates" : member + " Candidate"}
        </div>
      </div>
      <div className="text-slate-400 font-normal">
        Created on {dayjs(createAt).format("MM/DD/YYYY HH:mm A")}
      </div>
    </div>
  )
}

export default WorkspaceCard
