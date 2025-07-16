"use client"

import { useCVContext } from "@/context/cv-context"
import { EditableText } from "../editable-text"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

export function SkillsSection() {
  const { state, dispatch } = useCVContext()
  const { skills, isEditing, layout } = state

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: "",
      level: "intermediate" as const,
    }
    dispatch({ type: "ADD_SKILL", payload: newSkill })
  }

  const updateSkill = (id: string, field: string, value: any) => {
    dispatch({
      type: "UPDATE_SKILL",
      payload: { id, data: { [field]: value } },
    })
  }

  const deleteSkill = (id: string) => {
    dispatch({ type: "DELETE_SKILL", payload: id })
  }

  const getLevelWidth = (level: string) => {
    switch (level) {
      case "beginner":
        return "25%"
      case "intermediate":
        return "50%"
      case "advanced":
        return "75%"
      case "expert":
        return "100%"
      default:
        return "50%"
    }
  }

  if (layout === "classic") {
    return (
      <section className="space-y-component print-break-inside-avoid">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-2 font-semibold">Skills</h2>
          {isEditing && (
            <Button onClick={addSkill} variant="ghost" size="sm" className="transition-colors-smooth focus-ring">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-md animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <EditableText
                value={skill.name}
                onChange={(value) => updateSkill(skill.id, "name", value)}
                isEditing={isEditing}
                className="text-body-small font-medium"
                placeholder="Skill name"
              />
              {isEditing && (
                <>
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                    className="bg-transparent text-xs border border-border rounded px-1 py-0.5 focus-ring"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                  <Button
                    onClick={() => deleteSkill(skill.id)}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive transition-colors-smooth focus-ring p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-component print-break-inside-avoid">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-2 font-semibold">Skills</h2>
        {isEditing && (
          <Button onClick={addSkill} variant="ghost" size="sm" className="transition-colors-smooth focus-ring">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={skill.id} className="space-y-2 animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="flex items-center justify-between">
              <EditableText
                value={skill.name}
                onChange={(value) => updateSkill(skill.id, "name", value)}
                isEditing={isEditing}
                className="text-body font-medium"
                placeholder="Skill name"
              />
              <div className="flex items-center space-x-2">
                {isEditing && (
                  <>
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                      className="bg-transparent text-xs border border-border rounded px-2 py-1 focus-ring"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                    <Button
                      onClick={() => deleteSkill(skill.id)}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive transition-colors-smooth focus-ring p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </>
                )}
                {!isEditing && <span className="text-body-small text-muted-foreground capitalize">{skill.level}</span>}
              </div>
            </div>

            {!isEditing && (
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-foreground h-1.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: getLevelWidth(skill.level) }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
