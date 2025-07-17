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
      <div className="text-center mt-0 mb-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
        <Button
          onClick={handleSupportClick}
          variant="ghost"
          className="animate-gentle-pulse border-2 border-neutral-300 dark:border-neutral-700 shadow-lg hover:-translate-y-1 active:translate-y-2 active:shadow-none transition-all duration-150 focus-ring font-bold bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Heart className="w-4 h-4 mr-2 text-pink-500 dark:text-pink-400" />
          Support Us
        </Button>
      </div>
      <SupportModal />
    </>
  )
}
