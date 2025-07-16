"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

type Step = "upload" | "customize" | "processing" | "template" | "preview" | "download"
type ExperienceLevel = "intern" | "beginner" | "experienced"
type Template = "classic" | "modern" | "executive"

interface ResumeState {
  currentStep: Step
  file: File | null
  extractedContent: string
  targetRole: string
  experienceLevel: ExperienceLevel
  selectedTemplate: Template
  optimizedContent: string
  processingStatus: {
    stage: string
    progress: number
    message: string
  }
  error: string | null
}

type ResumeAction =
  | { type: "SET_STEP"; payload: Step }
  | { type: "SET_FILE"; payload: File }
  | { type: "SET_EXTRACTED_CONTENT"; payload: string }
  | { type: "SET_TARGET_ROLE"; payload: string }
  | { type: "SET_EXPERIENCE_LEVEL"; payload: ExperienceLevel }
  | { type: "SET_TEMPLATE"; payload: Template }
  | { type: "SET_OPTIMIZED_CONTENT"; payload: string }
  | { type: "SET_PROCESSING_STATUS"; payload: Partial<ResumeState["processingStatus"]> }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" }

const initialState: ResumeState = {
  currentStep: "upload",
  file: null,
  extractedContent: "",
  targetRole: "",
  experienceLevel: "beginner",
  selectedTemplate: "modern",
  optimizedContent: "",
  processingStatus: {
    stage: "idle",
    progress: 0,
    message: "",
  },
  error: null,
}

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload }
    case "SET_FILE":
      return { ...state, file: action.payload }
    case "SET_EXTRACTED_CONTENT":
      return { ...state, extractedContent: action.payload }
    case "SET_TARGET_ROLE":
      return { ...state, targetRole: action.payload }
    case "SET_EXPERIENCE_LEVEL":
      return { ...state, experienceLevel: action.payload }
    case "SET_TEMPLATE":
      return { ...state, selectedTemplate: action.payload }
    case "SET_OPTIMIZED_CONTENT":
      return { ...state, optimizedContent: action.payload }
    case "SET_PROCESSING_STATUS":
      return {
        ...state,
        processingStatus: { ...state.processingStatus, ...action.payload },
      }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "RESET":
      return initialState
    default:
      return state
  }
}

const ResumeContext = createContext<{
  state: ResumeState
  dispatch: React.Dispatch<ResumeAction>
} | null>(null)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  return <ResumeContext.Provider value={{ state, dispatch }}>{children}</ResumeContext.Provider>
}

export function useResumeContext() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error("useResumeContext must be used within ResumeProvider")
  }
  return {
    ...context.state,
    dispatch: context.dispatch,
  }
}
