import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"
import { Button } from "@/components/ui/button.tsx"
import useCurrentUser from "@/hooks/UseCurrentUser.ts"
import { useNavigate } from "react-router-dom"
import { useGetVideoInterviewQuestionByPortalId } from "@/hooks/useGetVideoInterviewQuestionByPortalId.ts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import { Plus } from "lucide-react"
import { Spinner } from "@/components/ui/spinner.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import { useState } from "react"
import { toast } from "sonner"
import { server } from "@/contexts/swr.tsx"

const QuestionBankVideoListPage = () => {
  const { currentUser } = useCurrentUser()
  const {
    data: videoQuestionList,
    error,
    mutate,
    isLoading,
  } = useGetVideoInterviewQuestionByPortalId(currentUser.portalId)
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<
    number | null
  >(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const navigate = useNavigate()
  const handleAdd = () => {
    navigate("/portal/question/video/create")
  }
  const handleView = (id: number) => {
    navigate(`/portal/question/video/${encodeURIComponent(id)}`)
  }

  const handleEdit = (id: number) => {
    navigate(`/portal/question/video/${encodeURIComponent(id)}/edit`)
  }

  const handleDelete = (id: number) => {
    setSelectedItemToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedItemToDelete) {
      toast.promise(
        server.videoQuestion
          .deleteVideoQuestionById({ id: selectedItemToDelete })
          .then(() => mutate()),
        {
          loading: "Deleting...",
          success: "Deleted successfully",
          error: "Failed to delete",
        },
      )
    }
    setIsDeleteDialogOpen(false)
    setSelectedItemToDelete(null)
  }

  return (
    <ContentLayout
      title={"Video Questions"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Video Questions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            <Button
              variant="outline"
              onClick={() => handleAdd()}
              className="flex flex-row items-center gap-2"
            >
              <Plus />
              Create new
            </Button>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div>Error: {error.message}</div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className={"w-[100px]"}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videoQuestionList?.data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <td className="flex w-fit gap-2">
                      <Button onClick={() => handleView(item.id!)} size="icon">
                        <FaEye />
                      </Button>
                      <Button
                        onClick={() => handleEdit(item.id ?? 0)}
                        size="icon"
                      >
                        <FaEdit />
                      </Button>
                      <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => handleDelete(item.id ?? 0)}
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
              ))}
            </TableBody>
          </Table>
        )}
      </ContentPanel>
    </ContentLayout>
  )
}

export default QuestionBankVideoListPage
