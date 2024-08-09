import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button.tsx"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import useCurrentUser from "@/hooks/UseCurrentUser.ts"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx"
import { server } from "@/contexts/swr.tsx"
import IntervLogo from "@/assets/interv-logo.png"

const formSchema = z.object({
  username: z.string().min(1, { message: "Required" }).email({
    message: "Email must be valid",
  }),
  password: z.string(),
})

const LoginPage = () => {
  const navigate = useNavigate()
  const { mutate } = useCurrentUser()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.promise(server.authentication.login(values), {
      loading: "Signing in...",
      success: () => {
        mutate().then(() => {
          navigate("/dashboard", {
            replace: true,
          })
        })
        return "Signed in successfully"
      },
      error: (err) => {
        return err.response.data.message
      },
    })
  }

  return (
    <div className={"flex justify-center items-center w-dvw h-dvh"}>
      <div
        className={
          "w-[480px] flex flex-col shadow-xl h-fit rounded-xl p-8 space-y-4"
        }
      >
        <img
          src={IntervLogo}
          alt="Interv"
          className={"w-60 place-self-center"}
        />
        {/*<p className={"text-2xl font-semibold"}>Sign in</p>*/}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className={"w-full"} type="submit">
              Sign in
            </Button>
          </form>
        </Form>
        <Button variant={"link"} className={"w-fit h-fit p-0 right-0"}>
          Forgot password?
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
