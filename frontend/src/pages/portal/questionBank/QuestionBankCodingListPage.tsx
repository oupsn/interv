import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { useGetCodingInterviewQuestionByPortalId } from "@/hooks/useGetCodingInterviewQuestionByPortalId"
import { FaCode, FaEye, FaEdit, FaTrash } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useCurrentUser from "@/hooks/UseCurrentUser"
import { useState } from "react"
import { server } from "@/contexts/swr.tsx"
import { toast } from "sonner"
import { useEffect } from "react"
import useIsFocused from "@/hooks/useIsFocused"
import { useLocation } from "react-router-dom"
import { Plus } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Panigator from "../workspace/components/Panigator"
import { textTruncate } from "./utils/utils"
import SearchBar from "../workspace/components/SearchBar"
import DifficultyDropdown from "../workspace/components/DifficultyDropdown"

const QuestionBankCodingListPage = () => {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const isFocused = useIsFocused()
  const location = useLocation()
  const [page, setPage] = useState(1)
  const [size] = useState(10)
  const {
    data: codingQuestionList,
    error,
    isLoading,
    mutate,
  } = useGetCodingInterviewQuestionByPortalId(currentUser.currentUser.portalId)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleAdd = () => {
    navigate("/portal/question/coding/create")
  }
  const handleView = (title: string) => {
    navigate(`/portal/question/coding/${encodeURIComponent(title)}`)
  }

  const handleEdit = (title: string) => {
    navigate(`/portal/question/coding/edit/${encodeURIComponent(title)}`)
  }

  const handleDelete = (id: number) => {
    setDeleteItemId(id)
    setIsDeleteDialogOpen(true)
  }

  const filteredQuestion =
    codingQuestionList?.data?.filter((question) => {
      const matchesSearch = question.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesDifficulty =
        selectedDifficulty === "" || question.difficulty === selectedDifficulty
      return matchesSearch && matchesDifficulty
    }) ?? []

  const confirmDelete = () => {
    if (deleteItemId) {
      toast.promise(
        server.codingInterview
          .deleteQuestion(deleteItemId)
          .then(() => mutate()),
        {
          loading: "Deleting...",
          success: "Deleted successfully",
          error: "Failed to delete",
        },
      )
    }
    setIsDeleteDialogOpen(false)
    setDeleteItemId(null)
  }

  useEffect(() => {
    if (isFocused || location.state?.refresh) {
      mutate()
      // Clear the refresh flag from location state
      if (location.state?.refresh) {
        navigate(location.pathname, { replace: true, state: {} })
      }
    }
  }, [isFocused, location, mutate, navigate])

  return (
    <ContentLayout
      title={"Coding Questions"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList className="flex flex-row justify-between">
            <BreadcrumbItem>
              <BreadcrumbPage>Coding Questions</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbItem></BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            <BreadcrumbItem>
              Difficulty:
              <DifficultyDropdown
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={setSelectedDifficulty} // Update difficulty state
              />
            </BreadcrumbItem>
            <BreadcrumbItem>
              Title:
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
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading data</p>
        ) : (
          <>
            <Panigator
              dataLength={filteredQuestion.length}
              children={
                <div className="overflow-x-auto">
                  <Table className="min-w-full border">
                    <TableHeader className="border-b">
                      <TableRow className="bg-gray-50">
                        <TableHead className="p-2 text-sm ml-4 text-center">
                          Title
                        </TableHead>
                        <TableHead className="p-2 text-sm text-center">
                          Difficulty
                        </TableHead>
                        <TableHead className="p-2 text-sm text-center">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuestion.map((item, index) => {
                        if (
                          index >= (page - 1) * size &&
                          index <= page * size - 1
                        )
                          return (
                            <TableRow
                              key={item.id}
                              className="border-b hover:bg-gray-100"
                            >
                              <TableCell className="px-4 py-2 flex items-center gap-4">
                                <FaCode className="mr-2" size={20} />
                                <span>
                                  {textTruncate(item.title ?? "", 50)}
                                </span>
                              </TableCell>
                              <TableCell className="px-4 py-2 text-center">
                                {" "}
                                <Badge
                                  className={`ml-2 badge ${item.difficulty === "easy" ? "bg-green-300" : item.difficulty === "moderate" ? "bg-yellow-300" : "bg-red-300"}`}
                                  variant={"secondary"}
                                >
                                  {item.difficulty}
                                </Badge>
                              </TableCell>
                              <TableCell className="px-4 py-2 flex items-center gap-2 justify-center">
                                <Button
                                  onClick={() => handleView(item.title ?? "")}
                                  size="icon"
                                >
                                  <FaEye />
                                </Button>
                                <Button
                                  onClick={() => handleEdit(item.title ?? "")}
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
                                        Confirm Deletion
                                      </DialogTitle>
                                      <DialogDescription>
                                        Are you sure you want to delete this
                                        coding question? This action cannot be
                                        undone.
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
                              </TableCell>
                            </TableRow>
                          )
                      })}
                    </TableBody>
                  </Table>
                </div>
              }
              size={size}
              page={page}
              setPage={setPage}
            />
          </>
        )}
      </ContentPanel>
    </ContentLayout>
  )
}

export default QuestionBankCodingListPage
