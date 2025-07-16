"use client"

import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/app-context"
import { Heart } from "lucide-react"
import { SupportModal } from "./support-modal"

export function SupportSection() {
  const { dispatch } = useAppContext()

  const handleSupportClick = () => {
    dispatch({ type: "TOGGLE_SUPPORT_MODAL" })
  }

  return (
    <>
      <div className="text-center mt-24 mb-16 animate-fade-in mb-32" style={{ animationDelay: "0.8s" }}>
        <Button
          onClick={handleSupportClick}
          variant="ghost"
          className="animate-gentle-pulse hover:scale-105 transition-all duration-300 focus-ring text-foreground hover:text-foreground"
        >
          <Heart className="w-4 h-4 mr-2" />
          Support Us
        </Button>
      </div>
      <SupportModal />
    </>
  )
}
