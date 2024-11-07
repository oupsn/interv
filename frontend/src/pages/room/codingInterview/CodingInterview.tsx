import CodingInterviewInstruction from "./components/CodingInterviewInstruction"
import CodingInterviewPanel from "./components/CodingInterviewPanel"
import { useContext, useEffect, useState, useRef } from "react"
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
import TopBar from "@/components/layout/TopBar"
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
  const [isStart, setIsStart] = useState(false)
  const [timeRemain, setTimeRemain] = useState(3600)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionList, setQuestionList] = useState<Question[]>([])
  const { data: fetchedQuestions, mutate } = useGetCodingInterviewQuestion(
    roomId ?? "",
  )
  const { data: fetchedContext, isLoading: contextLoading } =
    useGetCodingInterviewContext(roomId ?? "")
  const [isFinish, setIsFinish] = useState(false)
  const [isRecordingSaved, setIsRecordingSaved] = useState(false)
  const [questionsLoaded, setQuestionsLoaded] = useState(false)
  const [wasStarted, setWasStarted] = useState(false)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [timeRemainText, setTimeRemainText] = useState("")
  const { selectedCameraId, selectedMicrophoneId, fetchDevice } =
    useContext(DeviceContext)
  const { setLoading, setText, setTransparent } = useContext(LoadingContext)
  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
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
    askPermissionOnMount: fetchedContext?.data?.is_camera_required ?? false,
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
    askPermissionOnMount:
      fetchedContext?.data?.is_screen_share_required ?? false,
    stopStreamsOnStop: true,
  })

  const startRecording = async (camera: boolean, screen: boolean) => {
    if (camera) {
      await startVideoRecording()
    }
    if (screen) {
      await startScreenRecording()
    }
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
    const timeTaken =
      fetchedContext?.data?.coding_time && timeRemain
        ? fetchedContext.data.coding_time - timeRemain
        : 0
    return timeTaken
  }

  const CHUNK_SIZE = 1024 * 1024 * 2
  const MAX_RETRIES = 3

  const handleSubmitVideo = async (
    videoBlobUrl: string,
    screenBlobUrl: string,
  ) => {
    setTransparent(false)
    setLoading(true)

    if (videoBlobUrl === "" && screenBlobUrl === "") {
      setIsRecordingSaved(true)
      setLoading(false)
      setText("")
      return
    }

    const uploadInChunks = async (
      blob: Blob,
      fileType: "video" | "screen",
    ): Promise<boolean> => {
      const totalChunks = Math.ceil(blob.size / CHUNK_SIZE)
      const fileId = `${roomId}-${fileType}-${Date.now()}`

      setText(`Uploading ${fileType} recording: 0%`)

      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE
        const end = Math.min(start + CHUNK_SIZE, blob.size)
        const chunk = blob.slice(start, end)

        const formData = new FormData()
        formData.append("chunk", chunk)
        formData.append("fileId", fileId)
        formData.append("chunkIndex", chunkIndex.toString())
        formData.append("totalChunks", totalChunks.toString())
        formData.append("fileType", fileType)

        let retries = 0
        while (retries < MAX_RETRIES) {
          try {
            await server.codingInterview.uploadVideoChunk(roomId ?? "", {
              chunk: formData.get("chunk") as File,
              chunkIndex: parseInt(formData.get("chunkIndex") as string),
              fileId: formData.get("fileId") as string,
              fileType: formData.get("fileType") as string,
              totalChunks: parseInt(formData.get("totalChunks") as string),
            })

            /*             const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100)
             */ setText(
              `Please wait while we upload your ${fileType} recording`,
            )

            break
          } catch (error) {
            retries++
            if (retries === MAX_RETRIES) {
              console.error(
                `Failed to upload chunk ${chunkIndex} after ${MAX_RETRIES} attempts`,
              )
              throw error
            }
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * Math.pow(2, retries)),
            )
          }
        }
      }
      //Complete upload
      try {
        await server.codingInterview.completeVideoUpload(roomId ?? "", {
          fileId,
          fileType,
        })
        return true
      } catch (error) {
        console.error("Failed to complete upload:", error)
        throw error
      }
    }

    try {
      if (videoBlobUrl) {
        const videoBlob = await fetch(videoBlobUrl).then((r) => r.blob())
        await uploadInChunks(videoBlob, "video")
      }

      if (screenBlobUrl) {
        const screenBlob = await fetch(screenBlobUrl).then((r) => r.blob())
        await uploadInChunks(screenBlob, "screen")
      }

      setIsRecordingSaved(true)
    } catch (error) {
      console.error("Upload failed:", error)
      // Show error to user
    } finally {
      setLoading(false)
      setText("")
      setTransparent(true)
    }
  }

  /*   
  transform question
   */
  useEffect(() => {
    if (fetchedQuestions) {
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
    } else if (videoBlobUrl && !screenBlobUrl) {
      handleSubmitVideo(videoBlobUrl, "")
    } else if (!videoBlobUrl && screenBlobUrl) {
      handleSubmitVideo("", screenBlobUrl)
    } else {
      handleSubmitVideo("", "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoBlobUrl, screenBlobUrl])
  /*   
  start coding interview timer
   */
  const timerRef = useRef<NodeJS.Timeout | null>(null) // Use useRef to persist timer

  useEffect(() => {
    const setTimer = () => {
      clearTimeout(timerRef.current!)
      timerRef.current = setTimeout(() => {
        setTimeRemain((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1
          }
          return 0
        })
      }, 1000)
    }
    if ((isStart || wasStarted) && !isFinish) {
      setTimer()
    }

    return () => {
      clearTimeout(timerRef.current!)
    }
  }, [isStart, wasStarted, isFinish, contextLoading])
  useEffect(() => {
    if (timeRemain <= 0 && fetchedContext?.data?.is_done) {
      setIsStart(true)
      setIsRecordingSaved(true)
      setIsFinish(true)
    } else if (timeRemain <= 0 && !fetchedContext?.data?.is_done) {
      setIsTimeUp(true)
    }
  }, [fetchedContext?.data?.is_done, timeRemain])
  useEffect(() => {
    if (fetchedContext?.data) {
      if (fetchedContext.data.is_done) {
        setIsStart(true)
        setIsFinish(true)
        setWasStarted(true)
        return
      }
      const createdAt = new Date(fetchedContext.data.created_at ?? "")
      const currentTime = new Date()

      if (fetchedContext.data.updated_at === fetchedContext.data.created_at) {
        setTimeRemain(fetchedContext.data?.coding_time ?? 0)
      } else if (
        currentTime > createdAt &&
        fetchedContext.data.updated_at !== fetchedContext.data.created_at
      ) {
        setWasStarted(true)
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
    <div className="flex flex-col w-dvw h-dvh">
      <TopBar
        timeRemain={
          isStart && !isFinish
            ? timeRemainText === ""
              ? formatTime(timeRemain)
              : timeRemainText
            : ""
        }
      ></TopBar>
      <div className={"w-dvw h-dvh flex max-h-sr z-0 overflow-y-hidden"}>
        {contextLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-xl font-semibold">Loading...</p>
          </div>
        ) : isStart ? (
          isFinish ? (
            <CodingInterviewFinish
              isRecordingSaved={isRecordingSaved}
              timeTaken={calculateTimeTaken()}
              roomId={roomId ?? ""}
            />
          ) : questionsLoaded && questionList.length > 0 && !isFinish ? (
            <CodingInterviewPanel
              isTimeUp={isTimeUp}
              timeTaken={calculateTimeTaken()}
              roomId={roomId ?? ""}
              timeRemain={timeRemain}
              setTimeRemainText={setTimeRemainText}
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
            wasStarted={wasStarted}
            isTimeUp={isTimeUp}
            isCameraRequired={fetchedContext?.data?.is_camera_required ?? false}
            isScreenShareRequired={
              fetchedContext?.data?.is_screen_share_required ?? false
            }
            timeRemain={timeRemain}
            questionLength={questionList.length}
            clickStart={() => {
              startRecording(
                fetchedContext?.data?.is_camera_required ?? false,
                fetchedContext?.data?.is_screen_share_required ?? false,
              )
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
    </div>
  )
}

export default CodingInterviewPage
