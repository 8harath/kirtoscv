"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { useAppContext } from "@/context/app-context"
import { extractTextFromFile } from "@/lib/file-parser"

export function UploadZone() {
  const { dispatch } = useAppContext()
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      if (file.size > 10 * 1024 * 1024) {
        dispatch({ type: "SET_ERROR", payload: "File size must be less than 10MB" })
        return
      }

      dispatch({ type: "SET_UPLOADED_FILE", payload: file })
      dispatch({ type: "SET_ERROR", payload: null })

      try {
        const extractedText = await extractTextFromFile(file)
        dispatch({ type: "SET_RAW_CONTENT", payload: extractedText })
        dispatch({ type: "SET_STEP", payload: "processing" })
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to process file. Please try again." })
      }
    },
    [dispatch],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-all duration-300 ease-out
          ${
            isDragActive
              ? "border-foreground bg-muted/50 scale-105"
              : "border-border hover:border-foreground/50 hover:bg-muted/30"
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="space-y-6">
          <div className="flex justify-center">
            <div
              className={`
                w-16 h-16 rounded-full bg-muted flex items-center justify-center
                transition-all duration-300
                ${isDragActive ? "bg-foreground text-background scale-110" : ""}
              `}
            >
              <Upload className="w-8 h-8" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-heading-3 font-semibold">
              {isDragActive ? "Drop your resume here" : "Upload your resume"}
            </h3>
            <p className="text-body text-muted-foreground">
              {isDragActive ? "Release to start processing" : "Drag and drop your resume file here, or click to browse"}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            {["PDF", "DOC", "DOCX"].map((format) => (
              <span
                key={format}
                className="px-3 py-1 bg-muted rounded-full text-body-small font-medium text-muted-foreground"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-start space-x-3 text-body-small text-muted-foreground">
          <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            Your resume will be processed using AI to create a clean, ATS-optimized version following our professional
            template structure.
          </p>
        </div>

        <div className="flex items-start space-x-3 text-body-small text-muted-foreground">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>Maximum file size: 10MB. Supported formats: PDF, DOC, DOCX.</p>
        </div>
      </div>
    </div>
  )
}
