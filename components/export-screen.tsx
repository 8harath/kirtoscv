"use client"

import { useState } from "react"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Download, CheckCircle, FileText, RotateCcw } from "lucide-react"

export function ExportScreen() {
  const { state, dispatch } = useAppContext()
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Simulate PDF generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, you would generate the PDF here
      // For now, we'll trigger the browser's print dialog
      window.print()

      setExportComplete(true)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
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
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div
            className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${exportComplete ? "bg-green-100 text-green-600" : "bg-muted text-foreground"}
            `}
          >
            {exportComplete ? <CheckCircle className="w-8 h-8" /> : <Download className="w-8 h-8" />}
          </div>
        </div>

        <h2 className="text-heading-2 font-semibold">{exportComplete ? "Export Complete!" : "Export Your Resume"}</h2>

        <p className="text-body text-muted-foreground">
          {exportComplete
            ? "Your optimized resume has been successfully exported."
            : "Download your professionally formatted resume as a PDF."}
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">Optimized Resume</h3>
            <p className="text-body-small text-muted-foreground">
              ATS-friendly • Professional format • Clean structure
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {!exportComplete ? (
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-foreground text-background hover:bg-foreground/90 focus-ring py-3"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin mr-2" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-3">
              <Button onClick={handleExport} variant="outline" className="w-full focus-ring py-3 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download Again
              </Button>
              <Button
                onClick={handleStartOver}
                className="w-full bg-foreground text-background hover:bg-foreground/90 focus-ring py-3"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Create Another Resume
              </Button>
            </div>
          )}

          <Button onClick={handleBackToPreview} variant="ghost" className="w-full focus-ring">
            Back to Preview
          </Button>
        </div>
      </div>

      {exportComplete && (
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">Next Steps</h3>
          <ul className="space-y-2 text-body-small text-green-700 dark:text-green-300">
            <li>• Review your resume one final time before applying</li>
            <li>• Customize it further for specific job applications</li>
            <li>• Keep your original file for future updates</li>
            <li>• Consider creating role-specific versions</li>
          </ul>
        </div>
      )}
    </div>
  )
}
