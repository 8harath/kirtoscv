"use client"

import { useCVContext } from "@/context/cv-context"
import { PersonalInfoSection } from "./sections/personal-info-section"
import { ExperienceSection } from "./sections/experience-section"
import { EducationSection } from "./sections/education-section"
import { SkillsSection } from "./sections/skills-section"

export function CVPreview() {
  const { state } = useCVContext()

  return (
    <div className="bg-background">
      <div className={`max-w-4xl mx-auto ${state.layout === "modern" ? "p-8" : "p-6"}`}>
        <div className="space-y-section animate-fade-in">
          <PersonalInfoSection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
        </div>
      </div>
    </div>
  )
}
