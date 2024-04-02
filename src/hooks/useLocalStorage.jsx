import { useEffect, useState } from "react"

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(key)
        setStoredValue(item ? JSON.parse(item) : initialValue)
      } catch (error) {
        console.warn(error)
        setStoredValue(initialValue)
      }
    }
  }, [key, initialValue])

  const setValue = (value) => {
    try {
      const ValueToStore = 
      typeof value === "function" ? value(storedValue) : value
      setStoredValue(ValueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(ValueToStore))
      }
    } catch (error) {
      console.warn(error)
    }
  }
  return [storedValue, setValue]
}