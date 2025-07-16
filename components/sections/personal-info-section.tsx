"use client"

import { useCVContext } from "@/context/cv-context"
import { EditableText } from "../editable-text"
import { Mail, Phone, MapPin, Globe } from "lucide-react"

export function PersonalInfoSection() {
  const { state, dispatch } = useCVContext()
  const { personalInfo, isEditing, layout } = state

  const updatePersonalInfo = (field: keyof typeof personalInfo, value: string) => {
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: { [field]: value },
    })
  }

  if (layout === "classic") {
    return (
      <section className="text-center space-y-element print-break-inside-avoid">
        <div className="space-y-2">
          <EditableText
            value={personalInfo.name}
            onChange={(value) => updatePersonalInfo("name", value)}
            isEditing={isEditing}
            className="text-display font-bold"
            placeholder="Your Name"
          />
          <EditableText
            value={personalInfo.title}
            onChange={(value) => updatePersonalInfo("title", value)}
            isEditing={isEditing}
            className="text-heading-3 text-muted-foreground"
            placeholder="Your Title"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-body-small text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <EditableText
              value={personalInfo.email}
              onChange={(value) => updatePersonalInfo("email", value)}
              isEditing={isEditing}
              placeholder="email@example.com"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <EditableText
              value={personalInfo.phone}
              onChange={(value) => updatePersonalInfo("phone", value)}
              isEditing={isEditing}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <EditableText
              value={personalInfo.location}
              onChange={(value) => updatePersonalInfo("location", value)}
              isEditing={isEditing}
              placeholder="City, State"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <EditableText
              value={personalInfo.website}
              onChange={(value) => updatePersonalInfo("website", value)}
              isEditing={isEditing}
              placeholder="yourwebsite.com"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <EditableText
            value={personalInfo.summary}
            onChange={(value) => updatePersonalInfo("summary", value)}
            isEditing={isEditing}
            className="text-body leading-relaxed"
            placeholder="Write a compelling summary of your professional background and key achievements..."
            multiline
          />
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-element print-break-inside-avoid">
      <div className="space-y-2">
        <EditableText
          value={personalInfo.name}
          onChange={(value) => updatePersonalInfo("name", value)}
          isEditing={isEditing}
          className="text-display font-bold"
          placeholder="Your Name"
        />
        <EditableText
          value={personalInfo.title}
          onChange={(value) => updatePersonalInfo("title", value)}
          isEditing={isEditing}
          className="text-heading-3 text-muted-foreground"
          placeholder="Your Title"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-body-small text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 flex-shrink-0" />
          <EditableText
            value={personalInfo.email}
            onChange={(value) => updatePersonalInfo("email", value)}
            isEditing={isEditing}
            placeholder="email@example.com"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 flex-shrink-0" />
          <EditableText
            value={personalInfo.phone}
            onChange={(value) => updatePersonalInfo("phone", value)}
            isEditing={isEditing}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <EditableText
            value={personalInfo.location}
            onChange={(value) => updatePersonalInfo("location", value)}
            isEditing={isEditing}
            placeholder="City, State"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 flex-shrink-0" />
          <EditableText
            value={personalInfo.website}
            onChange={(value) => updatePersonalInfo("website", value)}
            isEditing={isEditing}
            placeholder="yourwebsite.com"
          />
        </div>
      </div>

      <EditableText
        value={personalInfo.summary}
        onChange={(value) => updatePersonalInfo("summary", value)}
        isEditing={isEditing}
        className="text-body leading-relaxed"
        placeholder="Write a compelling summary of your professional background and key achievements..."
        multiline
      />
    </section>
  )
}
