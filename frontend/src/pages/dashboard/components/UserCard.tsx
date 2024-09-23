import * as React from "react"

export type UserCardProps = {
  name: string
  username: string
  status: string
}

const WorkspaceCard: React.FC<UserCardProps> = ({ name, username, status }) => {
  return (
    <div
      className={
        "w-80 h-72 p-6 flex flex-col justify-between text-lg text-start text-slate-600 text-wrap shadow-lg rounded-lg border-solid border-2 border-slate-200 hover:scale-105 cursor-pointer"
      }
    >
      <div className="w-52 grid gap-3">
        <div className="text-primary text-4xl font-bold">Name: {name}</div>
        <div className="text-2xl font-semibold">UserName: {username}</div>
      </div>
      <div className="text-slate-400 font-normal">Status: {status}</div>
    </div>
  )
}

export default WorkspaceCard
