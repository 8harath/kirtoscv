"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useResumeContext } from "@/context/resume-context"
import { ArrowRight, Eye } from "lucide-react"

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional and professional layout",
    preview: "/placeholder.svg?height=400&width=300",
    features: ["Clean typography", "Structured sections", "ATS-friendly"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with subtle accents",
    preview: "/placeholder.svg?height=400&width=300",
    features: ["Modern styling", "Color accents", "Visual hierarchy"],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated layout for senior roles",
    preview: "/placeholder.svg?height=400&width=300",
    features: ["Executive styling", "Premium layout", "Leadership focus"],
  },
] as const

export function TemplateSelector() {
  const { selectedTemplate, dispatch } = useResumeContext()
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  const handleTemplateSelect = (templateId: typeof selectedTemplate) => {
    dispatch({ type: "SET_TEMPLATE", payload: templateId })
  }

  const handleContinue = () => {
    dispatch({ type: "SET_STEP", payload: "preview" })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Choose Your Template</h2>
        <p className="text-slate-600">Select a professional template that matches your style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedTemplate === template.id
                ? "ring-2 ring-blue-500 shadow-xl scale-105"
                : "hover:shadow-lg hover:scale-102"
            } ${hoveredTemplate === template.id ? "shadow-xl" : ""}`}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            onClick={() => handleTemplateSelect(template.id)}
          >
            {/* Template Preview */}
            <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
              <img
                src={template.preview || "/placeholder.svg"}
                alt={`${template.name} template preview`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />

              {/* Overlay on hover */}
              {hoveredTemplate === template.id && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Eye className="h-6 w-6 text-slate-700" />
                  </div>
                </div>
              )}

              {/* Selected indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-6">
              <h3
                className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                  selectedTemplate === template.id ? "text-blue-700" : "text-slate-800"
                }`}
              >
                {template.name}
              </h3>
              <p className="text-slate-600 mb-4">{template.description}</p>

              {/* Features */}
              <ul className="space-y-1">
                {template.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-slate-600">
                    <div
                      className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        selectedTemplate === template.id ? "bg-blue-500" : "bg-slate-400"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {/* Continue Button */}
      <div className="text-center pt-8">
        <Button
          onClick={handleContinue}
          className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
        >
          Preview Resume
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
