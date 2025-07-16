import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/context/app-context"

export const metadata: Metadata = {
  title: "Kirtos CV - AI-Powered Resume Transformation",
  description: "Transform your resume into a clean, ATS-optimized, professional document using AI technology.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
