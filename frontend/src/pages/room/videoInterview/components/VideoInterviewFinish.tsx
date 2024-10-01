import { Button } from "@/components/ui/button.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { server } from "@/contexts/swr.tsx"

export const VideoInterviewFinish = () => {
  const navigate = useNavigate()
  const { roomId } = useParams()
  useEffect(() => {
    server.room
      .updateRoomContext({
        roomId: Number(roomId),
        isVideoDone: true,
      })
      .finally(() => {
        // add loading wrapper here
      })
  }, [roomId])
  return (
    <>
      All done!
      <Button
        onClick={() => {
          navigate("/room/" + roomId)
        }}
      >
        Back to interview room
      </Button>
    </>
  )
}
