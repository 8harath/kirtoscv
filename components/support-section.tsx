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
          className="animate-gentle-pulse border-4 border-black shadow-[0_6px_0_0_#222,0_8px_16px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 active:translate-y-2 active:shadow-none transition-all duration-150 focus-ring text-foreground hover:text-foreground bg-white font-bold"
        >
          <Heart className="w-4 h-4 mr-2" />
          Support Us
        </Button>
      </div>
      <SupportModal />
    </>
  )
}
