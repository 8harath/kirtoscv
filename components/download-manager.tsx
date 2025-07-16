"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useResumeContext } from "@/context/resume-context"
import { Download, CheckCircle, RefreshCw, Home } from "lucide-react"

export function DownloadManager() {
  const { optimizedContent, selectedTemplate, targetRole, dispatch } = useResumeContext()
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)

  const generateFileName = () => {
    const role = targetRole.replace(/\s+/g, "_").toLowerCase()
    const template = selectedTemplate
    const date = new Date().toISOString().split("T")[0]
    return `resume_${role}_${template}_${date}.pdf`
  }

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      // Simulate PDF generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create a blob with the resume content (in a real app, this would be a PDF)
      const blob = new Blob([optimizedContent], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      // Create download link
      const link = document.createElement("a")
      link.href = url
      link.download = generateFileName()
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Cleanup
      URL.revokeObjectURL(url)

      setDownloadComplete(true)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleStartOver = () => {
    dispatch({ type: "RESET" })
  }

  const handleBackToPreview = () => {
    dispatch({ type: "SET_STEP", payload: "preview" })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="p-8 bg-white/70 backdrop-blur-sm border border-slate-200">
        <div className="text-center">
          {!downloadComplete ? (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full mb-6">
                <Download className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Download Your Resume</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Your optimized resume is ready! Click below to download it as a PDF.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Download Complete!</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Your resume has been successfully downloaded. Good luck with your applications!
              </p>
            </>
          )}

          {/* File Info */}
          <Card className="p-4 bg-slate-50 border border-slate-200 mb-8">
            <div className="flex items-center justify-between text-sm">
              <div className="text-left">
                <p className="font-medium text-slate-800">File Name:</p>
                <p className="text-slate-600 font-mono">{generateFileName()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-slate-800">Template:</p>
                <p className="text-slate-600 capitalize">{selectedTemplate}</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            {!downloadComplete ? (
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-3">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 py-3 bg-transparent"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Again
                </Button>
                <Button
                  onClick={handleStartOver}
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white py-3 font-medium rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Create Another Resume
                </Button>
              </div>
            )}

            <Button
              onClick={handleBackToPreview}
              variant="ghost"
              className="w-full text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            >
              Back to Preview
            </Button>
          </div>
        </div>
      </Card>

      {/* Success Tips */}
      {downloadComplete && (
        <Card className="p-6 bg-green-50 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">🎉 Next Steps</h3>
          <ul className="space-y-2 text-sm text-green-700">
            <li>• Review your resume one final time</li>
            <li>• Tailor it for specific job applications</li>
            <li>• Save multiple versions for different roles</li>
            <li>• Update regularly with new experiences</li>
          </ul>
        </Card>
      )}
    </div>
  )
}
