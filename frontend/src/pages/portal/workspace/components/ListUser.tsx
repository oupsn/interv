import * as React from "react"
import { IndividualUser } from "@/api/server"

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table"
import { FaTrash, FaRegUser, FaStar, FaRegStar, FaEye } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { server } from "@/contexts/swr"
import { useGetWorkspace } from "@/hooks/useGetWorkspace"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export type ListWorkspaceProps = {
  listUser: IndividualUser[]
  page: number
  size: number
  workspace: number
}

const ListUser: React.FC<ListWorkspaceProps> = ({
  listUser,
  page,
  size,
  workspace,
}) => {
  const { mutate } = useGetWorkspace(workspace)
  const navigate = useNavigate()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={"w-2/6"}>Name</TableHead>
          <TableHead className={"w-2/6"}>Username</TableHead>
          <TableHead>Actions</TableHead>
          <TableHead className={"w-[100px]"}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listUser?.map((user, index) => {
          if (index >= (page - 1) * size && index <= page * size - 1)
            return (
              <TableRow key={user.userInWorkspace.userId}>
                <TableCell className="font-medium ">
                  <div className="flex flex-row gap-1">
                    <FaRegUser className="text-primary text-lg" />
                    {user.userData?.name}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {user.userData?.username}
                </TableCell>
                <TableCell className="font-medium">
                  {user.userInWorkspace.status}
                </TableCell>
                <TableCell>
                  <td className="flex w-fit gap-2">
                    <Button
                      size="icon"
                      onClick={() => {
                        console.log(user.userData.id)
                        toast.promise(
                          server.userInWorkspace
                            .interestUser({
                              workspaceId: user.userInWorkspace.workspaceId,
                              userId: user.userData.id ?? 0,
                              isInterest: user.userInWorkspace.isInterest,
                            })
                            .then(() => mutate()),
                          {
                            loading: "Interest candidate",
                            success: "Process successfully",
                            error: (err) => {
                              return err.response.data.message
                            },
                          },
                        )
                      }}
                    >
                      {user.userInWorkspace.isInterest ? (
                        <FaStar />
                      ) : (
                        <FaRegStar />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => {
                        navigate(user.userData.id?.toString() ?? "0")
                      }}
                    >
                      <FaEye />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => {
                        server.userInWorkspace
                          .deleteUserFromWorkspace({
                            userId: user.userInWorkspace.userId,
                            workspaceId: user.userInWorkspace.workspaceId,
                          })
                          .then(() => mutate())
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </TableCell>
              </TableRow>
            )
        })}
      </TableBody>
    </Table>
  )
}

export default ListUser
