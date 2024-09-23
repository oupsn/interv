import * as React from "react"
import { IndividualUser } from "@/api/server"
import UserCard from "./UserCard"

export type ListWorkspaceProps = {
  listUser: IndividualUser[]
}

const ListWorkspaceCard: React.FC<ListWorkspaceProps> = ({ listUser }) => {
  return (
    <div className="w-full flex flex-wrap justify-start gap-8">
      {listUser?.map((user) => {
        return (
          <UserCard
            key={user.id}
            name={user.userData?.name ?? ""}
            username={user.userData?.username ?? ""}
            status={user.userInWorkspace?.status ?? ""}
          />
        )
      })}
    </div>
  )
}

export default ListWorkspaceCard
