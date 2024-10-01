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
import AssessmentPicker from "./components/AssessmentPicker"
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
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import { server } from "@/contexts/swr"
import { toast } from "sonner"
import useCurrentUser from "@/hooks/UseCurrentUser"
import { useGetCodingInterviewQuestionByPortalId } from "@/hooks/useGetCodingInterviewQuestionByPortalId"
import { DomainsCodingQuestion } from "@/api/server"
import { Link } from "react-router-dom"

// Zod schema for form validation
const formSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  date: z.object({
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().min(1, { message: "End date is required" }),
  }),
  isVideo: z.boolean().default(false),
  isCoding: z.boolean().default(false),
  codingTime: z.number().min(1, { message: "Required" }),
  reqScreen: z.boolean().default(false),
  reqMicrophone: z.boolean().default(false),
  reqCamera: z.boolean().default(false),
})

const CreateWorkspace = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: { startDate: "", endDate: "" },
      isVideo: false,
      isCoding: false,
      codingTime: 0,
      reqScreen: false,
      reqMicrophone: false,
      reqCamera: false,
    },
  })

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  })
  const { setValue, watch } = form
  const { currentUser } = useCurrentUser()
  const { data } = useGetCodingInterviewQuestionByPortalId(currentUser.portalId)
  const startDate = watch("date.startDate")
  const endDate = watch("date.endDate")

  const [codeStockAssessment, setCodeStockAssessment] = useState<
    DomainsCodingQuestion[] | undefined
  >(data?.data)
  const [codeCurrentAssessment, setCodeCurrentAssessment] = useState<
    DomainsCodingQuestion[] | undefined
  >([])
  // const [, setVideoStockAssessment] = useState<string[]>([])
  // const [videoCurrentAssessment, setVideoCurrentAssessment] = useState<
  //   string[]
  // >([])
  // const isVideo = videoCurrentAssessment.length > 0
  const isCoding =
    codeCurrentAssessment === undefined
      ? false
      : codeCurrentAssessment.length > 0
  setValue("isVideo", false)
  setValue("isCoding", isCoding)

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range)
    setValue(
      "date.startDate",
      range?.from ? addDays(range?.from, 1).toISOString().split("T")[0] : "",
      { shouldValidate: true },
    )
    setValue(
      "date.endDate",
      range?.to ? addDays(range?.to, 1).toISOString().split("T")[0] : "",
      { shouldValidate: true },
    )
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const eD = new Date(endDate)
    const sD = new Date(startDate)
    toast.promise(
      server.workspace.createWorkspace({
        ...values,
        endDate: eD.toISOString(),
        startDate: sD.toISOString(),
        portalId: currentUser.portalId,
      }),
      {
        loading: "Creating question...",
        success: () => {
          return "Created successfully"
        },
        error: (err) => {
          return err.response.data.message
        },
      },
    )
  }

  const test = () => {
    console.log(data)
    server.codingInterview.addQuestion
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
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Title</FormLabel>
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
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker date={dateRange} setDate={handleDateChange} />
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
                  <FormLabel>Video Assessment</FormLabel>
                  <FormControl>
                    {/* <AssessmentPicker
                      currentAssessment={videoCurrentAssessment}
                      setCurrentAssessment={setVideoCurrentAssessment}
                      stockAssessment={videoStockAssessment}
                      setStockAssessment={setVideoStockAssessment}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isCoding"
              render={() => (
                <FormItem>
                  <FormLabel>Coding Assessment</FormLabel>
                  <FormControl>
                    <AssessmentPicker
                      currentAssessment={codeCurrentAssessment}
                      setCurrentAssessment={setCodeCurrentAssessment}
                      stockAssessment={codeStockAssessment}
                      setStockAssessment={setCodeStockAssessment}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coding Time</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""} // Ensure the field value doesn't start as undefined
                      onChange={(e) => field.onChange(Number(e.target.value))} // Convert string to number
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reqScreen"
              render={({ field }) => (
                <FormItem className="flex flex-row">
                  <FormControl>
                    <Input
                      className="size-4"
                      type="checkbox"
                      checked={field.value} // Set checked to the boolean value
                      onChange={field.onChange} // Update the form state when checkbox changes
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormLabel>Require screen record</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reqMicrophone"
              render={({ field }) => (
                <FormItem className="flex flex-row">
                  <FormControl>
                    <Input
                      className="size-4"
                      type="checkbox"
                      checked={field.value} // Set checked to the boolean value
                      onChange={field.onChange} // Update the form state when checkbox changes
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormLabel>Require microphone record</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reqCamera"
              render={({ field }) => (
                <FormItem className="flex flex-row">
                  <FormControl>
                    <Input
                      className="size-4"
                      type="checkbox"
                      checked={field.value} // Set checked to the boolean value
                      onChange={field.onChange} // Update the form state when checkbox changes
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormLabel>Require camera record</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className={"w-full"} onClick={test}>
              Submit
            </Button>
          </form>
        </Form>
      </ContentPanel>
    </ContentLayout>
  )
}

export default CreateWorkspace
