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
import { Trash2, Plus, Download, Upload } from "lucide-react"
import { server } from "@/contexts/swr"
import { Textarea } from "@/components/ui/textarea"
import { DomainsCreateCodingQuestionRequest } from "@/api/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx"
import { Link, useNavigate } from "react-router-dom"
import ContentPanel from "@/components/layout/ContentPanel.tsx"
import { ContentLayout } from "@/components/layout/ContentLayout.tsx"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select" // Import Select components
import useCurrentUser from "@/hooks/UseCurrentUser"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { useContext } from "react"
import { LoadingContext } from "@/contexts/loading"

function CreateCodingQuestion() {
  const { currentUser } = useCurrentUser()
  const navigate = useNavigate()
  const { setLoading } = useContext(LoadingContext)
  const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    inputDescription: z.string().optional(),
    outputDescription: z.string().optional(),
    testCases: z
      .array(
        z.object({
          input: z
            .string()
            .min(1)
            .max(1000)
            .refine((val) => val.length > 0, {
              message: "Input cannot be empty",
            }),
          output: z
            .string()
            .min(1)
            .max(1000)
            .refine((val) => val.length > 0, {
              message: "Output cannot be empty",
            }),
          isHidden: z.boolean().default(true),
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const body: DomainsCreateCodingQuestionRequest = {
      title: values.title || "",
      description: values.description || "",
      input_description: values.inputDescription || "",
      output_description: values.outputDescription || "",
      test_cases:
        values.testCases.map((testCase) => ({
          ...testCase,
          input: testCase.input.replace(/\n/g, "\\n"),
          output: testCase.output.replace(/\n/g, "\\n"),
          is_hidden: testCase.isHidden,
          is_example: testCase.isExample,
        })) || [],
      difficulty: values.difficulty,
      portal_id: currentUser.portalId,
    }

    await toast.promise(
      server.codingInterview.createQuestion({
        body,
      }),
      {
        loading: "Creating question...",
        success: "Question created successfully",
        error: "Failed to create question",
      },
    )
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate("/portal/question/coding/" + encodeURIComponent(values.title))
    }, 1000)
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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) {
      toast.error("Please upload a file")
      return
    }

    if (file.size > 3 * 1024 * 1024) {
      toast.error("File size exceeds 3MB limit")
      return
    }

    if (
      file.type !== "application/zip" &&
      file.type !== "application/x-zip-compressed"
    ) {
      toast.error("Please upload a ZIP file")
      return
    }

    try {
      const zip = new JSZip()
      const zipContent = await zip.loadAsync(file)
      const testCases: {
        input: string
        output: string
        isHidden: boolean
        isExample: boolean
      }[] = []
      const processedInputs = new Set<string>()

      for (const [filename, zipEntry] of Object.entries(zipContent.files)) {
        if (!zipEntry.dir && filename.match(/^\d+_input\.txt$/)) {
          const caseNumber = filename.split("_")[0]
          processedInputs.add(caseNumber)
        }
      }

      for (const caseNumber of processedInputs) {
        const inputFile = zipContent.files[`${caseNumber}_input.txt`]
        const outputFile = zipContent.files[`${caseNumber}_output.txt`]

        if (!inputFile || !outputFile) {
          toast.error(
            `Missing input or output file for test case ${caseNumber}`,
          )
          continue
        }

        const input = await inputFile.async("text")
        const output = await outputFile.async("text")

        testCases.push({
          input: input.trim(),
          output: output.trim(),
          isHidden: true,
          isExample: testCases.length === 0,
        })
      }

      if (testCases.length === 0) {
        toast.error("No valid test cases found in the ZIP file")
        return
      }

      testCases[0].isExample = true
      testCases[0].isHidden = false

      if (testCases.length > 0) {
        form.setValue("testCases", [testCases[0], ...testCases.slice(1)])
        form.trigger("testCases")
        toast.success(`${testCases.length} test case(s) imported successfully`)
      }
    } catch (error) {
      console.error("Error processing ZIP file:", error)
      toast.error("Error processing ZIP file")
    }
  }

  const handleExportTestCases = async () => {
    const testCases = form.getValues("testCases")
    if (testCases.length === 0) {
      toast.error("No test cases to export")
      return
    }

    try {
      const zip = new JSZip()

      testCases.forEach((testCase, index) => {
        const caseNumber = index + 1
        zip.file(`${caseNumber}_input.txt`, testCase.input)
        zip.file(`${caseNumber}_output.txt`, testCase.output)
      })

      const content = await zip.generateAsync({ type: "blob" })
      saveAs(content, "test_cases.zip")
      toast.success("Test cases exported successfully")
    } catch (error) {
      console.error("Error exporting test cases:", error)
      toast.error("Error exporting test cases")
    }
  }

  const handleDownloadExampleZip = async () => {
    try {
      const zip = new JSZip()
      const examples = [
        {
          input: "5\n2 4 6 8 10",
          output: "30",
        },
        {
          input: "3\n1 2 3",
          output: "6",
        },
      ]

      examples.forEach((example, index) => {
        const caseNumber = index + 1
        zip.file(`${caseNumber}_input.txt`, example.input)
        zip.file(`${caseNumber}_output.txt`, example.output)
      })

      const content = await zip.generateAsync({ type: "blob" })
      saveAs(content, "example_test_cases.zip")
      toast.success("Example test cases downloaded successfully")
    } catch (error) {
      console.error("Error creating example ZIP:", error)
      toast.error("Error creating example ZIP file")
    }
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "testCases",
  })

  return (
    <ContentLayout
      title={"Create Coding Question"}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/portal/question/coding">Coding Questions</Link>
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 relative"
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
                        <div className="space-x-2">
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
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Test Case
                          </Button>
                          <Button
                            type="button"
                            onClick={handleExportTestCases}
                            variant="outline"
                            disabled={fields.length === 0}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Export Test Cases
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Add test cases to validate the solution. You can
                        manually add test cases or import them from a ZIP file.
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
                                    <Textarea
                                      id={`input-${index}`}
                                      placeholder="Input"
                                      {...form.register(
                                        `testCases.${index}.input`,
                                      )}
                                      className="w-full font-mono"
                                      rows={3}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <label
                                      htmlFor={`output-${index}`}
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Output
                                    </label>
                                    <Textarea
                                      id={`output-${index}`}
                                      placeholder="Output"
                                      {...form.register(
                                        `testCases.${index}.output`,
                                      )}
                                      className="w-full font-mono"
                                      rows={3}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <FormField
                                        control={form.control}
                                        name={`testCases.${index}.isHidden`}
                                        render={({ field }) => (
                                          <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                              <Checkbox
                                                id={`hidden-${index}`}
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                  field.onChange(checked)
                                                  if (checked) {
                                                    form.setValue(
                                                      `testCases.${index}.isExample`,
                                                      false,
                                                    )
                                                  } else {
                                                    form.setValue(
                                                      `testCases.${index}.isExample`,
                                                      true,
                                                    )
                                                  }
                                                }}
                                              />
                                            </FormControl>
                                            <label
                                              htmlFor={`hidden-${index}`}
                                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                              Hidden
                                            </label>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <FormField
                                        control={form.control}
                                        name={`testCases.${index}.isExample`}
                                        render={({ field }) => (
                                          <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                              <Checkbox
                                                id={`example-${index}`}
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                  field.onChange(checked)
                                                  if (checked) {
                                                    form.setValue(
                                                      `testCases.${index}.isHidden`,
                                                      false,
                                                    )
                                                  } else {
                                                    form.setValue(
                                                      `testCases.${index}.isHidden`,
                                                      true,
                                                    )
                                                  }
                                                }}
                                              />
                                            </FormControl>
                                            <label
                                              htmlFor={`example-${index}`}
                                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                              Example
                                            </label>
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  </div>
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
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </FormControl>
                      <div className="mt-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Input
                            type="file"
                            accept=".zip"
                            onChange={handleFileUpload}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            onClick={handleDownloadExampleZip}
                            className="whitespace-nowrap"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Example
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Import test cases from a ZIP file (max 3MB). The ZIP
                          should contain numbered pairs of input/output text
                          files (e.g., 1_input.txt, 1_output.txt, 2_input.txt,
                          2_output.txt, etc.). You can download an example ZIP
                          file to see the expected format.
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
                      {fields.some(
                        (field) =>
                          field.input.length === 0 || field.output.length === 0,
                      ) && (
                        <p className="text-sm text-red-500">
                          Input and output fields cannot be empty.
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <Button type="submit" className="w-full">
              Create Question
            </Button>
          </form>
        </Form>
      </ContentPanel>
    </ContentLayout>
  )
}

export default CreateCodingQuestion
