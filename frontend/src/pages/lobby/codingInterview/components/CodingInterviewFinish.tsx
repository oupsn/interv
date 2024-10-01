import { FaCheckCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface CodingInterviewFinishProps {
  timeTaken: number
  lobbyId: string
}

function CodingInterviewFinish({
  timeTaken,
  lobbyId,
}: CodingInterviewFinishProps) {
  const navigate = useNavigate()

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  w-full">
      <FaCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Congratulations!
      </h1>
      <p className="text-xl text-gray-600 mb-6">
        You've completed the coding interview.
      </p>
      <p className="text-2xl font-semibold text-gray-700 mb-8">
        Time taken: {formatTime(timeTaken)}
      </p>
      <button
        onClick={() => navigate(`/lobby/${lobbyId}`)}
        className="bg-primary text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Return to Lobby
      </button>
    </div>
  )
}

export default CodingInterviewFinish
