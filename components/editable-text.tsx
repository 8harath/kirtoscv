"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface EditableTextProps {
  value: string
  onChange: (value: string) => void
  isEditing: boolean
  className?: string
  placeholder?: string
  multiline?: boolean
}

export function EditableText({
  value,
  onChange,
  isEditing,
  className,
  placeholder,
  multiline = false,
}: EditableTextProps) {
  const [isActive, setIsActive] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleClick = () => {
    if (isEditing) {
      setIsActive(true)
    }
  }

  const handleBlur = () => {
    setIsActive(false)
    onChange(localValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault()
      inputRef.current?.blur()
    }
    if (e.key === "Escape") {
      setLocalValue(value)
      inputRef.current?.blur()
    }
  }

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus()
      if (multiline) {
        const textarea = inputRef.current as HTMLTextAreaElement
        textarea.style.height = "auto"
        textarea.style.height = textarea.scrollHeight + "px"
      }
    }
  }, [isActive, multiline])

  if (!isEditing) {
    return <span className={cn(className, "block")}>{value || placeholder}</span>
  }

  if (isActive) {
    const Component = multiline ? "textarea" : "input"
    return (
      <Component
        ref={inputRef as any}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn("bg-transparent border-none outline-none resize-none w-full focus-ring", className)}
        placeholder={placeholder}
        rows={multiline ? 3 : undefined}
      />
    )
  }

  return (
    <span
      onClick={handleClick}
      className={cn(
        className,
        "block cursor-text hover:bg-muted/50 transition-colors-smooth rounded px-1 py-0.5 -mx-1 -my-0.5",
        !value && "text-muted-foreground italic",
      )}
    >
      {value || placeholder}
    </span>
  )
}
