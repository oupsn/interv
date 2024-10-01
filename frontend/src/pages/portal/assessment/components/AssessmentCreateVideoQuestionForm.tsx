import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { server } from "@/contexts/swr.tsx"
import { Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import useCurrentUser from "@/hooks/UseCurrentUser.ts"
import ReactQuill from "react-quill"

const AssessmentCreateVideoQuestionForm = () => {
  const { currentUser } = useCurrentUser()
  const formSchema = z.object({
    title: z.string().min(1, { message: "Required" }),
    timeToPrepare: z.coerce.number().min(1, { message: "Required" }),
    timeToAnswer: z.coerce.number().min(1, { message: "Required" }),
    retryAmount: z.coerce.number().min(0, { message: "Required" }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      timeToPrepare: 0,
      timeToAnswer: 0,
      retryAmount: 1,
    },
  })
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.promise(
      server.videoQuestion.createVideoQuestion({
        ...values,
        portalId: currentUser.portalId,
      }),
      {
        loading: "Creating question...",
        success: () => {
          form.reset()
          return "Created successfully"
        },
        error: (err) => {
          return err.response.data.message
        },
      },
    )
  }

  const editorFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ]

  const editorModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      ["link", "image", "video"],
    ],
  }

  return (
    <ContentLayout
      title={"Create Video Questions"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/portal/question/video">Video Questions</Link>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Question Title</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      formats={editorFormats}
                      modules={editorModules}
                      className="bg-white rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeToPrepare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Time To Prepare (seconds)
                  </FormLabel>
                  <FormControl>
                    <Input type={"number"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeToAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Time To Answer (seconds)
                  </FormLabel>
                  <FormControl>
                    <Input type={"number"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="retryAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Max Retry</FormLabel>
                  <FormControl>
                    <Input type={"number"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className={"w-full"} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </ContentPanel>
    </ContentLayout>
  )
}

export default AssessmentCreateVideoQuestionForm
