import { Button } from "@/components/ui/button"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import MainPanel from "@/components/layout/MainPanel"
import { useGetRoomContext } from "@/hooks/useGetRoomContext"
import dayjs from "dayjs"
import { Spinner } from "@/components/ui/spinner"
import TopBar from "@/components/layout/TopBar"
import TopBarItem from "@/components/layout/TopBarItem"
import { Clock, Video, Code, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const RoomPage = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { data, error, isLoading } = useGetRoomContext(roomId!)

  /*   const timeRemaining = data?.data?.dueDate
    ? dayjs(data.data.dueDate).diff(dayjs(), "hour")
    : 0 */

  return (
    <div className="flex flex-col w-dvw h-dvh">
      <TopBar>
        <TopBarItem
          title="Home"
          onClick={() => navigate(location.pathname)}
          isActive={!location.pathname.includes("guideline")}
        />
        <TopBarItem
          title="Guideline"
          onClick={() => navigate(location.pathname + "/guideline")}
          isActive={location.pathname.includes("guideline")}
        />
      </TopBar>
      <MainPanel className="flex flex-col justify-center items-center gap-2">
        {isLoading ? (
          <Spinner size="lg" />
        ) : error ? (
          <div className="p-4 space-y-6 text-center max-w-lg mx-auto">
            <Alert className="border-0">
              <AlertDescription className="flex flex-col gap-4">
                <Info className="h-12 w-12 mx-auto text-destructive" />
                <p className="text-lg font-medium">Something went wrong</p>
                <p>
                  Please contact the interview owner if you believe this is a
                  mistake.
                </p>
              </AlertDescription>
            </Alert>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Info className="h-4 w-4" />
              <p>
                Need help? Email:{" "}
                <a
                  href="mailto:help@interv.cc"
                  className="text-primary hover:underline"
                >
                  help@interv.cc
                </a>
              </p>
            </div>
          </div>
        ) : data?.data?.isOverdue ? (
          <div className="p-4 space-y-4 text-center">
            <p className="text-2xl font-semibold">
              Hi {data?.data?.candidateName}
            </p>
            <Alert>
              <AlertDescription className="mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  This interview was overdue on{" "}
                  <span className="font-semibold">
                    {dayjs(data?.data?.dueDate).format(
                      "ddd, DD MMM YYYY HH:mm:ss Z",
                    )}
                  </span>
                </div>
              </AlertDescription>
            </Alert>

            <p>
              Please contact the interview owner if you believe something seems
              wrong.
            </p>
            <p>Need more info? Email: help@interv.cc</p>
          </div>
        ) : (
          <>
            <div className="p-4 space-y-4 text-center max-w-2xl">
              <p className="text-3xl font-semibold mb-4">
                Welcome, {data?.data?.candidateName}!
              </p>
              <p className="text-gray-500">
                You are invited to complete the interview by{" "}
                {data?.data?.companyName}
              </p>

              <Alert className="mb-6">
                <AlertDescription>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Please complete this interview before{" "}
                    <span className="font-semibold">
                      {dayjs(data?.data?.dueDate).format(
                        "ddd, DD MMM YYYY HH:mm:ss Z",
                      )}
                    </span>
                  </div>
                </AlertDescription>
              </Alert>
            </div>

            <div className="flex gap-12">
              {data?.data?.totalVideoQuestion !== undefined &&
                data?.data?.totalVideoQuestion > 0 && (
                  <div className="shadow-xl text-center rounded-xl p-8 space-y-4 w-[340px] hover:shadow-2xl transition-shadow">
                    <div className="flex justify-center mb-4">
                      <Video className="w-12 h-12 text-primary" />
                    </div>
                    <p className="text-2xl font-semibold">Video Questions</p>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        {data?.data?.totalVideoQuestion} questions to complete
                      </p>
                      <p className="text-sm text-gray-500">
                        Estimated time: {data?.data?.totalVideoQuestion * 5}{" "}
                        minutes
                      </p>
                    </div>
                    {data?.data?.isVideoDone ? (
                      <p className="text-green-600 font-semibold flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        Completed
                      </p>
                    ) : (
                      <Button
                        onClick={() => navigate("video")}
                        className="w-full"
                      >
                        Start Video Question
                        {data?.data?.totalVideoQuestion > 1 ? "s" : ""}
                      </Button>
                    )}
                  </div>
                )}
              {data?.data?.totalCodingQuestion !== undefined &&
                data?.data?.totalCodingQuestion > 0 && (
                  <div className="shadow-xl text-center rounded-xl p-8 space-y-4 w-[340px] hover:shadow-2xl transition-shadow">
                    <div className="flex justify-center mb-4">
                      <Code className="w-12 h-12 text-primary" />
                    </div>
                    <p className="text-2xl font-semibold">Coding Questions</p>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        {data?.data?.totalCodingQuestion} coding question{" "}
                        {data?.data?.totalCodingQuestion > 1 ? "s" : ""}
                      </p>
                      <p className="text-sm text-gray-500">
                        Estimated time: {data?.data?.totalCodingQuestion * 30}{" "}
                        minutes
                      </p>
                    </div>
                    {data?.data?.isCodingDone ? (
                      <p className="text-green-600 font-semibold flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        Completed
                      </p>
                    ) : (
                      <Button
                        onClick={() => navigate("coding")}
                        className="w-full"
                      >
                        Start Coding Question
                        {data?.data?.totalCodingQuestion > 1 ? "s" : ""}
                      </Button>
                    )}
                  </div>
                )}
            </div>

            <div className="text-center mt-6 text-gray-500 text-sm flex items-center gap-2">
              <Info className="w-4 h-4" />
              <p>Need help? Contact us at help@interv.cc</p>
            </div>
          </>
        )}
      </MainPanel>
    </div>
  )
}

export default RoomPage
