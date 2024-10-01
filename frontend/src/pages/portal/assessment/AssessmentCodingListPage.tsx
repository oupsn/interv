import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { useGetCodingInterviewQuestionByPortalId } from "@/hooks/useGetCodingInterviewQuestionByPortalId"
import { FaCode, FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa"
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

const AssessmentCodingListPage = () => {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const isFocused = useIsFocused()
  const location = useLocation()
  const {
    data: codingAssessmentList,
    error,
    isLoading,
    mutate,
  } = useGetCodingInterviewQuestionByPortalId(currentUser.currentUser.portalId)

  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleAdd = () => {
    navigate("/portal/assessment/coding/create")
  }
  const handleView = (title: string) => {
    navigate(`/portal/assessment/coding/${encodeURIComponent(title)}`)
  }

  const handleEdit = (title: string) => {
    navigate(`/portal/assessment/coding/edit/${encodeURIComponent(title)}`)
  }

  const handleDelete = (id: number) => {
    setDeleteItemId(id)
    setIsDeleteDialogOpen(true)
  }

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
      title={"Coding Assessments"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList className="flex flex-row justify-between">
            <BreadcrumbItem>
              <BreadcrumbPage>Coding Assessments</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Button
                variant="outline"
                onClick={() => handleAdd()}
                className="flex flex-row items-center gap-2"
              >
                <FaPlus />
                Create new
              </Button>
            </BreadcrumbItem>
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
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="border-b">
                <tr className="bg-gray-50">
                  <th className="p-2 text-sm ml-4 text-center">Title</th>
                  <th className="p-2 text-sm text-center">Difficulty</th>
                  <th className="p-2 text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {codingAssessmentList?.data?.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2 flex items-center gap-4">
                      <FaCode className="mr-2" size={20} />
                      <span>{item.title}</span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {" "}
                      <Badge
                        className={`ml-2 badge ${item.difficulty === "easy" ? "bg-green-300" : item.difficulty === "moderate" ? "bg-yellow-300" : "bg-red-300"}`}
                        variant={"secondary"}
                      >
                        {item.difficulty}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 flex items-center gap-2 justify-center">
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
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this coding
                              assessment? This action cannot be undone.
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ContentPanel>
    </ContentLayout>
  )
}

export default AssessmentCodingListPage
