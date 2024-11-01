import { FaCheckCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface CodingInterviewFinishProps {
  timeTaken: number
  roomId: string
  isRecordingSaved: boolean
}

function CodingInterviewFinish({
  timeTaken,
  roomId,
  isRecordingSaved,
}: CodingInterviewFinishProps) {
  const navigate = useNavigate()

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen w-full mt-24">
      {isRecordingSaved ? (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4">
          <div className="text-center p-8 ">
            <FaCheckCircle className="text-primary w-24 h-24 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Interview Completed!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              🎉 Great job! You've successfully completed your coding interview.
            </p>
            {timeTaken > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <p className="text-lg text-gray-600 mb-2">Total Duration</p>
                <p className="text-3xl font-semibold text-gray-700">
                  {formatTime(timeTaken)}
                </p>
              </div>
            )}
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
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600">
            Processing your interview recording...
          </p>
        </div>
      )}
    </div>
  )
}

export default CodingInterviewFinish
