"use client"

import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun, X } from "lucide-react"
import { useEffect } from "react"

export function ProfilePanel() {
  const { state, dispatch } = useAppContext()

  const toggleTheme = () => {
    const newTheme = state.theme === "light" ? "dark" : "light"
    dispatch({ type: "SET_THEME", payload: newTheme })
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const closePanel = () => {
    dispatch({ type: "TOGGLE_PROFILE_PANEL" })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const panel = document.getElementById("profile-panel")
      const trigger = document.querySelector("[data-profile-trigger]")

      if (panel && !panel.contains(event.target as Node) && !trigger?.contains(event.target as Node)) {
        closePanel()
      }
    }

    if (state.showProfilePanel) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [state.showProfilePanel])

  if (!state.showProfilePanel) return null

  return (
    <div className="no-print fixed inset-0 z-50">
      <div className="modal-backdrop absolute inset-0" onClick={closePanel} />
      <div className="absolute top-20 right-4 md:right-8">
        <div id="profile-panel" className="bg-card border border-border rounded-lg shadow-lg w-80 animate-scale-in">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-black dark:text-foreground">Profile</h3>
              <Button variant="ghost" size="sm" onClick={closePanel} className="p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center border-2 border-black">
                {state.userProfile.avatar ? (
                  <img
                    src={state.userProfile.avatar || "/placeholder.svg"}
                    alt={state.userProfile.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-black"
                  />
                ) : (
                  <span className="text-xl font-medium text-black dark:text-foreground">{getInitials(state.userProfile.name)}</span>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black dark:text-foreground">{state.userProfile.name}</h4>
                <p className="text-sm text-black/70 dark:text-muted-foreground">@{state.userProfile.username}</p>
                <p className="text-sm text-black/70 dark:text-muted-foreground">{state.userProfile.email}</p>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black dark:text-foreground">Theme</span>
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="transition-colors-smooth focus-ring">
                  {state.theme === "light" ? (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Dark
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Light
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
