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
import { Link, useNavigate, useParams } from "react-router-dom"
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
import { useContext, useEffect } from "react"
import { Spinner } from "@/components/ui/spinner.tsx"
import { useGetIndividualUser } from "@/hooks/userGetIndividualUser"
import { LoadingContext } from "@/contexts/loading"

const EditCandidatePage = () => {
  const { workspaceId, candidateId } = useParams()
  const navigate = useNavigate()
  const {
    data: userData,
    isLoading,
    error,
  } = useGetIndividualUser(parseInt(candidateId!), parseInt(workspaceId!))
  const formSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    username: z.string().email({ message: "Invalid email format" }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  })
  const { setLoading } = useContext(LoadingContext)
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.promise(
      server.user.updateIndividualUser({
        ...values,
        userId: Number(userData?.data?.userId),
      }),
      {
        loading: "Updating question...",
        success: () => {
          return "Updated successfully"
        },
        error: (err) => {
          return err.response.data.message
        },
      },
    )
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate("/portal/workspace/" + workspaceId + "/applicantList")
    }, 1000)
  }

  useEffect(() => {
    form.reset({
      name: userData?.data?.name,
      username: userData?.data?.username,
    })
  }, [form, isLoading, userData?.data?.name, userData?.data?.username])

  return (
    <ContentLayout
      title={"Edit Applicant"}
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
              <Link to={"/portal/workspace/" + workspaceId + "/applicantList"}>
                Applicant List
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{userData?.data?.name ?? ""}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div>Error: {error.message}</div>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 relative"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Applicant Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Applicant Email</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
        )}
      </ContentPanel>
    </ContentLayout>
  )
}

export default EditCandidatePage
