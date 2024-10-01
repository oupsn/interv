import { Button } from "@/components/ui/button.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { server } from "@/contexts/swr.tsx"

export const VideoInterviewFinish = () => {
  const navigate = useNavigate()
  const { lobbyId } = useParams()
  useEffect(() => {
    server.lobby
      .updateLobbyContext({
        lobbyId: Number(lobbyId),
        isVideoDone: true,
      })
      .finally(() => {
        // add loading wrapper here
      })
  }, [lobbyId])
  return (
    <>
      All done!
      <Button
        onClick={() => {
          navigate("/lobby/" + lobbyId)
        }}
      >
        Back to lobby
      </Button>
    </>
  )
}
