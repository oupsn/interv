import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { Button } from "@/components/ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import DatePicker from "./components/DatePicker"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useContext, useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import { server } from "@/contexts/swr"
import { toast } from "sonner"
import useCurrentUser from "@/hooks/UseCurrentUser"
import { useGetCodingInterviewQuestionByPortalId } from "@/hooks/useGetCodingInterviewQuestionByPortalId"
import {
  DomainsCodingQuestion,
  GetVideoQuestionByPortalIdResponse,
} from "@/api/server"
import { useGetVideoInterviewQuestionByPortalId } from "@/hooks/useGetVideoInterviewQuestionByPortalId"
import { Checkbox } from "@/components/ui/checkbox"
import { Link, useNavigate } from "react-router-dom"
import QuestionPicker from "./components/QuestionPicker"
import { Spinner } from "@/components/ui/spinner"
import { LoadingContext } from "@/contexts/loading"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { CalendarIcon, VideoIcon, CodeIcon } from "lucide-react"

// Zod schema for form validation

const CreateWorkspace = () => {
  const navigate = useNavigate()
  const disablePage = false

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  })
  const { currentUser } = useCurrentUser()
  const [firstTime, setFirstTime] = useState<boolean>(true)

  const { data: codeQuestion, isLoading: isCodeQuestionLoading } =
    useGetCodingInterviewQuestionByPortalId(currentUser.portalId)
  const { data: videoQuestion, isLoading: isVideoQuestionLoading } =
    useGetVideoInterviewQuestionByPortalId(currentUser.portalId)

  const [codeStockQuestion, setCodeStockQuestion] = useState<
    DomainsCodingQuestion[] | undefined
  >(codeQuestion?.data)
  const [codeCurrentQuestion, setCodeCurrentQuestion] = useState<
    DomainsCodingQuestion[] | undefined
  >([])

  const [videoStockQuestion, setVideoStockQuestion] = useState<
    GetVideoQuestionByPortalIdResponse[] | undefined
  >(videoQuestion?.data)
  const [videoCurrentQuestion, setVideoCurrentQuestion] = useState<
    GetVideoQuestionByPortalIdResponse[] | undefined
  >([])

  const [vidTime, setVidTime] = useState<number>(0)

  const isVideo =
    videoCurrentQuestion === undefined ? false : videoCurrentQuestion.length > 0
  const isCoding =
    codeCurrentQuestion === undefined ? false : codeCurrentQuestion.length > 0

  const formSchema = z.object({
    title: z.string().min(1, { message: "Required" }),
    date: z.object({
      startDate: z.string().min(1, { message: "Start date is required" }),
      endDate: z.string().min(1, { message: "End date is required" }),
    }),
    isVideo: z.boolean().default(false),
    isCoding: z.boolean().default(false),
    codingTime: z
      .number()
      .min(isCoding ? 1 : 0, isCoding ? { message: "Required" } : {})
      .max(180),
    videoTime: z.number().min(0, isVideo ? { message: "Required" } : {}),
    reqScreen: z.boolean().default(false),
    reqCamera: z.boolean().default(false),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: { startDate: "", endDate: "" },
      isVideo: false,
      isCoding: false,
      videoTime: Number(0),
      codingTime: Number(0),
      reqScreen: false,
      reqCamera: false,
    },
  })
  const { setValue, watch } = form
  setValue("isVideo", isVideo)
  setValue("isCoding", isCoding)
  const startDate = watch("date.startDate")
  const endDate = watch("date.endDate")
  const { setLoading } = useContext(LoadingContext)

  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(
    null,
  )

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range)
    setValue(
      "date.startDate",
      range?.from ? addDays(range?.from, 0).toISOString().split("T")[0] : "",
      { shouldValidate: true },
    )
    setValue(
      "date.endDate",
      range?.to ? addDays(range?.to, 1).toISOString().split("T")[0] : "",
      { shouldValidate: true },
    )
  }

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setFormData(values)
    setShowPreview(true)
  }

  const handleConfirm = async () => {
    if (!formData) return
    setShowPreview(false)
    await onSubmit(formData)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const eD = new Date(endDate)
    const sD = new Date(startDate)
    const ListCodeQuestion = codeCurrentQuestion
      ? codeCurrentQuestion.map((question) => question.id ?? 0)
      : []
    const ListVideoQuestion = videoCurrentQuestion
      ? videoCurrentQuestion.map((question) => question.id ?? 0)
      : []
    isCoding ? setValue("codingTime", 0) : {}, setLoading(true)
    try {
      const response = await toast.promise(
        server.workspace.createWorkspace({
          ...values,
          reqScreen: isCoding ? values.reqScreen : false,
          reqMicrophone: isCoding ? values.reqCamera : false,
          reqCamera: isCoding ? values.reqCamera : false,
          codingTime: isCoding ? values.codingTime * 60 : 0,
          videoTime: vidTime,
          endDate: eD.toISOString(),
          startDate: sD.toISOString(),
          portalId: currentUser.portalId,
          codeQuestion: ListCodeQuestion,
          videoQuestion: ListVideoQuestion,
        }),
        {
          loading: "Creating workspace...",
          success: "Workspace created successfully",
          error: (err) => {
            return err.response.data.message
          },
        },
      )
      console.log(response)
    } catch (error) {
      console.error("Error creating workspace:", error)
    } finally {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate("/portal/workspace/")
      }, 1000)
    }
  }

  useEffect(() => {
    if (firstTime) {
      setCodeStockQuestion(codeQuestion?.data)
      setVideoStockQuestion(videoQuestion?.data)
      setFirstTime(false)
    }
    setVidTime(
      videoCurrentQuestion
        ?.map((question) => {
          return question
            ? question.timeToAnswer
              ? question.timeToPrepare
                ? question.totalAttempt
                  ? (question.timeToAnswer + question.timeToPrepare) *
                    question.totalAttempt
                  : question.timeToAnswer + question.timeToPrepare
                : question.timeToAnswer
              : 0
            : 0
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) ??
        0,
    )
  }, [codeQuestion, videoQuestion, videoCurrentQuestion, firstTime])

  if (isCodeQuestionLoading || isVideoQuestionLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    )
  }
  return (
    <>
      <ContentLayout
        title={"Create workspace"}
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/portal/workspace">Workspaces</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Workspace</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <ContentPanel>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 px-6 py-4"
            >
              <div className="space-y-4">
                <div className="flex flex-col items-start  gap-2">
                  <h2 className="text-xl font-semibold">
                    Workspace Information
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Enter the basic details for your workspace
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Workspace Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter workspace title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          Date Range
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            date={dateRange}
                            setDate={handleDateChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col items-start  gap-2">
                  <h2 className="text-xl font-semibold">
                    Interview Questions Setup
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Select interview questions for your workspace
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="isCoding"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex flex-row items-center gap-2 bg-white w-full px-2 py-1 rounded-md text-gray-500 border border-gray-200 text-md justify-center ">
                          <CodeIcon className="h-4 w-4" />
                          Coding Questions
                        </FormLabel>
                        <FormControl>
                          <QuestionPicker
                            currentQuestion={codeCurrentQuestion}
                            setCurrentQuestion={setCodeCurrentQuestion}
                            stockQuestion={codeStockQuestion}
                            setStockQuestion={setCodeStockQuestion}
                            disable={disablePage}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isVideo"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex flex-row items-center gap-2 bg-white w-full px-2 py-1 rounded-md text-gray-500 border border-gray-200 text-md justify-center ">
                          <VideoIcon className="h-4 w-4" />
                          Video Questions
                        </FormLabel>
                        <FormControl>
                          <QuestionPicker
                            currentQuestion={videoCurrentQuestion}
                            setCurrentQuestion={setVideoCurrentQuestion}
                            stockQuestion={videoStockQuestion}
                            setStockQuestion={setVideoStockQuestion}
                            disable={disablePage}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xs font-semibold flex flex-row gap-2 items-center  mb-2 text-muted-foreground">
                      <CodeIcon className="h-4 w-4 text-muted-foreground" />
                      Coding Interview Settings
                    </h2>
                    <FormField
                      control={form.control}
                      name="codingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Coding Time (Minutes)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={
                                isCoding ? "Enter time in minutes" : "Disabled"
                              }
                              {...field}
                              value={
                                isCoding
                                  ? field.value > 0
                                    ? field.value
                                    : ""
                                  : ""
                              }
                              onChange={(e) => {
                                const value = e.target.value
                                if (
                                  value === "" ||
                                  (value !== "0" && !value.startsWith("0"))
                                ) {
                                  field.onChange(Number(value))
                                }
                              }}
                              disabled={!isCoding}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col items-start gap-2">
                      <FormLabel className="flex items-center gap-2">
                        Recording Settings
                      </FormLabel>
                      <div className="flex gap-6">
                        <FormField
                          control={form.control}
                          name="reqScreen"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <Checkbox
                                  checked={isCoding ? field.value : false}
                                  onCheckedChange={field.onChange}
                                  disabled={!isCoding}
                                  className="size-5"
                                />
                              </FormControl>
                              <FormLabel className="m-0">
                                Screen Recording
                              </FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="reqCamera"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <Checkbox
                                  checked={isCoding ? field.value : false}
                                  onCheckedChange={field.onChange}
                                  disabled={!isCoding}
                                  className="size-5"
                                />
                              </FormControl>
                              <FormLabel className="m-0">
                                Camera Recording
                              </FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xs font-semibold flex flex-row gap-2 items-center  mb-2 text-muted-foreground">
                      <VideoIcon className="h-4 w-4 text-muted-foreground" />
                      Video Interview Settings
                    </h2>
                    <FormField
                      control={form.control}
                      name="videoTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Maximum Video Time (Seconds)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={isVideo ? vidTime : 0}
                              disabled={true}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6">Create Workspace</Button>
            </form>
          </Form>
        </ContentPanel>
      </ContentLayout>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Workspace Preview
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">Workspace Title</h3>
                <p className="text-sm text-muted-foreground">
                  {formData?.title}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Date Range</h3>
                <p className="text-sm text-muted-foreground">
                  {formData?.date.startDate} to {formData?.date.endDate}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Selected Questions</h3>
              <div className="grid grid-cols-2 gap-4">
                {isCoding && (
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 border-b border-gray-200 pb-2">
                      <CodeIcon className="h-4 w-4" />
                      Coding Questions ({codeCurrentQuestion?.length || 0})
                    </h4>
                    <div className="flex flex-col max-h-[150px] overflow-y-auto hover:cursor-pointer">
                      {codeCurrentQuestion?.map((question, index) => (
                        <div
                          key={question.id}
                          className="p-2 rounded-md bg-gray-50 hover:bg-gray-100"
                        >
                          {index + 1}. {question.title}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Time Limit: {formData?.codingTime} minutes
                    </p>
                  </div>
                )}
                {isVideo && (
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 border-b border-gray-200 pb-2">
                      <VideoIcon className="h-4 w-4" />
                      Video Questions ({videoCurrentQuestion?.length || 0})
                    </h4>
                    <div className="flex flex-col max-h-[150px] overflow-y-auto hover:cursor-pointer">
                      {videoCurrentQuestion?.map((question, index) => (
                        <div
                          key={question.id}
                          className="p-2 rounded-md bg-gray-50 hover:bg-gray-100"
                        >
                          {index + 1}. {question.title}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Total Time: {vidTime} seconds
                    </p>
                  </div>
                )}
              </div>
            </div>

            {isCoding && (
              <div>
                <h3 className="font-semibold mb-2">
                  Coding Recording Settings
                </h3>
                <div className="flex gap-4">
                  <p className="text-sm text-muted-foreground">
                    Screen Recording: {formData?.reqScreen ? "Yes" : "No"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Camera Recording: {formData?.reqCamera ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Edit
            </Button>
            <Button onClick={handleConfirm}>Create Workspace</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateWorkspace
