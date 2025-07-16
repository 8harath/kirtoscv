"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

type AppStep = "upload" | "processing" | "preview" | "export"

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    achievements: string[]
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa?: string
  }>
  skills: Array<{
    id: string
    name: string
    category: string
  }>
}

interface UserProfile {
  name: string
  username: string
  email: string
  avatar?: string
}

interface AppState {
  currentStep: AppStep
  uploadedFile: File | null
  rawContent: string
  processedResume: ResumeData | null
  isProcessing: boolean
  processingProgress: number
  processingMessage: string
  error: string | null
  theme: "light" | "dark"
  userProfile: UserProfile
  showProfilePanel: boolean
  showSupportModal: boolean
}

type AppAction =
  | { type: "SET_STEP"; payload: AppStep }
  | { type: "SET_UPLOADED_FILE"; payload: File }
  | { type: "SET_RAW_CONTENT"; payload: string }
  | { type: "SET_PROCESSED_RESUME"; payload: ResumeData }
  | { type: "SET_PROCESSING"; payload: boolean }
  | { type: "SET_PROCESSING_PROGRESS"; payload: { progress: number; message: string } }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "TOGGLE_PROFILE_PANEL" }
  | { type: "TOGGLE_SUPPORT_MODAL" }
  | { type: "RESET" }

const initialState: AppState = {
  currentStep: "upload",
  uploadedFile: null,
  rawContent: "",
  processedResume: null,
  isProcessing: false,
  processingProgress: 0,
  processingMessage: "",
  error: null,
  theme: "light",
  userProfile: {
    name: "Alex Johnson",
    username: "alexjohnson",
    email: "alex.johnson@email.com",
    avatar: "",
  },
  showProfilePanel: false,
  showSupportModal: false,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload }
    case "SET_UPLOADED_FILE":
      return { ...state, uploadedFile: action.payload }
    case "SET_RAW_CONTENT":
      return { ...state, rawContent: action.payload }
    case "SET_PROCESSED_RESUME":
      return { ...state, processedResume: action.payload }
    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload }
    case "SET_PROCESSING_PROGRESS":
      return {
        ...state,
        processingProgress: action.payload.progress,
        processingMessage: action.payload.message,
      }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "SET_THEME":
      return { ...state, theme: action.payload }
    case "TOGGLE_PROFILE_PANEL":
      return { ...state, showProfilePanel: !state.showProfilePanel }
    case "TOGGLE_SUPPORT_MODAL":
      return { ...state, showSupportModal: !state.showSupportModal }
    case "RESET":
      return { ...initialState, theme: state.theme, userProfile: state.userProfile }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
