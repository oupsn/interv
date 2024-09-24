import ReactQuill from "react-quill"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import "react-quill/dist/quill.snow.css"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import "react-quill/dist/quill.snow.css"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import { server } from "@/contexts/swr"

function CreateCodingQuestion() {
  const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    testCases: z
      .array(
        z.object({
          input: z.string().min(1),
          output: z.string().min(1),
          isHidden: z.boolean().default(false),
          isExample: z.boolean().default(false),
        }),
      )
      .min(1),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      testCases: [],
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const exampleTestCases = values.testCases.filter(
      (testCase) => testCase.isExample,
    )
    const body = {
      title: values.title || "",
      description: values.description || "",
      test_cases: values.testCases || [],
      examples: exampleTestCases || [],
      tags: [],
    }
    console.log(body)

    toast.promise(
      server.codingInterview.createQuestion({
        body,
      }),
      {
        loading: "Creating question...",
        success: "Question created successfully",
        error: "Failed to create question",
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      toast.message("Please upload a file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        if (!content.trim()) {
          toast.message("Please upload a file")
          return
        }

        const uploadedTestCases = JSON.parse(content)
        if (Array.isArray(uploadedTestCases) && uploadedTestCases.length > 0) {
          // Filter out any empty test cases
          const validTestCases = uploadedTestCases.filter(
            (testCase) =>
              testCase.input.trim() !== "" || testCase.output.trim() !== "",
          )

          if (validTestCases.length > 0) {
            // Ensure all imported test cases are hidden by default
            const hiddenTestCases = validTestCases.map((testCase) => ({
              ...testCase,
              isHidden: true,
              isExample: false, // Ensure isExample is set to false by default
            }))

            // Replace all current test cases with the valid uploaded ones
            form.setValue("testCases", hiddenTestCases)

            // Trigger rerender
            form.trigger("testCases")

            toast.message(
              `${hiddenTestCases.length} test case(s) imported successfully.`,
            )
          } else {
            toast.message("No valid test cases found in the file")
          }
        } else {
          toast.message("Invalid file format")
        }
      } catch (error) {
        console.error("Error parsing file:", error)
        toast.message("Error parsing file")
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Create Coding Assessment
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Question Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" className="w-full" {...field} />
                </FormControl>
                <p className="text-sm text-gray-500 mt-1">
                  Enter a concise title for your coding question.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Question Description <span className="text-red-500">*</span>
                </FormLabel>
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
                <p className="text-sm text-gray-500 mt-1">
                  Provide a detailed description of the coding problem,
                  including any constraints or special requirements.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="testCases"
            render={() => (
              <FormItem>
                <FormLabel className="text-lg font-medium flex flex-row gap-2 justify-between">
                  <div className="flex flex-row gap-2">
                    <span>Test Cases</span>
                    <span className="text-red-500">*</span>
                  </div>
                  <Button
                    type="button"
                    onClick={() => {
                      const currentTestCases = form.getValues("testCases")
                      form.setValue("testCases", [
                        ...currentTestCases,
                        {
                          input: "",
                          output: "",
                          isHidden: true,
                          isExample: false,
                        },
                      ])
                    }}
                    variant="outline"
                  >
                    Add Test Case
                  </Button>
                </FormLabel>
                <p className="text-sm text-gray-500 mb-2">
                  Add test cases to validate the solution. You can manually add
                  test cases or import them from a JSON file.
                </p>
                <FormControl>
                  <div className="space-y-2">
                    {form.watch("testCases").length === 0 ? (
                      <p>No test cases added yet. Import or add a test case.</p>
                    ) : (
                      form.watch("testCases").map((testCase, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input
                            placeholder="Input"
                            {...form.register(`testCases.${index}.input`)}
                            className="w-full"
                          />
                          <Input
                            placeholder="Output"
                            {...form.register(`testCases.${index}.output`)}
                            className="w-full"
                          />
                          <div className="flex items-center space-x-2 ml-2">
                            <Checkbox
                              id={`hidden-${index}`}
                              checked={testCase.isHidden}
                              onCheckedChange={(checked) => {
                                form.setValue(
                                  `testCases.${index}.isHidden`,
                                  checked as boolean,
                                )
                              }}
                            />
                            <label
                              htmlFor={`hidden-${index}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Hidden
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 ml-2">
                            <Checkbox
                              id={`example-${index}`}
                              {...form.register(`testCases.${index}.isExample`)}
                            />
                            <label
                              htmlFor={`example-${index}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Example
                            </label>
                          </div>
                          {index === 0 ? (
                            <div className="w-10" />
                          ) : (
                            <Button
                              type="button"
                              onClick={() => {
                                const currentTestCases =
                                  form.getValues("testCases")
                                form.setValue(
                                  "testCases",
                                  currentTestCases.filter(
                                    (_, i) => i !== index,
                                  ),
                                )
                              }}
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))
                    )}
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="w-full"
                        placeholder="Upload"
                      />
                    </div>
                  </div>
                </FormControl>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Hidden:</strong> Test cases not visible to the user,
                    used for final validation.
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Example:</strong> Test cases shown to the user as
                    examples in the problem description.
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateCodingQuestion
