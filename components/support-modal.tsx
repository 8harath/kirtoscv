"use client"

import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect } from "react"

export function SupportModal() {
  const { state, dispatch } = useAppContext()

  const closeModal = () => {
    dispatch({ type: "TOGGLE_SUPPORT_MODAL" })
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("support-modal")
      if (modal && !modal.contains(event.target as Node)) {
        closeModal()
      }
    }

    if (state.showSupportModal) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [state.showSupportModal])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }

    if (state.showSupportModal) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [state.showSupportModal])

  if (!state.showSupportModal) return null

  return (
    <div className="no-print fixed inset-0 z-50">
      <div className="modal-backdrop absolute inset-0" onClick={closeModal} />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          id="support-modal"
          className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full animate-scale-in"
        >
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Support Us</h3>
              <Button variant="ghost" size="sm" onClick={closeModal} className="p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* QR Code and Call to Action */}
            <div className="text-center space-y-6">
              <div className="w-48 h-48 mx-auto bg-white border-2 border-black rounded-lg flex items-center justify-center shadow-md">
                <img
                  src="/placeholder.svg"
                  alt="Support QR Code"
                  className="w-40 h-40 object-contain"
                />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-black">Scan to Support Us!</p>
                <p className="text-body-small text-muted-foreground">
                  Helping us helps you — support development of more templates and features.
                </p>
                <Button
                  asChild
                  className="w-full bg-black text-white hover:bg-gray-900 transition-colors mt-2"
                >
                  <a href="https://www.buymeacoffee.com/" target="_blank" rel="noopener noreferrer">
                    Buy Me a Coffee
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
