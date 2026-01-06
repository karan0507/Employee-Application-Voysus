"use client"

import { useEffect, useRef } from "react"
import { toast } from "sonner"

export function useAutoSave(callback: () => void, interval = 30000) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
      toast.success("Progress saved", { duration: 1500 })
    }

    const id = setInterval(tick, interval)
    return () => clearInterval(id)
  }, [interval])
}
