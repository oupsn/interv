import * as React from "react"
import { DomainsWorkspaceScore, UserInWorkspace } from "@/api/server"

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table"
import {
  FaTrash,
  FaRegUser,
  FaStar,
  FaRegStar,
  FaEye,
  FaEdit,
} from "react-icons/fa"
import { LiaHourglassEndSolid } from "react-icons/lia"
import { Button } from "@/components/ui/button"
import { server } from "@/contexts/swr"
import { useGetWorkspace } from "@/hooks/useGetWorkspace"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

export type ListWorkspaceProps = {
  listUser: UserInWorkspace[]
  listScore: DomainsWorkspaceScore
  page: number
  size: number
  workspaceId: number
  portalId: number
}

const ListUser: React.FC<ListWorkspaceProps> = ({
  listUser,
  listScore,
  page,
  size,
  workspaceId,
  portalId,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<
    [number | null, number | null]
  >([null, null])

  const handleDelete = (userId: number, workspaceId: number) => {
    setSelectedItemToDelete([userId, workspaceId])
    setIsDeleteDialogOpen(true)
  }
  const confirmDelete = () => {
    if (selectedItemToDelete) {
      toast.promise(
        server.userInWorkspace
          .deleteUserFromWorkspace({
            userId: selectedItemToDelete[0] ?? 0,
            workspaceId: selectedItemToDelete[1] ?? 0,
          })
          .then(() => mutate()),
        {
          loading: "Deleting...",
          success: "Deleted successfully",
          error: "Failed to delete",
        },
      )
    }
    setIsDeleteDialogOpen(false)
    setSelectedItemToDelete([null, null])
  }
  const { mutate } = useGetWorkspace(workspaceId, portalId)
  const navigate = useNavigate()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={"w-2/6"}>Name</TableHead>
          <TableHead className={"w-2/6"}>Email</TableHead>
          <TableHead>Status</TableHead>
          {listScore && <TableHead>Score</TableHead>}
          <TableHead className={"w-[100px]"}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listUser?.map((user, index) => {
          if (index >= (page - 1) * size && index <= page * size - 1)
            return (
              <>
                <TableRow key={user.userId}>
                  <TableCell className="font-medium ">
                    <div className="flex flex-row gap-1">
                      <FaRegUser className="text-primary text-lg" />
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell className="font-medium">{user.status}</TableCell>
                  {listScore && (
                    <TableCell className="font-medium ">
                      {user.status === "success" ? (
                        <>
                          {listScore.candidateScore?.[
                            user.userId?.toString() ?? "0"
                          ] ?? 0}{" "}
                          / {listScore.totalTestCase ?? 0}
                        </>
                      ) : (
                        <LiaHourglassEndSolid className="text-primary ml-2 text-xl" />
                      )}
                    </TableCell>
                  )}
                  <TableCell>
                    <td className="flex w-fit gap-2">
                      {user.status == "idle" ? (
                        <Button
                          size="icon"
                          onClick={() => {
                            navigate(user.userId?.toString() ?? "0")
                          }}
                        >
                          <FaEye />
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          onClick={() => {
                            console.log(user.userId)
                            toast.promise(
                              server.userInWorkspace
                                .interestUser({
                                  workspaceId: user.workspaceId,
                                  userId: user.userId,
                                  isInterest: user.isInterest,
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
                          {user.isInterest ? <FaStar /> : <FaRegStar />}
                        </Button>
                      )}

                      {user.status == "idle" ? (
                        <Button
                          size="icon"
                          onClick={() => {
                            navigate((user.userId?.toString() ?? "0") + "/edit")
                          }}
                        >
                          <FaEdit />
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          onClick={() => {
                            navigate(user.userId?.toString() ?? "0")
                          }}
                        >
                          <FaEye />
                        </Button>
                      )}
                      <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            onClick={() =>
                              handleDelete(
                                user.userId ?? 0,
                                user.workspaceId ?? 0,
                              )
                            }
                            size="icon"
                          >
                            <FaTrash />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Delete Video Question</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this video
                              question? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsDeleteDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={confirmDelete}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </TableCell>
                </TableRow>
              </>
            )
        })}
      </TableBody>
    </Table>
  )
}

export default ListUser
