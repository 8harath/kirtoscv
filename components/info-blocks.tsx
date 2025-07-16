"use client"

import { Cpu, Shield, Lock } from "lucide-react"

const infoBlocks = [
  {
    icon: Cpu,
    title: "AI-Powered Resume Formatting",
    description:
      "Kirtos CV uses advanced AI to rephrase and format your resume for clarity, impact, and industry relevance.",
  },
  {
    icon: Shield,
    title: "ATS-Optimized Standard Template",
    description:
      "Every output follows a pre-approved resume structure proven to score high on ATS systems across tech roles.",
  },
  {
    icon: Lock,
    title: "No Customization Needed",
    description:
      "The formatting is fixed — intentionally. This ensures every resume meets the highest standards without user-side complexity.",
  },
]

export function InfoBlocks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {infoBlocks.map((block, index) => {
        const Icon = block.icon
        return (
          <div
            key={block.title}
            className="text-center space-y-4 animate-fade-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 text-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">{block.title}</h3>
              <p className="text-body-small text-muted-foreground leading-relaxed">{block.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
