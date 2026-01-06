"use client"

import { useEffect } from "react"
import { toast } from "sonner"

export function useAntiCheat() {
  useEffect(() => {
    const preventCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault()
      toast.error("This action is disabled for security purposes")
    }

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Prevent Ctrl/Cmd + C, V, X (but allow Ctrl/Cmd + A for select all)
      if ((e.ctrlKey || e.metaKey) && ["c", "v", "x"].includes(e.key.toLowerCase())) {
        e.preventDefault()
        toast.error("This action is disabled")
      }
    }

    document.addEventListener("copy", preventCopyPaste)
    document.addEventListener("cut", preventCopyPaste)
    document.addEventListener("paste", preventCopyPaste)
    document.addEventListener("contextmenu", preventContextMenu)
    document.addEventListener("keydown", preventKeyboardShortcuts)

    return () => {
      document.removeEventListener("copy", preventCopyPaste)
      document.removeEventListener("cut", preventCopyPaste)
      document.removeEventListener("paste", preventCopyPaste)
      document.removeEventListener("contextmenu", preventContextMenu)
      document.removeEventListener("keydown", preventKeyboardShortcuts)
    }
  }, [])
}
