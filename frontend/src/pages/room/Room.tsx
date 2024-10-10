import { Button } from "@/components/ui/button.tsx"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import SideBarItem from "@/components/layout/SideBarItem.tsx"
import SideBar from "@/components/layout/SideBar.tsx"
import MainPanel from "@/components/layout/MainPanel.tsx"
import { useGetRoomContext } from "@/hooks/useGetRoomContext.ts"
import dayjs from "dayjs"
import { Spinner } from "@/components/ui/spinner.tsx"

const RoomPage = () => {
  const { roomId } = useParams()
  const [URLSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetRoomContext(
    roomId!,
    URLSearchParams.get("rt")!,
  )
  return (
    <>
      <SideBar>
        <SideBarItem title={"Welcome"} isActive={true} />
      </SideBar>
      <MainPanel className={"flex flex-col justify-center items-center gap-8"}>
        {isLoading ? (
          <Spinner size="lg" />
        ) : error ? (
          <div>Room not found</div>
        ) : data?.data?.isOverdue ? (
          <>
            <div className={"p-4 space-y-4 text-center"}>
              <p className={"text-2xl font-semibold"}>
                Hi {data?.data?.candidateName}
              </p>
              <p>
                This interview was overdue on{" "}
                <span className={"font-semibold"}>
                  {dayjs(data?.data?.dueDate).format(
                    "ddd, DD MMM YYYY HH:mm:ss Z",
                  )}
                </span>
              </p>

              <p>
                Please contact the interview owner if you believe something
                seems wrong.
              </p>
              <p>Need more info? Email: help@interv.cc</p>
            </div>
          </>
        ) : (
          <>
            <div className={"p-4 space-y-4 text-center"}>
              <p className={"text-2xl font-semibold"}>
                Hi {data?.data?.candidateName}
              </p>
              <span>Please complete all the tasks before </span>
              <span className={"font-semibold"}>
                {dayjs(data?.data?.dueDate).format(
                  "ddd, DD MMM YYYY HH:mm:ss Z",
                )}
              </span>
            </div>
            <div className={"flex gap-12"}>
              <div
                className={
                  "shadow-xl text-center rounded-xl p-8 space-y-4 w-[340px]"
                }
              >
                <p className={"text-2xl font-semibold"}>Video interview</p>
                <p>{data?.data?.totalVideoQuestion} questions</p>
                {data?.data?.isVideoDone ? (
                  <p className={"text-iGreen font-semibold"}>Done</p>
                ) : (
                  <Button onClick={() => navigate("video")}>Start</Button>
                )}
              </div>
              <div
                className={
                  "shadow-xl text-center rounded-xl p-8 space-y-4 w-[340px]"
                }
              >
                <p className={"text-2xl font-semibold"}>Coding interview</p>
                <p>{data?.data?.totalCodingQuestion} questions</p>
                {data?.data?.isCodingDone ? (
                  <p className={"text-iGreen font-semibold"}>Done</p>
                ) : (
                  <Button onClick={() => navigate("coding")}>Start</Button>
                )}
              </div>
            </div>
          </>
        )}
      </MainPanel>
    </>
  )
}

export default RoomPage
