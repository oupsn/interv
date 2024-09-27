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
import { useParams } from "react-router-dom"

const AssessmentCreateVideoQuestionForm = () => {
  const { workspaceId } = useParams()
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
      retryAmount: 0,
    },
  })
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.promise(
      server.videoQuestion.createVideoQuestion({
        ...values,
        workspaceId: Number(workspaceId),
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
  return (
    <>
      <h1 className="text-3xl font-bold text-primary mb-6">
        Create Video Assessment
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question title</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Time to prepare (seconds)</FormLabel>
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
                <FormLabel>Time to answer (seconds)</FormLabel>
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
                <FormLabel>Max retry</FormLabel>
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
    </>
  )
}

export default AssessmentCreateVideoQuestionForm
