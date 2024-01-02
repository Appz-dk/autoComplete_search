import { useEffect, useState } from "react";
import { getAutoCompleteResults } from "../api/getAutoCompleteResults";
import { useDebouncedValue } from "./useDebouncedValue";

export const useAutoCompleteSearch = () => {
  const [filterValue, setFilterValue] = useState<string>("")
  const [suggestions, setSuggestions] = useState<string[] | null>()
  const [error, setError] = useState<string | null>()
  const [isLoading, setIsLoading] = useState(false)

  const { debouncedValue } = useDebouncedValue(filterValue)

  
  useEffect(() => {
    setError(null)
    setSuggestions(null)
    setIsLoading(false)
    
    if (!debouncedValue) {
      return
    }
    
    setIsLoading(true)
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      const res = await getAutoCompleteResults(debouncedValue, signal)
      setSuggestions(res?.data || null)
      setError(res?.error || null)

      if (!signal.aborted) {
        setIsLoading(false)
      }
    })()
      
    return () => {
      controller.abort()
    }

  }, [debouncedValue])

  return {
    setFilterValue,
    filterValue,
    suggestions,
    isLoading,
    error
  }
}