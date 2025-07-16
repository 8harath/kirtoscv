"use client"

import { useCVContext } from "@/context/cv-context"
import { EditableText } from "../editable-text"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

export function EducationSection() {
  const { state, dispatch } = useCVContext()
  const { education, isEditing } = state

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    dispatch({ type: "ADD_EDUCATION", payload: newEducation })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    dispatch({
      type: "UPDATE_EDUCATION",
      payload: { id, data: { [field]: value } },
    })
  }

  const deleteEducation = (id: string) => {
    dispatch({ type: "DELETE_EDUCATION", payload: id })
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const formatDate = (date: string) => {
      if (!date) return ""
      return date.split("-")[0] // Just return the year
    }

    const start = formatDate(startDate)
    const end = formatDate(endDate)
    return `${start} - ${end}`
  }

  return (
    <section className="space-y-component print-break-inside-avoid">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-2 font-semibold">Education</h2>
        {isEditing && (
          <Button onClick={addEducation} variant="ghost" size="sm" className="transition-colors-smooth focus-ring">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="space-y-2 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <EditableText
                    value={`${edu.degree} ${edu.field ? `in ${edu.field}` : ""}`}
                    onChange={(value) => {
                      // Simple parsing - in a real app, you'd want more sophisticated handling
                      const parts = value.split(" in ")
                      updateEducation(edu.id, "degree", parts[0] || "")
                      updateEducation(edu.id, "field", parts[1] || "")
                    }}
                    isEditing={isEditing}
                    className="text-heading-3 font-semibold"
                    placeholder="Degree in Field of Study"
                  />
                  <EditableText
                    value={edu.institution}
                    onChange={(value) => updateEducation(edu.id, "institution", value)}
                    isEditing={isEditing}
                    className="text-body font-medium text-muted-foreground"
                    placeholder="Institution Name"
                  />
                </div>

                <div className="flex items-center space-x-4 text-body-small text-muted-foreground">
                  {isEditing ? (
                    <>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                        className="bg-transparent border border-border rounded px-2 py-1 text-xs focus-ring"
                      />
                      <span>to</span>
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                        className="bg-transparent border border-border rounded px-2 py-1 text-xs focus-ring"
                      />
                      {edu.gpa && (
                        <>
                          <span>•</span>
                          <span>GPA:</span>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                            className="bg-transparent border border-border rounded px-2 py-1 text-xs w-16 focus-ring"
                            placeholder="3.8"
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <span>{formatDateRange(edu.startDate, edu.endDate)}</span>
                      {edu.gpa && (
                        <>
                          <span>•</span>
                          <span>GPA: {edu.gpa}</span>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              {isEditing && (
                <Button
                  onClick={() => deleteEducation(edu.id)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive transition-colors-smooth focus-ring"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
