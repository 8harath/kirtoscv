"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, X, CheckCircle, Sparkles, Zap } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"
import { extractTextFromFile } from "@/lib/file-processor"

export function FileUploader() {
  const { dispatch } = useResumeContext()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      if (file.size > 10 * 1024 * 1024) {
        dispatch({ type: "SET_ERROR", payload: "File size must be less than 10MB" })
        return
      }

      setUploadedFile(file)
      setIsProcessing(true)
      dispatch({ type: "SET_FILE", payload: file })
      dispatch({ type: "SET_ERROR", payload: null })

      try {
        for (let i = 0; i <= 100; i += 4) {
          setUploadProgress(i)
          await new Promise((resolve) => setTimeout(resolve, 50))
        }

        const extractedText = await extractTextFromFile(file)
        dispatch({ type: "SET_EXTRACTED_CONTENT", payload: extractedText })

        setTimeout(() => {
          dispatch({ type: "SET_STEP", payload: "customize" })
        }, 1000)
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to process file. Please try again." })
        setIsProcessing(false)
        setUploadedFile(null)
        setUploadProgress(0)
      }
    },
    [dispatch],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    disabled: isProcessing,
  })

  const removeFile = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    setIsProcessing(false)
    dispatch({ type: "SET_FILE", payload: null })
    dispatch({ type: "SET_ERROR", payload: null })
  }

  return (
    <div className="space-y-8">
      {!uploadedFile ? (
        <div className="retro-card p-16 text-center relative retro-scale-in">
          {/* Animated Background Elements */}
          <div className="absolute top-6 right-6 retro-pulse">
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="absolute bottom-6 left-6 retro-bounce">
            <Zap className="h-6 w-6 text-red-500" />
          </div>

          <div
            {...getRootProps()}
            className={`cursor-pointer transition-all duration-500 ${
              isDragActive ? "scale-105 retro-glow" : "hover:scale-102"
            }`}
          >
            <input {...getInputProps()} />

            {/* Upload Icon */}
            <div className="mb-10">
              <div
                className={`retro-icon-box w-24 h-24 mx-auto transition-all duration-500 ${
                  isDragActive ? "scale-110 retro-glow" : ""
                }`}
              >
                <Upload className="h-12 w-12" />
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-4xl font-bold retro-heading retro-text-gradient">
                {isDragActive ? "Drop It Like It's Hot! 🔥" : "Upload Your Resume"}
              </h3>

              <p className="text-xl retro-body max-w-2xl mx-auto leading-relaxed">
                {isDragActive
                  ? "Release to start the magic transformation ✨"
                  : "Drag and drop your resume file here, or click to browse. We support all major formats and make them shine!"}
              </p>

              {/* Supported Formats */}
              <div className="flex justify-center flex-wrap gap-4 mt-8">
                {["PDF", "DOC", "DOCX", "TXT"].map((format, index) => (
                  <div
                    key={format}
                    className="px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full border-2 border-orange-300 text-sm font-bold text-orange-800 retro-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {format}
                  </div>
                ))}
              </div>

              <button className="retro-button px-12 py-5 text-xl font-bold inline-flex items-center space-x-3 mt-10">
                <Upload className="h-6 w-6" />
                <span>Choose File</span>
                <Sparkles className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="retro-card p-10 retro-fade-in">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-6">
              <div className="retro-icon-box w-20 h-20">
                <FileText className="h-10 w-10" />
              </div>
              <div>
                <h4 className="text-2xl font-bold retro-heading text-brown-800">{uploadedFile.name}</h4>
                <p className="text-lg retro-subheading mt-2">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.type.split("/")[1].toUpperCase()}
                </p>
              </div>
            </div>
            {!isProcessing && (
              <button
                onClick={removeFile}
                className="w-12 h-12 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-red-300"
              >
                <X className="h-6 w-6 text-red-600" />
              </button>
            )}
          </div>

          {isProcessing ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold retro-body">Processing your resume magic...</span>
                <span className="text-3xl font-bold retro-text-gradient">{uploadProgress}%</span>
              </div>

              <div className="retro-progress h-6">
                <div className="retro-progress-fill" style={{ width: `${uploadProgress}%` }} />
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-4 text-green-600 py-6">
              <CheckCircle className="h-8 w-8" />
              <span className="text-xl font-bold">File processed successfully!</span>
              <Sparkles className="h-6 w-6 text-yellow-500 retro-pulse" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
