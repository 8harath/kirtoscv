"use client"

import { useEffect } from "react"
import { useAppContext } from "@/context/app-context"
import { processResumeWithGemini } from "@/lib/gemini-processor"
import { Cpu, FileText, Sparkles, CheckCircle } from "lucide-react"

const processingSteps = [
  {
    id: "parsing",
    label: "Parsing Content",
    description: "Extracting information from your resume",
    icon: FileText,
  },
  {
    id: "analyzing",
    label: "AI Analysis",
    description: "Understanding your experience and skills",
    icon: Cpu,
  },
  {
    id: "optimizing",
    label: "Content Optimization",
    description: "Rephrasing and structuring content",
    icon: Sparkles,
  },
  {
    id: "formatting",
    label: "Final Formatting",
    description: "Applying professional template",
    icon: CheckCircle,
  },
]

export function ProcessingScreen() {
  const { state, dispatch } = useAppContext()

  useEffect(() => {
    const processResume = async () => {
      if (!state.rawContent) return

      dispatch({ type: "SET_PROCESSING", payload: true })

      try {
        // Step 1: Parsing
        dispatch({ type: "SET_PROCESSING_PROGRESS", payload: { progress: 25, message: "Parsing Content" } })
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Step 2: AI Analysis
        dispatch({ type: "SET_PROCESSING_PROGRESS", payload: { progress: 50, message: "AI Analysis" } })
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Step 3: Content Optimization
        dispatch({ type: "SET_PROCESSING_PROGRESS", payload: { progress: 75, message: "Content Optimization" } })
        const processedResume = await processResumeWithGemini(state.rawContent)

        // Save processed resume to MongoDB
        try {
          await fetch("/api/save-resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resume: processedResume })
          })
        } catch (err) {
          // Optionally log or handle save error, but don't block user
          console.error("Failed to save resume to database", err)
        }

        // Step 4: Final Formatting
        dispatch({ type: "SET_PROCESSING_PROGRESS", payload: { progress: 100, message: "Final Formatting" } })
        await new Promise((resolve) => setTimeout(resolve, 500))

        dispatch({ type: "SET_PROCESSED_RESUME", payload: processedResume })
        dispatch({ type: "SET_PROCESSING", payload: false })
        dispatch({ type: "SET_STEP", payload: "preview" })
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to process resume. Please try again." })
        dispatch({ type: "SET_PROCESSING", payload: false })
      }
    }

    processResume()
  }, [state.rawContent, dispatch])

  const currentStepIndex = Math.floor((state.processingProgress / 100) * processingSteps.length)

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-heading-2 font-semibold">Processing Your Resume</h2>
        <p className="text-body text-muted-foreground">Our AI is analyzing and optimizing your resume content</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 space-y-8">
        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-body-small font-medium text-muted-foreground">Progress</span>
            <span className="text-body-small font-semibold">{state.processingProgress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-foreground h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${state.processingProgress}%` }}
            />
          </div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4">
          {processingSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStepIndex
            const isCompleted = index < currentStepIndex
            const isPending = index > currentStepIndex

            return (
              <div
                key={step.id}
                className={`
                  flex items-center space-x-4 p-4 rounded-lg transition-all duration-300
                  ${isActive ? "bg-muted" : ""}
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-foreground text-background"
                        : isActive
                          ? "bg-foreground/10 text-foreground"
                          : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <h4
                    className={`
                      font-medium transition-colors duration-300
                      ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"}
                    `}
                  >
                    {step.label}
                  </h4>
                  <p className="text-body-small text-muted-foreground">{step.description}</p>
                </div>

                {isActive && (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-foreground rounded-full animate-pulse-slow" />
                    <div
                      className="w-2 h-2 bg-foreground rounded-full animate-pulse-slow"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-foreground rounded-full animate-pulse-slow"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
