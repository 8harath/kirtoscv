"use client"
import { useEffect, useState } from "react"

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 border-4 border-black/10 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin" />
          <span className="text-display font-bold text-foreground">Kairos CV</span>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 