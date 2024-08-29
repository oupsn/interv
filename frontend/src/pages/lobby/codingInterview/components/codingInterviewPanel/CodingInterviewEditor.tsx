import React, { useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { langs } from "@uiw/codemirror-extensions-langs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface CodeEditorProps {
  content: string
  onChange: (newContent: string) => void
  language: string
  onLanguageChange: (newLanguage: string) => void
  onCompile: (language: number, content: string, input: string) => void
  output: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  content,
  onChange,
  language,
  onLanguageChange,
  onCompile,
  output,
}) => {
  const handleLanguageChange = (value: string) => {
    onLanguageChange(value)
    onChange(getDefaultCode(value))
  }

  const getDefaultCode = (lang: string) => {
    switch (lang) {
      case "javascript":
        return '// JavaScript code here\nconsole.log("Hello, World!");'
      case "python":
        return '# Python3 code here\nprint("Hello, World!")'
      case "c":
        return '// C code here\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}'
      default:
        return "// Start coding here"
    }
  }
  const getLanguageNumber = (lang: string) => {
    switch (lang) {
      case "javascript":
        return 63
      case "python":
        return 71
      case "c":
        return 48
      default:
        return 0
    }
  }

  const getLanguageExtension = () => {
    switch (language) {
      case "javascript":
        return langs.javascript()
      case "python":
        return langs.python()
      case "c":
        return langs.c()
      default:
        return langs.javascript()
    }
  }

  useEffect(() => {
    if (!content) {
      onChange(getDefaultCode(language))
    }
  }, [language, content, onChange])

  return (
    <div className="p-6 w-full min-h-full mx-auto rounded-lg border shadow-lg bg-white">
      <div className="mb-4 flex justify-between items-center">
        <Select onValueChange={handleLanguageChange} value={language}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="c">C</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            onCompile(getLanguageNumber(language), content, "")
          }}
          className=" text-white"
        >
          Compile & Run
        </Button>
      </div>
      <div className="mb-4">
        <CodeMirror
          value={content}
          height="300px"
          extensions={[getLanguageExtension()]}
          onChange={onChange}
          className="border border-gray-300 rounded-md overflow-hidden"
        />
      </div>
      <div className="w-full">
        <div className="bg-gray-100 p-4 h-full overflow-auto rounded-md border border-gray-300">
          <h3 className="text-lg font-semibold mb-2">Output:</h3>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
