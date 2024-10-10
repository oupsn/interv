import { Button } from "@/components/ui/button"
import { TableRow, TableCell } from "@/components/ui/table"
import * as React from "react"
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"

export type NewUserCardProps = {
  id: number
  name: string
  username: string
  status: string
}

const NewUserCard: React.FC<NewUserCardProps> = ({
  id,
  name,
  username,
  status,
}) => {
  return (
    <TableRow key={id}>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="font-medium">{username}</TableCell>
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
        <TableCell className="font-medium">{status}</TableCell>
      </TableCell>
    </TableRow>
  )
}

export default NewUserCard
