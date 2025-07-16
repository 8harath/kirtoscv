"use client"

import { useCVContext } from "@/context/cv-context"
import { EditableText } from "../editable-text"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export function ExperienceSection() {
  const { state, dispatch } = useCVContext()
  const { experience, isEditing } = state
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    }
    dispatch({ type: "ADD_EXPERIENCE", payload: newExperience })
  }

  const updateExperience = (id: string, field: string, value: any) => {
    dispatch({
      type: "UPDATE_EXPERIENCE",
      payload: { id, data: { [field]: value } },
    })
  }

  const deleteExperience = (id: string) => {
    dispatch({ type: "DELETE_EXPERIENCE", payload: id })
  }

  const addAchievement = (experienceId: string, achievements: string[]) => {
    updateExperience(experienceId, "achievements", [...achievements, ""])
  }

  const updateAchievement = (experienceId: string, achievements: string[], index: number, value: string) => {
    const newAchievements = [...achievements]
    newAchievements[index] = value
    updateExperience(experienceId, "achievements", newAchievements)
  }

  const removeAchievement = (experienceId: string, achievements: string[], index: number) => {
    const newAchievements = achievements.filter((_, i) => i !== index)
    updateExperience(experienceId, "achievements", newAchievements)
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
    <section className="space-y-component print-break-inside-avoid">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-2 font-semibold">Experience</h2>
        {isEditing && (
          <Button onClick={addExperience} variant="ghost" size="sm" className="transition-colors-smooth focus-ring">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        )}
      </div>

      <div className="space-y-8">
        {experience.map((exp, index) => (
          <div key={exp.id} className="space-y-3 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <EditableText
                    value={exp.position}
                    onChange={(value) => updateExperience(exp.id, "position", value)}
                    isEditing={isEditing}
                    className="text-heading-3 font-semibold"
                    placeholder="Position Title"
                  />
                  <EditableText
                    value={exp.company}
                    onChange={(value) => updateExperience(exp.id, "company", value)}
                    isEditing={isEditing}
                    className="text-body font-medium text-muted-foreground"
                    placeholder="Company Name"
                  />
                </div>

                <div className="flex items-center space-x-4 text-body-small text-muted-foreground">
                  {isEditing ? (
                    <>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        className="bg-transparent border border-border rounded px-2 py-1 text-xs focus-ring"
                      />
                      <span>to</span>
                      {exp.current ? (
                        <span>Present</span>
                      ) : (
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          className="bg-transparent border border-border rounded px-2 py-1 text-xs focus-ring"
                        />
                      )}
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                          className="focus-ring"
                        />
                        <span className="text-xs">Current</span>
                      </label>
                    </>
                  ) : (
                    <span>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                  )}
                </div>
              </div>

              {isEditing && (
                <Button
                  onClick={() => deleteExperience(exp.id)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive transition-colors-smooth focus-ring"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <EditableText
              value={exp.description}
              onChange={(value) => updateExperience(exp.id, "description", value)}
              isEditing={isEditing}
              className="text-body text-muted-foreground"
              placeholder="Brief description of your role and responsibilities..."
              multiline
            />

            <div className="space-y-2">
              {exp.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex items-start space-x-3">
                  <span className="text-muted-foreground mt-2">•</span>
                  <div className="flex-1">
                    <EditableText
                      value={achievement}
                      onChange={(value) => updateAchievement(exp.id, exp.achievements, achIndex, value)}
                      isEditing={isEditing}
                      className="text-body"
                      placeholder="Key achievement or responsibility..."
                    />
                  </div>
                  {isEditing && (
                    <Button
                      onClick={() => removeAchievement(exp.id, exp.achievements, achIndex)}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive transition-colors-smooth focus-ring"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}

              {isEditing && (
                <Button
                  onClick={() => addAchievement(exp.id, exp.achievements)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground transition-colors-smooth focus-ring ml-6"
                >
                  <Plus className="w-3 h-3 mr-2" />
                  Add Achievement
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
