import { useEffect, useState } from "react"

export default function useIsFocused() {
  const [isFocused, setIsFocused] = useState(false)
  useEffect(() => {
    setIsFocused(true)
  }, [])
  return isFocused
}
