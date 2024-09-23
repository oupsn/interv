import { Button } from "@/components/ui/button.tsx"
import { useNavigate, useParams } from "react-router-dom"

export const VideoInterviewFinish = () => {
  const navigate = useNavigate()
  const { lobbyId } = useParams()
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
