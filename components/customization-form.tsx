"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useResumeContext } from "@/context/resume-context"
import { ArrowRight, Target, User, Star, Zap, Sparkles, Briefcase } from "lucide-react"

export function CustomizationForm() {
  const { targetRole, experienceLevel, dispatch } = useResumeContext()
  const [localRole, setLocalRole] = useState(targetRole)
  const [isValid, setIsValid] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    setIsValid(localRole.trim().length > 0)
  }, [localRole])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    dispatch({ type: "SET_TARGET_ROLE", payload: localRole })
    dispatch({ type: "SET_STEP", payload: "processing" })
  }

  const experienceLevels = [
    {
      value: "intern",
      label: "Intern",
      description: "Ready to learn and grow in your field",
      icon: Star,
      gradient: "from-yellow-400 to-orange-400",
      subjects: "Entry Level",
    },
    {
      value: "beginner",
      label: "Beginner",
      description: "0-2 years of professional experience",
      icon: User,
      gradient: "from-orange-400 to-red-400",
      subjects: "Junior Level",
    },
    {
      value: "experienced",
      label: "Experienced",
      description: "3+ years of expertise and leadership",
      icon: Zap,
      gradient: "from-red-400 to-orange-500",
      subjects: "Senior Level",
    },
  ] as const

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center retro-fade-in">
        <div className="inline-block mb-8 relative">
          <div className="retro-icon-box w-20 h-20 mx-auto mb-6 retro-pulse">
            <Target className="h-10 w-10" />
          </div>
          <div className="absolute -top-2 -right-2 retro-bounce">
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <h2 className="text-5xl font-bold retro-heading retro-text-gradient mb-6">Customize Your Resume</h2>
        <p className="text-2xl retro-subheading max-w-3xl mx-auto">
          Tell us about your career goals and we'll tailor your resume for maximum impact
        </p>
      </div>

      <div className="retro-card p-12 retro-slide-up">
        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Target Role Input */}
          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="retro-icon-box w-12 h-12">
                <Briefcase className="h-6 w-6" />
              </div>
              <Label htmlFor="targetRole" className="text-3xl font-bold retro-heading retro-text-gradient">
                What's your dream role?
              </Label>
            </div>

            <div className="relative max-w-2xl mx-auto">
              <Input
                id="targetRole"
                type="text"
                placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist..."
                value={localRole}
                onChange={(e) => {
                  setLocalRole(e.target.value)
                  setIsTyping(true)
                  setTimeout(() => setIsTyping(false), 1000)
                }}
                className="retro-input text-2xl py-8 px-8 text-center"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-8">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    isTyping ? "bg-yellow-400 retro-pulse" : localRole ? "bg-green-400" : "bg-gray-300"
                  }`}
                />
              </div>

              {/* Typewriter effect indicator */}
              {isTyping && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-orange-600">
                  <div className="w-2 h-6 bg-orange-400 animate-pulse" />
                  <span className="font-bold">AI is listening...</span>
                </div>
              )}
            </div>
          </div>

          {/* Experience Level Selector */}
          <div className="space-y-10">
            <div className="flex items-center justify-center space-x-4">
              <div className="retro-icon-box w-12 h-12">
                <User className="h-6 w-6" />
              </div>
              <Label className="text-3xl font-bold retro-heading retro-text-gradient">
                What's your experience level?
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {experienceLevels.map((level, index) => {
                const Icon = level.icon
                const isSelected = experienceLevel === level.value

                return (
                  <label
                    key={level.value}
                    className={`cursor-pointer transition-all duration-500 retro-fade-in ${
                      isSelected ? "scale-110" : "hover:scale-105"
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={level.value}
                      checked={isSelected}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_EXPERIENCE_LEVEL",
                          payload: e.target.value as any,
                        })
                      }
                      className="sr-only"
                    />

                    <div
                      className={`retro-card p-8 text-center transition-all duration-500 relative overflow-hidden ${
                        isSelected ? "retro-glow border-yellow-400" : ""
                      }`}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-3 h-3 bg-orange-400 rounded-full" />
                        <div className="absolute bottom-4 left-4 w-2 h-2 bg-red-400 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full" />
                      </div>

                      {/* Icon */}
                      <div className="relative z-10">
                        <div
                          className={`retro-icon-box w-20 h-20 mx-auto mb-6 transition-all duration-300 ${
                            isSelected ? "retro-pulse" : ""
                          }`}
                        >
                          <Icon className="h-10 w-10" />
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold retro-heading mb-2 retro-text-gradient">{level.label}</h3>
                        <p className="text-lg font-semibold retro-subheading mb-4">{level.subjects}</p>
                        <p className="retro-body leading-relaxed">{level.description}</p>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="absolute top-4 right-4 retro-bounce">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                              <div className="w-3 h-3 bg-white rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-12">
            <button
              type="submit"
              disabled={!isValid}
              className={`retro-button px-16 py-6 text-2xl font-bold inline-flex items-center space-x-4 transition-all duration-300 ${
                !isValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Zap className="h-8 w-8" />
              <span>Optimize My Resume</span>
              <ArrowRight className="h-8 w-8" />
            </button>

            {!isValid && (
              <p className="text-lg retro-subheading mt-6">Please enter your target role to continue the magic ✨</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
