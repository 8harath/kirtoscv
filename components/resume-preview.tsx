"use client"

import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function ResumePreview() {
  const { state, dispatch } = useAppContext()

  if (!state.processedResume) return null

  const { personalInfo, experience, education, skills } = state.processedResume

  const handleExport = () => {
    dispatch({ type: "SET_STEP", payload: "export" })
  }

  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    const formatDate = (date: string) => {
      if (!date) return ""
      const [year, month] = date.split("-")
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      return `${monthNames[Number.parseInt(month) - 1]} ${year}`
    }

    const start = formatDate(startDate)
    const end = current ? "Present" : formatDate(endDate)
    return `${start} - ${end}`
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-heading-2 font-semibold text-foreground">Resume Preview</h2>
          <p className="text-body text-muted-foreground">Your optimized resume is ready for export</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleExport} className="bg-foreground text-background hover:bg-foreground/90 focus-ring">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="bg-white border border-border rounded-lg shadow-sm">
        <div className="p-12 space-y-8 text-black">
          {/* Personal Info */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-black">{personalInfo.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>{personalInfo.email}</span>
              <span>{personalInfo.phone}</span>
              <span>{personalInfo.location}</span>
            </div>
            <p className="text-base leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 text-black">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-black">{exp.position}</h3>
                    <p className="text-base font-medium text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <ul className="space-y-1 ml-4">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-gray-700 list-disc">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 text-black">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-black">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>
                    {edu.startDate.split("-")[0]} - {edu.endDate.split("-")[0]}
                  </p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 text-black">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(
                skills.reduce(
                  (acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = []
                    acc[skill.category].push(skill.name)
                    return acc
                  },
                  {} as Record<string, string[]>,
                ),
              ).map(([category, skillList]) => (
                <div key={category}>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">{category}</h4>
                  <p className="text-sm text-gray-700">{skillList.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Note about editing restriction */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <p className="text-body-small text-muted-foreground text-center">
          This resume has been optimized using our AI system. To maintain quality and ATS compatibility, manual editing
          is not available.
        </p>
      </div>
    </div>
  )
}
