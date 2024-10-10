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
import { FaEye, FaEdit, FaTrash, FaRegUser } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export type ListWorkspaceProps = {
  listUser: IndividualUser[]
  page: number
  size: number
}

const ListUser: React.FC<ListWorkspaceProps> = ({ listUser, page, size }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={"w-2/6"}>Name</TableHead>
          <TableHead className={"w-2/6"}>Username</TableHead>
          <TableHead className={"w-1/6"}>Actions</TableHead>
          <TableHead className={"w-1/6"}>Score</TableHead>
          <TableHead className={"w-1/6"}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listUser?.map((user, index) => {
          if (index >= (page - 1) * size && index <= page * size - 1)
            return (
              <TableRow key={user.id} className="">
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
                <TableCell className="font-medium">0/20</TableCell>
                <TableCell>
                  <td className="flex w-fit gap-2">
                    <Button onClick={() => {}}>
                      <FaEye />
                    </Button>
                    <Button onClick={() => {}}>
                      <FaEdit />
                    </Button>
                    <Button onClick={() => {}}>
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
