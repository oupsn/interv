import { FaCheckCircle } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { server } from "@/contexts/swr.tsx"

export const VideoInterviewFinish = () => {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [isUpdating, setIsUpdating] = useState(true)

  useEffect(() => {
    setIsUpdating(true)
    server.room
      .updateRoomContext({
        roomId: roomId!,
        isVideoDone: true,
      })
      .finally(() => {
        setIsUpdating(false)
      })
  }, [roomId])

  return (
    <div className="min-h-screen w-full mt-24">
      {isUpdating ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600">Saving your progress...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4">
          <div className="text-center p-8">
            <FaCheckCircle className="text-primary w-24 h-24 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Interview Recording Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              🎉 Thank you for completing your video interview. Your responses
              have been successfully recorded.
            </p>
            <p className="text-gray-600 mb-6">
              You can now return to the interview room
            </p>

            <button
              onClick={() => navigate(`/room/${roomId}`)}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-sm"
            >
              Back to Interview Room
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
