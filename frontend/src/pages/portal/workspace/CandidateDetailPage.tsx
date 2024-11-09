import { Link, useNavigate, useParams } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import { useGetIndividualUser } from "@/hooks/userGetIndividualUser"
import { Spinner } from "@/components/ui/spinner"
import CodingResult from "./components/CodingResult"
import VideoResult from "@/pages/portal/workspace/components/VideoResult.tsx"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx"
import { Button } from "@/components/ui/button"
import { FaEdit, FaTrash } from "react-icons/fa"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { server } from "@/contexts/swr"
import { toast } from "sonner"

const CandidateDetailPage = () => {
  const navigate = useNavigate()
  const { workspaceId, candidateId } = useParams()
  const { data, isLoading } = useGetIndividualUser(
    Number(candidateId),
    Number(workspaceId),
  )
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
          .then(() =>
            navigate("/portal/workspace/" + workspaceId + "/applicantList"),
          ),
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
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    )
  }
  return (
    <>
      <ContentLayout
        title={data?.data?.name ?? ""}
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/portal/workspace">Workspaces</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link
                  to={"/portal/workspace/" + workspaceId + "/applicantList"}
                >
                  Applicant List
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data?.data?.name ?? ""}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
            <BreadcrumbList>
              <Button
                variant="outline"
                onClick={() => {
                  navigate("edit")
                }}
                size="icon"
              >
                <FaEdit />
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  handleDelete(
                    data?.data?.userId ?? 0,
                    data?.data?.workspaceId ?? 0,
                  )
                }
                size="icon"
              >
                <FaTrash />
              </Button>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <ContentPanel>
          <Tabs defaultValue="coding" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="coding">Coding</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
            </TabsList>
            <TabsContent value="coding">
              <CodingResult workspaceId={Number(workspaceId)} />
            </TabsContent>
            <TabsContent value="video">
              <VideoResult />
            </TabsContent>
          </Tabs>
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Delete Candidate</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this candidate? This action
                  cannot be undone.
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
        </ContentPanel>
      </ContentLayout>
    </>
  )
}

export default CandidateDetailPage
