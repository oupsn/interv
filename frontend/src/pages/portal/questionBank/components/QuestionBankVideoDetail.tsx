import { ContentLayout } from "@/components/layout/ContentLayout"
import ContentPanel from "@/components/layout/ContentPanel"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Spinner } from "@/components/ui/spinner.tsx"
import { useGetVideoQuestionDetail } from "@/hooks/useGetVideoQuestionDetail.ts"
import { textTruncate } from "@/pages/portal/questionBank/utils/utils.ts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import { toast } from "sonner"
import { server } from "@/contexts/swr.tsx"
import { useEffect, useState } from "react"

function QuestionBankVideoDetail() {
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<
    number | null
  >(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { videoQuestionId } = useParams()
  const navigate = useNavigate()
  const handleEdit = (id: number) => {
    navigate(`/portal/question/video/${encodeURIComponent(id)}/edit`)
  }
  const {
    data: videoQuestion,
    mutate,
    error,
  } = useGetVideoQuestionDetail(parseInt(videoQuestionId!))

  const handleDelete = (id: number) => {
    setSelectedItemToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedItemToDelete) {
      toast.promise(
        server.videoQuestion
          .deleteVideoQuestionById({ id: selectedItemToDelete })
          .then(() => {
            navigate("/portal/question/video")
          }),
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

  useEffect(() => {
    mutate().then(() => {
      setIsLoading(false)
    })
  }, [mutate])

  return (
    <ContentLayout
      title={"Video Question"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/portal/question/video">Video Questions</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isLoading
                  ? ""
                  : textTruncate(videoQuestion?.data?.title ?? "", 50)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <BreadcrumbList>
            <Button
              variant="outline"
              onClick={() => handleEdit(parseInt(videoQuestionId!))}
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
                  variant={"outline"}
                  onClick={() => handleDelete(videoQuestion?.data?.id ?? 0)}
                  size="icon"
                >
                  <FaTrash />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Delete Video Question</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this video question? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
          <div className={"space-y-6"}>
            <div>
              <p className="text-lg font-semibold mb-2">Question Title</p>
              <div>{videoQuestion?.data?.title}</div>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">Time To Prepare</p>
              <div>{videoQuestion?.data?.timeToPrepare}</div>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">Time To Answer</p>
              <div>{videoQuestion?.data?.timeToAnswer}</div>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">Max Attempt</p>
              <div>{videoQuestion?.data?.totalAttempt}</div>
            </div>
          </div>
        )}
      </ContentPanel>
    </ContentLayout>
  )
}

export default QuestionBankVideoDetail
