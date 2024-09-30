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
import useCurrentUser from "@/hooks/UseCurrentUser"
import { Plus } from "lucide-react"
const AssessmentCodingListPage = () => {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  // TODO: replace with actual portalId
  const {
    data: codingAssessmentList,
    error,
    isLoading,
  } = useGetCodingInterviewQuestionByPortalId(currentUser.currentUser.portalId)

  const handleAdd = () => {
    navigate("/portal/assessment/coding/create")
  }
  const handleView = (title: string) => {
    navigate(`/portal/assessment/coding/${encodeURIComponent(title)}`)
  }

  const handleEdit = (id: number) => {
    console.log("edit", id)
  }

  const handleDelete = (id: number) => {
    console.log("delete", id)
  }

  return (
    <ContentLayout
      title={"Coding Assessments"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Coding Assessments</BreadcrumbPage>
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
                  <tr key={item.id} className="border-b hover:bg-iWhiteHover">
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
