"use client"

import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/app-context"
import { RotateCcw } from "lucide-react"
import { ProfilePanel } from "./profile-panel"

export function Header() {
  const { state, dispatch } = useAppContext()

  const handleReset = () => {
    dispatch({ type: "RESET" })
  }

  const toggleProfilePanel = () => {
    dispatch({ type: "TOGGLE_PROFILE_PANEL" })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <>
      <header className="no-print sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container-app">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center">
                <span className="text-background font-bold text-sm">K</span>
              </div>
              <span className="font-semibold text-lg text-foreground">Kairos CV</span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {state.currentStep !== "upload" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="transition-colors-smooth focus-ring text-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleProfilePanel}
                className="transition-colors-smooth focus-ring p-2"
              >
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  {state.userProfile.avatar ? (
                    <img
                      src={state.userProfile.avatar || "/placeholder.svg"}
                      alt={state.userProfile.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-medium text-foreground">{getInitials(state.userProfile.name)}</span>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="w-full h-px bg-border" />
      <ProfilePanel />
    </>
  )
}
