import { useEffect, useState } from "react"

export const useDebouncedValue = <T>(value: T, delay: number = 500): { debouncedValue: T } => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value])

  return {
    debouncedValue
  }
}