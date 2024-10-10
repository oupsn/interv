import LoadingWrapper from "@/components/shared/LoadingWrapper"
import React, { createContext, PropsWithChildren, useState } from "react"

interface LoadingContextProps {
  isLoading: boolean
  text: string
  setLoading: (isLoading: boolean) => void
  setText: (text: string) => void
}

export const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  text: "",
  setLoading: () => {},
  setText: () => {},
})

const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setTextState] = useState("")
  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading)
  }

  const setText = (text: string) => {
    setTextState(text)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, text, setText }}>
      <LoadingWrapper isLoading={isLoading} text={text} />
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
