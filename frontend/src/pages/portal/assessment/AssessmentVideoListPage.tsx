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

const AssessmentVideoListPage = () => {
  const { currentUser } = useCurrentUser()
  const {
    data: videoAssessmentList,
    error,
    isLoading,
  } = useGetVideoInterviewQuestionByPortalId(currentUser.portalId)
  const navigate = useNavigate()
  const handleAdd = () => {
    navigate("/portal/question/video/create")
  }
  const handleView = (id: number) => {
    navigate(`/portal/question/video/${encodeURIComponent(id)}`)
  }

  const handleEdit = (id: number) => {
    console.log("edit", id)
  }

  const handleDelete = (id: number) => {
    console.log("delete", id)
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
          <Button
            variant="outline"
            onClick={() => handleAdd()}
            className="flex flex-row items-center gap-2"
          >
            <Plus />
            Create new
          </Button>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading data</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Title</TableHead>
                <TableHead className={"w-[100px]"}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videoAssessmentList?.data?.map((item) => (
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
                      <Button
                        onClick={() => handleDelete(item.id ?? 0)}
                        size="icon"
                      >
                        <FaTrash />
                      </Button>
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

export default AssessmentVideoListPage
