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
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import "react-quill/dist/quill.snow.css"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import { server } from "@/contexts/swr"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx"
import { Link, useParams } from "react-router-dom"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useGetCodingInterviewQuestionByTitle } from "@/hooks/useGetCodingInterviewQuestionByTitle"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CodingInterviewUpdateQuestionQuery } from "@/api/server"
import { Controller } from "react-hook-form"

function AssessmentCodingEdit() {
  const { codingTitle } = useParams()
  const encodedTitle = encodeURIComponent(codingTitle ?? "")
  const decodedTitle = decodeURIComponent(encodedTitle ?? "")
  const { data: originalCodingQuestion, isLoading } =
    useGetCodingInterviewQuestionByTitle(encodedTitle ?? "")

  const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    inputDescription: z.string().optional(),
    outputDescription: z.string().optional(),
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
    difficulty: z.enum(["easy", "moderate", "hard"]),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      inputDescription: "",
      outputDescription: "",
      testCases: [],
      difficulty: "easy",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "testCases",
  })

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [formValues, setFormValues] = useState<z.infer<
    typeof formSchema
  > | null>(null)

  useEffect(() => {
    if (originalCodingQuestion?.data) {
      form.reset({
        title: originalCodingQuestion.data.title ?? "",
        description: originalCodingQuestion.data.description ?? "",
        inputDescription: originalCodingQuestion.data.input_description ?? "",
        outputDescription: originalCodingQuestion.data.output_description ?? "",
        testCases:
          originalCodingQuestion.data.test_case?.map((tc) => ({
            input: tc.input?.replace(/\\n/g, "\n") ?? "",
            output: tc.output?.replace(/\\n/g, "\n") ?? "",
            isHidden: tc.is_hidden || false,
            isExample: tc.is_example || false,
          })) || [],
        difficulty:
          (originalCodingQuestion.data.difficulty as
            | "easy"
            | "moderate"
            | "hard") || "easy",
      })
    }
  }, [originalCodingQuestion, form])

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setFormValues(values)
    setIsConfirmDialogOpen(true)
  }

  const confirmUpdate = async () => {
    if (formValues) {
      const codingQuestionID = originalCodingQuestion?.data?.id ?? 0
      const updateBody: CodingInterviewUpdateQuestionQuery = {
        codingQuestionID,
        body: {
          title: formValues.title || "",
          description: formValues.description || "",
          input_description: formValues.inputDescription || "",
          output_description: formValues.outputDescription || "",
          test_cases: formValues.testCases.map((testCase) => ({
            ...testCase,
            input: testCase.input.replace(/\n/g, "\\n") || "",
            output: testCase.output.replace(/\n/g, "\\n") || "",
          })),
          difficulty: formValues.difficulty || "easy",
        },
      }

      toast.promise(
        server.codingInterview.updateQuestion(codingQuestionID, updateBody),
        {
          loading: "Updating question...",
          success: "Question updated successfully",
          error: "Failed to update question",
        },
      )
      setIsConfirmDialogOpen(false)
    }
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
          const validTestCases = uploadedTestCases.filter(
            (testCase) =>
              testCase.input.trim() !== "" || testCase.output.trim() !== "",
          )

          if (validTestCases.length > 0) {
            const hiddenTestCases = validTestCases.map((testCase) => ({
              ...testCase,
              isHidden: true,
              isExample: false,
            }))

            form.setValue("testCases", hiddenTestCases)
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ContentLayout
      title={"Edit Coding Assessment"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/portal/assessment/coding">Coding Assessments</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{decodedTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <ContentPanel>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Question Details</TabsTrigger>
                <TabsTrigger value="testcases">Test Cases</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-6 mt-6">
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
                        Question Description{" "}
                        <span className="text-red-500">*</span>
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
                  name="inputDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">
                        Input Description{" "}
                        <span className="text-xs text-gray-500">
                          (optional)
                        </span>
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
                        Explain the format and constraints of the input.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="outputDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">
                        Output Description{" "}
                        <span className="text-xs text-gray-500">
                          (optional)
                        </span>
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
                        Explain the format of the expected output.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">
                        Difficulty <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="testcases" className="space-y-6 mt-6">
                <FormField
                  control={form.control}
                  name="testCases"
                  render={() => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-4">
                        <FormLabel className="text-lg font-medium">
                          Test Cases <span className="text-red-500">*</span>
                        </FormLabel>
                        <Button
                          type="button"
                          onClick={() =>
                            append({
                              input: "",
                              output: "",
                              isHidden: true,
                              isExample: false,
                            })
                          }
                          variant="outline"
                        >
                          Add Test Case
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Add test cases to validate the solution. You can
                        manually add test cases or import them from a JSON file.
                      </p>
                      <FormControl>
                        <div className="space-y-4">
                          {fields.length === 0 ? (
                            <p>
                              No test cases added yet. Import or add a test
                              case.
                            </p>
                          ) : (
                            fields.map((field, index) => (
                              <div
                                key={field.id}
                                className="flex flex-col gap-4 border p-6 rounded-lg shadow-sm bg-white"
                              >
                                <div className="flex gap-4">
                                  <div className="flex-1">
                                    <label
                                      htmlFor={`input-${index}`}
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Input
                                    </label>
                                    <Controller
                                      name={`testCases.${index}.input`}
                                      control={form.control}
                                      render={({ field }) => (
                                        <Textarea
                                          id={`input-${index}`}
                                          placeholder="Input"
                                          {...field}
                                          className="w-full font-mono"
                                          rows={3}
                                        />
                                      )}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <label
                                      htmlFor={`output-${index}`}
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Output
                                    </label>
                                    <Controller
                                      name={`testCases.${index}.output`}
                                      control={form.control}
                                      render={({ field }) => (
                                        <Textarea
                                          id={`output-${index}`}
                                          placeholder="Output"
                                          {...field}
                                          className="w-full font-mono"
                                          rows={3}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`hidden-${index}`}
                                        checked={field.isHidden}
                                        onCheckedChange={(checked) => {
                                          form.setValue(
                                            `testCases.${index}.isHidden`,
                                            checked as boolean,
                                          )
                                          if (checked) {
                                            form.setValue(
                                              `testCases.${index}.isExample`,
                                              false,
                                            )
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor={`hidden-${index}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        Hidden
                                      </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`example-${index}`}
                                        checked={field.isExample}
                                        onCheckedChange={(checked) => {
                                          form.setValue(
                                            `testCases.${index}.isExample`,
                                            checked as boolean,
                                          )
                                          if (checked) {
                                            form.setValue(
                                              `testCases.${index}.isHidden`,
                                              false,
                                            )
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor={`example-${index}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        Example
                                      </label>
                                    </div>
                                  </div>
                                  {
                                    <Button
                                      type="button"
                                      onClick={() => remove(index)}
                                      variant="ghost"
                                      size="sm"
                                      className="h-8"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Remove
                                    </Button>
                                  }
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </FormControl>
                      <div className="mt-6">
                        <Input
                          type="file"
                          accept=".json"
                          onChange={handleFileUpload}
                          className="w-full"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Import test cases from a JSON file.
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-1">
                          <strong>Hidden:</strong> Test cases not visible to the
                          user, used for final validation.
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Example:</strong> Test cases shown to the user
                          as examples in the problem description.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <Dialog
              open={isConfirmDialogOpen}
              onOpenChange={setIsConfirmDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Update</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to update the question "
                    {formValues?.title}"?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsConfirmDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={confirmUpdate}
                    className="bg-primary text-white"
                  >
                    Update
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button type="submit" className="w-full">
              Update Question
            </Button>
          </form>
        </Form>
      </ContentPanel>
    </ContentLayout>
  )
}

export default AssessmentCodingEdit
