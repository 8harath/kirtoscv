"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
}

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

interface Skill {
  id: string
  name: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
}

interface CVState {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  isEditing: boolean
  layout: "classic" | "modern"
  theme: "light" | "dark"
}

type CVAction =
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "ADD_EXPERIENCE"; payload: Experience }
  | { type: "UPDATE_EXPERIENCE"; payload: { id: string; data: Partial<Experience> } }
  | { type: "DELETE_EXPERIENCE"; payload: string }
  | { type: "ADD_EDUCATION"; payload: Education }
  | { type: "UPDATE_EDUCATION"; payload: { id: string; data: Partial<Education> } }
  | { type: "DELETE_EDUCATION"; payload: string }
  | { type: "ADD_SKILL"; payload: Skill }
  | { type: "UPDATE_SKILL"; payload: { id: string; data: Partial<Skill> } }
  | { type: "DELETE_SKILL"; payload: string }
  | { type: "TOGGLE_EDITING" }
  | { type: "SET_LAYOUT"; payload: "classic" | "modern" }
  | { type: "SET_THEME"; payload: "light" | "dark" }

const initialState: CVState = {
  personalInfo: {
    name: "Alex Johnson",
    title: "Senior Product Designer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.design",
    summary:
      "Experienced product designer with 8+ years creating user-centered digital experiences. Led design teams at scale-up and enterprise companies, shipping products used by millions of users worldwide.",
  },
  experience: [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Senior Product Designer",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description: "Lead design for core product features serving 2M+ users",
      achievements: [
        "Redesigned onboarding flow, increasing conversion by 35%",
        "Established design system used across 12 product teams",
        "Mentored 4 junior designers and led design reviews",
      ],
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "Product Designer",
      startDate: "2019-01",
      endDate: "2021-02",
      current: false,
      description: "End-to-end product design for B2B SaaS platform",
      achievements: [
        "Designed MVP that secured $5M Series A funding",
        "Conducted 50+ user interviews and usability tests",
        "Collaborated with engineering to ship 15+ features",
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Human-Computer Interaction",
      startDate: "2016-09",
      endDate: "2018-06",
      gpa: "3.8",
    },
    {
      id: "2",
      institution: "UC Berkeley",
      degree: "Bachelor of Arts",
      field: "Cognitive Science",
      startDate: "2012-09",
      endDate: "2016-05",
      gpa: "3.6",
    },
  ],
  skills: [
    { id: "1", name: "Product Design", level: "expert" },
    { id: "2", name: "User Research", level: "advanced" },
    { id: "3", name: "Prototyping", level: "advanced" },
    { id: "4", name: "Design Systems", level: "expert" },
    { id: "5", name: "Figma", level: "expert" },
    { id: "6", name: "Sketch", level: "advanced" },
  ],
  isEditing: false,
  layout: "modern",
  theme: "light",
}

function cvReducer(state: CVState, action: CVAction): CVState {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      }
    case "ADD_EXPERIENCE":
      return {
        ...state,
        experience: [action.payload, ...state.experience],
      }
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.map((exp) =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp,
        ),
      }
    case "DELETE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.filter((exp) => exp.id !== action.payload),
      }
    case "ADD_EDUCATION":
      return {
        ...state,
        education: [action.payload, ...state.education],
      }
    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu,
        ),
      }
    case "DELETE_EDUCATION":
      return {
        ...state,
        education: state.education.filter((edu) => edu.id !== action.payload),
      }
    case "ADD_SKILL":
      return {
        ...state,
        skills: [...state.skills, action.payload],
      }
    case "UPDATE_SKILL":
      return {
        ...state,
        skills: state.skills.map((skill) =>
          skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill,
        ),
      }
    case "DELETE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((skill) => skill.id !== action.payload),
      }
    case "TOGGLE_EDITING":
      return {
        ...state,
        isEditing: !state.isEditing,
      }
    case "SET_LAYOUT":
      return {
        ...state,
        layout: action.payload,
      }
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      }
    default:
      return state
  }
}

const CVContext = createContext<{
  state: CVState
  dispatch: React.Dispatch<CVAction>
} | null>(null)

export function CVProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cvReducer, initialState)

  return <CVContext.Provider value={{ state, dispatch }}>{children}</CVContext.Provider>
}

export function useCVContext() {
  const context = useContext(CVContext)
  if (!context) {
    throw new Error("useCVContext must be used within CVProvider")
  }
  return context
}
