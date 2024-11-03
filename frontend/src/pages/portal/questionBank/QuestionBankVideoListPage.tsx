import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"
import { Video } from "lucide-react"
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
import { textTruncate } from "@/pages/portal/questionBank/utils/utils.ts"
import Panigator from "../workspace/components/Panigator"
import SearchBar from "../workspace/components/SearchBar"
const QuestionBankVideoListPage = () => {
  const { currentUser } = useCurrentUser()
  const [page, setPage] = useState(1)
  const size = 10
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
  const [searchTerm, setSearchTerm] = useState("")
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

  const filteredQuestion =
    videoQuestionList?.data?.filter((question) =>
      question.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) ?? []

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
              <BreadcrumbPage className="flex flex-row items-center">
                <Video className="mr-2" size={20} />
                Video Questions
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            <BreadcrumbItem>
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
              />
            </BreadcrumbItem>
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
          <Panigator
            dataLength={filteredQuestion.length}
            children={
              <Table className="border">
                <TableHeader className="border-b">
                  <TableRow className="bg-gray-50">
                    <TableHead className="p-2 text-sm absolute left-2">
                      Title
                    </TableHead>
                    <TableHead className="p-2 text-sm text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuestion.map((item, index) => {
                    if (index >= (page - 1) * size && index <= page * size - 1)
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="px-4 py-2 text-sm">
                            {textTruncate(item.title ?? "", 120)}
                          </TableCell>
                          <TableCell className="px-4 py-2 text-sm text-center">
                            <div className="flex gap-2 justify-center">
                              <Button
                                onClick={() => handleView(item.id!)}
                                size="icon"
                              >
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
                                    <DialogTitle>
                                      Delete Video Question
                                    </DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to delete this video
                                      question? This action cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        setIsDeleteDialogOpen(false)
                                      }
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
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                  })}
                </TableBody>
              </Table>
            }
            size={size}
            page={page}
            setPage={setPage}
          />
        )}
      </ContentPanel>
    </ContentLayout>
  )
}

export default QuestionBankVideoListPage
