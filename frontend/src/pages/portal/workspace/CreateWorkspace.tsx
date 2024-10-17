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
import { useEffect, useState } from "react"
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
      .min(isCoding ? 1 : 0, isCoding ? { message: "Required" } : {}),
    videoTime: z.number().min(0, isVideo ? { message: "Required" } : {}),
    reqScreen: z.boolean().default(false),
    reqMicrophone: z.boolean().default(false),
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
      reqMicrophone: false,
      reqCamera: false,
    },
  })
  const { setValue, watch } = form
  setValue("isVideo", isVideo)
  setValue("isCoding", isCoding)
  const startDate = watch("date.startDate")
  const endDate = watch("date.endDate")

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const eD = new Date(endDate)
    const sD = new Date(startDate)
    const ListCodeQuestion = codeCurrentQuestion
      ? codeCurrentQuestion.map((question) => question.id ?? 0)
      : []
    const ListVideoQuestion = videoCurrentQuestion
      ? videoCurrentQuestion.map((question) => question.id ?? 0)
      : []
    isCoding ? setValue("codingTime", 0) : {},
      toast.promise(
        server.workspace.createWorkspace({
          ...values,
          reqScreen: isCoding ? values.reqScreen : false,
          reqMicrophone: isCoding ? values.reqScreen : false,
          reqCamera: isCoding ? values.reqCamera : false,
          codingTime: isCoding ? values.codingTime : 0,
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
    navigate("/portal/workspace")
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
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 px-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Workspace Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
                  <FormLabel className="text-lg">Date</FormLabel>
                  <FormControl>
                    <DatePicker date={dateRange} setDate={handleDateChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-5">
              <FormField
                control={form.control}
                name="isCoding"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel className="text-lg">
                      Setup Coding Question
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
                  <FormItem className="w-full">
                    <FormLabel className="text-lg">
                      Setup Video Question
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
            <div className="flex w-full gap-5">
              <FormField
                control={form.control}
                name="codingTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-lg">
                      Coding Time {"(Minutes)"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="codingTime"
                        type="number"
                        {...field}
                        value={
                          isCoding ? (field.value > 0 ? field.value : 0) : 0
                        } // Ensure the field value doesn't start as undefined
                        onChange={(e) => field.onChange(Number(e.target.value))} // Convert string to number
                        disabled={!isCoding}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-lg">
                      Maximum Video Time {"(Seconds)"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="codingTime"
                        type="number"
                        {...field}
                        value={isVideo ? vidTime : 0} // Ensure the field value doesn't start as undefined
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reqScreen"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={isCoding ? field.value : false} // Set checked to the boolean value
                        onCheckedChange={field.onChange} // Update the form state when checkbox changes
                        onBlur={field.onBlur} // Handle onBlur event
                        name={field.name} // Set the name for the field
                        ref={field.ref} // Forward the ref to the input
                        disabled={!isCoding}
                        className="size-5 mt-2"
                      />
                    </FormControl>
                    <FormLabel className="text-lg">
                      Require screen record
                    </FormLabel>
                  </FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reqMicrophone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={isCoding ? field.value : false} // Set checked to the boolean value
                      onCheckedChange={field.onChange} // Update the form state when checkbox changes
                      onBlur={field.onBlur} // Handle onBlur event
                      name={field.name} // Set the name for the field
                      ref={field.ref} // Forward the ref to the input
                      disabled={!isCoding}
                      className="size-5 mt-2"
                    />
                  </FormControl>
                  <FormLabel className="text-lg">
                    Require microphone record
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reqCamera"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={isCoding ? field.value : false} // Set checked to the boolean value
                      onCheckedChange={field.onChange} // Update the form state when checkbox changes
                      onBlur={field.onBlur} // Handle onBlur event
                      name={field.name} // Set the name for the field
                      ref={field.ref} // Forward the ref to the input
                      disabled={!isCoding}
                      className="size-5 mt-2"
                    />
                  </FormControl>
                  <FormLabel className="text-lg">
                    Require camera record
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className={"w-full"}>Submit</Button>
          </form>
        </Form>
      </ContentPanel>
    </ContentLayout>
  )
}

export default CreateWorkspace
