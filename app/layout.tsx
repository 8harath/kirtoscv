import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/context/app-context"
import { SplashProvider } from "@/components/splash-provider"

export const metadata: Metadata = {
  title: "Kairos CV - AI-Powered Resume Transformation",
  description: "Transform your resume into a clean, ATS-optimized, professional document using AI technology.",
  generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SplashProvider>
          <AppProvider>{children}</AppProvider>
        </SplashProvider>
      </body>
    </html>
  )
}
