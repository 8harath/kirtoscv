"use client"

import { useEffect, useState } from "react"
import { useResumeContext } from "@/context/resume-context"
import { optimizeResumeContent } from "@/lib/ai-optimizer"
import { Upload, FileText, Cpu, Palette, CheckCircle, AlertCircle } from "lucide-react"

const processingSteps = [
  {
    id: "extract",
    label: "Step 1",
    title: "Extracting Content",
    description: "Reading your resume content",
    icon: Upload,
    subjects: "Content Analysis",
  },
  {
    id: "analyze",
    label: "Step 2",
    title: "Analyzing Structure",
    description: "Understanding your experience",
    icon: FileText,
    subjects: "Structure Review",
  },
  {
    id: "optimize",
    label: "Step 3",
    title: "AI Optimization",
    description: "Tailoring for your target role",
    icon: Cpu,
    subjects: "AI Enhancement",
  },
  {
    id: "format",
    label: "Step 4",
    title: "Formatting",
    description: "Preparing professional layout",
    icon: Palette,
    subjects: "Final Polish",
  },
]

export function ProcessingStatus() {
  const { extractedContent, targetRole, experienceLevel, processingStatus, error, dispatch } = useResumeContext()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const processResume = async () => {
      try {
        // Step 1: Extract
        setCurrentStepIndex(0)
        dispatch({
          type: "SET_PROCESSING_STATUS",
          payload: { stage: "extract", progress: 25, message: "Content extracted successfully" },
        })
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Step 2: Analyze
        setCurrentStepIndex(1)
        dispatch({
          type: "SET_PROCESSING_STATUS",
          payload: { stage: "analyze", progress: 50, message: "Analyzing resume structure" },
        })
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Step 3: AI Optimization
        setCurrentStepIndex(2)
        dispatch({
          type: "SET_PROCESSING_STATUS",
          payload: { stage: "optimize", progress: 75, message: "Optimizing with AI" },
        })

        const optimizedContent = await optimizeResumeContent(extractedContent, targetRole, experienceLevel)
        dispatch({ type: "SET_OPTIMIZED_CONTENT", payload: optimizedContent })

        // Step 4: Format
        setCurrentStepIndex(3)
        dispatch({
          type: "SET_PROCESSING_STATUS",
          payload: { stage: "format", progress: 100, message: "Formatting complete" },
        })
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsComplete(true)
        setTimeout(() => {
          dispatch({ type: "SET_STEP", payload: "template" })
        }, 2000)
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to optimize resume. Please try again.",
        })
      }
    }

    processResume()
  }, [extractedContent, targetRole, experienceLevel, dispatch])

  const handleRetry = () => {
    setCurrentStepIndex(0)
    setIsComplete(false)
    dispatch({ type: "SET_ERROR", payload: null })
    dispatch({
      type: "SET_PROCESSING_STATUS",
      payload: { stage: "extract", progress: 0, message: "" },
    })
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="jain-card p-12 text-center jain-fade-in">
          <div className="jain-icon-box w-20 h-20 mx-auto mb-6 bg-red-600">
            <AlertCircle className="h-10 w-10" />
          </div>
          <h3 className="text-3xl font-bold jain-heading text-gray-900 mb-4">Processing Failed</h3>
          <p className="text-lg jain-body mb-8 max-w-md mx-auto">{error}</p>
          <button onClick={handleRetry} className="jain-button px-8 py-4 text-lg font-semibold">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center jain-fade-in">
        <h2 className="text-4xl font-bold jain-heading text-gray-900 mb-4">
          {isComplete ? "Optimization Complete!" : "Processing Your Resume"}
        </h2>
        <p className="text-xl jain-subheading">
          {isComplete
            ? "Your resume has been successfully optimized"
            : "Please wait while we enhance your resume with AI"}
        </p>
      </div>

      <div className="jain-card p-10 jain-slide-in">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">Overall Progress</span>
            <span className="font-bold text-2xl jain-text-gradient">{processingStatus.progress}%</span>
          </div>
          <div className="jain-progress h-4">
            <div className="jain-progress-fill" style={{ width: `${processingStatus.progress}%` }} />
          </div>
        </div>

        {/* Processing Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {processingSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStepIndex
            const isCompleted = index < currentStepIndex || isComplete
            const isPending = index > currentStepIndex && !isComplete

            return (
              <div
                key={step.id}
                className={`jain-card p-6 transition-all duration-500 jain-fade-in ${
                  isActive ? "border-red-300 scale-105" : isCompleted ? "border-green-300" : "opacity-60"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`jain-icon-box w-12 h-12 flex-shrink-0 ${
                      isCompleted ? "bg-green-600" : isActive ? "bg-red-600" : "bg-gray-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-lg jain-heading text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm jain-text-gradient font-medium mb-2">{step.subjects}</p>
                    <p className="text-sm jain-body">{step.description}</p>
                  </div>

                  {isActive && (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
