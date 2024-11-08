import { ContentLayout } from "@/components/layout/ContentLayout"
import ContentPanel from "@/components/layout/ContentPanel"
import parse from "html-react-parser"
import CodeMirror from "@uiw/react-codemirror"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useGetCodingInterviewPlagarism } from "@/hooks/useGetCodingInterviewPlagarism"
import { useParams, Link } from "react-router-dom"
import { Spinner } from "@/components/ui/spinner"
import Convert from "ansi-to-html"
import DOMPurify from "dompurify"
import { useGetWorkspace } from "@/hooks/useGetWorkspace"
import { FileCode2, Users2, PercentCircle } from "lucide-react"
import useCurrentUser from "@/hooks/UseCurrentUser"

function PlagarismReport() {
  const { workspaceId } = useParams()
  const { currentUser } = useCurrentUser()
  const convert = new Convert()
  const { data, isLoading } = useGetCodingInterviewPlagarism(
    Number(workspaceId),
  )
  const { data: workspaceData } = useGetWorkspace(
    Number(workspaceId),
    Number(currentUser.portalId),
  )
  const truncatedTitle = workspaceData?.data?.title
    ? workspaceData.data.title.length > 30
      ? `${workspaceData.data.title.slice(0, 30)}...`
      : workspaceData.data.title
    : ""
  const cleanDescription = (text: string) => {
    return DOMPurify.sanitize(text)
  }
  return (
    <ContentLayout
      title={"Plagiarism Detection Report"}
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
              <BreadcrumbPage>
                <BreadcrumbLink asChild>
                  <Link to={`/portal/workspace/${workspaceId}`}>
                    {truncatedTitle}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Plagarism Report</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-xl font-bold mb-2">
                Code Similarity Analysis
              </h1>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 leading-relaxed">
                  This report analyzes code similarity between source and target
                  submissions with a threshold of 70% or higher. The report will
                  auto generate every night at 12:00 AM UTC. The comparison uses
                  the following color coding:
                  <div className="flex gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                      <span>Identical code</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Differences in source</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Differences in target</span>
                    </span>
                  </div>
                </p>
              </div>
            </div>

            {!data?.data && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FileCode2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  No plagiarism detected in this workspace.
                </p>
              </div>
            )}

            {data?.data && data.data.length > 0 && (
              <div className="space-y-8">
                {data.data.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-6 bg-white shadow-sm"
                  >
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <FileCode2 className="w-5 h-5 text-gray-500" />
                      {item.question_title}
                    </h2>

                    <div className="bg-gray-50 p-3 rounded-md mb-4 flex items-center gap-2">
                      <PercentCircle className="w-5 h-5" />
                      <span className="font-medium">Similarity Score:</span>
                      <span
                        className={`text-sm font-bold ${
                          (item.score ?? 0) >= 0.85
                            ? "text-red-500"
                            : (item.score ?? 0) >= 0.7
                              ? "text-orange-500"
                              : (item.score ?? 0) >= 0.6
                                ? "text-yellow-500"
                                : "text-green-500"
                        }`}
                      >
                        {((item.score ?? 0) * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Users2 className="w-4 h-4 text-gray-500" />
                          <p className="font-medium">
                            Source: {item.source_user_name}
                          </p>
                        </div>
                        <CodeMirror
                          value={item.source_code}
                          height="300px"
                          className="border rounded-md overflow-hidden"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Users2 className="w-4 h-4 text-gray-500" />
                          <p className="font-medium">
                            Target: {item.target_user_name}
                          </p>
                        </div>
                        <CodeMirror
                          value={item.target_code}
                          height="300px"
                          className="border rounded-md overflow-hidden"
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Detailed Comparison</h3>
                        <div className="bg-gray-50 p-4 rounded-lg overflow-y-auto max-h-[300px]">
                          {parse(
                            cleanDescription(convert.toHtml(item.diff ?? "")),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </ContentPanel>
    </ContentLayout>
  )
}

export default PlagarismReport
