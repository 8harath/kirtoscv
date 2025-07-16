"use client"

import { useEffect, useState } from "react"
import { useAppContext } from "@/context/app-context"
import { Header } from "@/components/header"
import { UploadZone } from "@/components/upload-zone"
import { ProcessingScreen } from "@/components/processing-screen"
import { ResumePreview } from "@/components/resume-preview"
import { ExportScreen } from "@/components/export-screen"
import { InfoBlocks } from "@/components/info-blocks"
import { SupportSection } from "@/components/support-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const { state } = useAppContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Apply theme to document
    document.documentElement.classList.toggle("dark", state.theme === "dark")
  }, [state.theme])

  if (!mounted) return null

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case "upload":
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-display font-bold text-foreground">Kirtos CV</h1>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Transform your resume into a clean, ATS-optimized, professional document using AI technology.
              </p>
            </div>
            <div className="animate-scale-in">
              <UploadZone />
            </div>
            <InfoBlocks />
            <SupportSection />
          </div>
        )
      case "processing":
        return (
          <div className="animate-fade-in">
            <ProcessingScreen />
          </div>
        )
      case "preview":
        return (
          <div className="animate-fade-in">
            <ResumePreview />
          </div>
        )
      case "export":
        return (
          <div className="animate-fade-in">
            <ExportScreen />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container-app py-12 custom-scrollbar flex-1">
        {state.error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-center">{state.error}</p>
          </div>
        )}

        {renderCurrentStep()}
      </main>

      <Footer />
    </div>
  )
}
