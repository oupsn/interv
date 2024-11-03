import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { server } from "@/contexts/swr.tsx"
import { FaCheckCircle } from "react-icons/fa"

export const VideoInterviewFinish = () => {
  const navigate = useNavigate()
  const { roomId } = useParams()
  useEffect(() => {
    server.room
      .updateRoomContext({
        roomId: roomId!,
        isVideoDone: true,
      })
      .finally(() => {
        // add loading wrapper here
      })
  }, [roomId])
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Congratulations!
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          You've completed the video interview.
        </p>

        <button
          onClick={() => navigate(`/room/${roomId}`)}
          className="bg-primary text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Return to interview room
        </button>
      </div>
    </>
  )
}
