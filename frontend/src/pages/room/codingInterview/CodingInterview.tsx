import CodingInterviewInstruction from "./components/CodingInterviewInstruction"
import CodingInterviewPanel from "./components/CodingInterviewPanel"
import { useContext, useEffect, useState } from "react"
import { useGetCodingInterviewQuestion } from "@/hooks/UseGetCodingInterviewQuestion"
import {
  DomainsCodingQuestionResponse,
  DomainsCodingQuestionTestCase,
  DomainsCompilationResultResponse,
} from "@/api/server"
import { useParams } from "react-router-dom"
import CodingInterviewFinish from "./components/CodingInterviewFinish"
import { useReactMediaRecorder } from "react-media-recorder-2"
import { DeviceContext } from "@/contexts/device"
import { server } from "@/contexts/swr"
import { LoadingContext } from "@/contexts/loading"
import { useGetCodingInterviewContext } from "@/hooks/useGetCodginInterviewContext"
interface Question {
  index: number
  id: number
  title: string
  description: string
  inputDescription: string
  outputDescription: string
  testcaseList: DomainsCodingQuestionTestCase[]
  testcaseCompileResult: DomainsCompilationResultResponse[]
}
const CodingInterviewPage = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const [isStart, setIsStart] = useState(mockData.isStart)
  const [timeRemain, setTimeRemain] = useState(mockData.timeRemain)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionList, setQuestionList] = useState<Question[]>([])
  const { data: fetchedQuestions, mutate } = useGetCodingInterviewQuestion(
    roomId ?? "",
  )
  const { data: fetchedContext } = useGetCodingInterviewContext(roomId ?? "")
  const [isFinish, setIsFinish] = useState(false)
  const [isRecordingSaved, setIsRecordingSaved] = useState(false)
  const [questionsLoaded, setQuestionsLoaded] = useState(false)

  const { selectedCameraId, selectedMicrophoneId, fetchDevice } =
    useContext(DeviceContext)
  const { setLoading, setText } = useContext(LoadingContext)
  const {
    mediaBlobUrl: videoBlobUrl,
    startRecording: startVideoRecording,
    stopRecording: stopVideoRecording,
    previewStream: previewVideoStream,
    status: videoStatus,
    error: videoError,
  } = useReactMediaRecorder({
    video: {
      deviceId: selectedCameraId,
    },
    audio: {
      deviceId: selectedMicrophoneId,
    },
    screen: false,
    onStart() {
      console.log("video recording started")
    },
    askPermissionOnMount: true,
    stopStreamsOnStop: true,
  })
  const {
    mediaBlobUrl: screenBlobUrl,
    startRecording: startScreenRecording,
    stopRecording: stopScreenRecording,
    previewStream: previewScreenStream,
    status: screenStatus,
    error: screenError,
  } = useReactMediaRecorder({
    screen: true,
    onStart() {
      console.log("screen recording started")
    },
    askPermissionOnMount: true,
    stopStreamsOnStop: true,
  })

  const startRecording = async () => {
    await startVideoRecording()
    await startScreenRecording()
  }
  const stopRecording = async () => {
    await stopVideoRecording()
    await stopScreenRecording()
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateTimeTaken = () => {
    const timeTaken = mockData.timeRemain - timeRemain
    return timeTaken
  }
  const handleSubmitVideo = async (
    videoBlobUrl: string,
    screenBlobUrl: string,
  ) => {
    setLoading(true)
    setText("Submitting video and screen record...")
    const videoBlob = await fetch(videoBlobUrl).then((response) =>
      response.blob(),
    )
    const screenBlob = await fetch(screenBlobUrl).then((response) =>
      response.blob(),
    )

    const videoFile = new File([videoBlob], "video.mp4", {
      type: "video/mp4",
      lastModified: Date.now(),
    })
    const screenFile = new File([screenBlob], "screen.mp4", {
      type: "video/mp4",
      lastModified: Date.now(),
    })

    server.codingInterview
      .uploadVideo({
        videoFile: videoFile,
        screenFile: screenFile,
        roomID: roomId ?? "",
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsRecordingSaved(true)
        setLoading(false)
        setText("")
      })
  }

  /*   
  transform question
   */
  useEffect(() => {
    if (fetchedQuestions) {
      console.log(fetchedQuestions)
      const newQuestions: Question[] =
        fetchedQuestions?.data?.map(
          (question: DomainsCodingQuestionResponse, index: number) => ({
            index: index,
            id: question.id ?? 0,
            title: question.title ?? "",
            description: question.description ?? "",
            inputDescription: question.input_description ?? "",
            outputDescription: question.output_description ?? "",
            testcaseList: question.test_case ?? [],
            testcaseCompileResult: [] as DomainsCompilationResultResponse[],
          }),
        ) ?? []
      setQuestionList(newQuestions)
      setQuestionsLoaded(true)
    }
  }, [fetchedQuestions])

  useEffect(() => {
    fetchDevice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isFinish) {
      stopRecording()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinish])
  useEffect(() => {
    if (videoBlobUrl && screenBlobUrl) {
      handleSubmitVideo(videoBlobUrl, screenBlobUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoBlobUrl, screenBlobUrl])
  /*   
  start coding interview timer
   */
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    if (isStart && !isFinish) {
      timer = setInterval(() => {
        setTimeRemain((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1
          }
          clearInterval(timer)
          return 0
        })
      }, 1000)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [isStart, isFinish])

  useEffect(() => {
    if (fetchedContext?.data) {
      const createdAt = new Date(fetchedContext.data.created_at ?? "")
      const currentTime = new Date()

      if (fetchedContext.data.updated_at === fetchedContext.data.created_at) {
        setTimeRemain(fetchedContext.data?.coding_time ?? 0)
      } else if (
        currentTime > createdAt &&
        fetchedContext.data.updated_at !== fetchedContext.data.created_at
      ) {
        const timeDifferenceInSeconds = Math.floor(
          (currentTime.getTime() - createdAt.getTime()) / 1000,
        )
        const remainingTime = Math.max(
          (fetchedContext.data?.coding_time ?? 0) - timeDifferenceInSeconds,
          0,
        )
        setTimeRemain(remainingTime)
      }
    }
  }, [fetchedContext])
  return (
    <>
      <div className={"w-dvw h-dvh flex max-h-sr z-0"}>
        {isStart ? (
          isFinish ? (
            <CodingInterviewFinish
              isRecordingSaved={isRecordingSaved}
              timeTaken={calculateTimeTaken()}
              roomId={roomId ?? ""}
            />
          ) : questionsLoaded && questionList.length > 0 && !isFinish ? (
            <CodingInterviewPanel
              timeTaken={calculateTimeTaken()}
              roomId={roomId ?? ""}
              timeRemain={timeRemain}
              questions={questionList}
              currentQuestion={questionList[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              onNextQuestion={handleNextQuestion}
              onPreviousQuestion={handlePreviousQuestion}
              isFirstQuestion={currentQuestionIndex === 0}
              isLastQuestion={currentQuestionIndex === questionList.length - 1}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              setIsFinish={setIsFinish}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-xl font-semibold">No questions available.</p>
            </div>
          )
        ) : (
          <CodingInterviewInstruction
            title={mockData.title}
            description={mockData.instuction}
            timeRemain={timeRemain}
            questionLength={questionList.length}
            clickStart={() => {
              startRecording()
              setIsStart(true)
              mutate()
            }}
            previewVideoStream={previewVideoStream}
            previewScreenStream={previewScreenStream}
            videoStatus={videoStatus}
            screenStatus={screenStatus}
            videoError={videoError}
            screenError={screenError}
          />
        )}
      </div>
    </>
  )
}

//FIXME: replace this with actual data naja
const mockData = {
  isStart: false,
  timeRemain: 3600,
  title: "This is a coding interview instruction",
  instuction: "You have 30 minutes to solve the question",
}
export default CodingInterviewPage
