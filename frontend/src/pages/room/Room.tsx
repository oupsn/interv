import { Button } from "@/components/ui/button.tsx"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import MainPanel from "@/components/layout/MainPanel.tsx"
import { useGetRoomContext } from "@/hooks/useGetRoomContext.ts"
import dayjs from "dayjs"
import { Spinner } from "@/components/ui/spinner.tsx"
import { useEffect, useState } from "react"
import TermsModal from "@/components/ui/term-modal"
import TopBar from "@/components/layout/TopBar"
import TopBarItem from "@/components/layout/TopBarItem"

const RoomPage = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { data, error, isLoading } = useGetRoomContext(roomId!)

  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    const hasAcceptedTerms = localStorage.getItem("termsAccepted")
    if (!hasAcceptedTerms) {
      setTermsAccepted(false)
    } else {
      setTermsAccepted(true)
    }
  }, [])

  const handleAcceptTerms = () => {
    localStorage.setItem("termsAccepted", "true")
    setTermsAccepted(true)
  }

  const handleDeclineTerms = () => {
    window.location.reload()
  }

  return (
    <div className="flex flex-col w-dvw h-dvh">
      <TopBar>
        <TopBarItem
          title={`Home`}
          onClick={() => navigate(location.pathname)}
        />
        <TopBarItem
          title={`Tutorial`}
          onClick={() => navigate(location.pathname + "/tutorial")}
        />
      </TopBar>
      <MainPanel className={"flex flex-col justify-center items-center gap-8"}>
        {isLoading ? (
          <Spinner size="lg" />
        ) : error ? (
          <div className={"p-4 space-y-4 text-center"}>
            <p>
              Please contact the interview owner if you believe something seems
              wrong.
            </p>
            <p>Need more info? Email: help@interv.cc</p>
          </div>
        ) : data?.data?.isOverdue ? (
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
              Please contact the interview owner if you believe something seems
              wrong.
            </p>
            <p>Need more info? Email: help@interv.cc</p>
          </div>
        ) : (
          <>
            <div className={"p-4 space-y-4 text-center"}>
              <p className={"text-2xl font-semibold mb-4"}>
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

      {!error && !termsAccepted && (
        <TermsModal
          onAccept={handleAcceptTerms}
          onDecline={handleDeclineTerms}
        />
      )}
    </div>
  )
}

export default RoomPage
