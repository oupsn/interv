import LoadingWrapper from "@/components/shared/LoadingWrapper"
import React, { createContext, PropsWithChildren, useState } from "react"

interface LoadingContextProps {
  isLoading: boolean
  text: string
  isTransparent: boolean
  setLoading: (isLoading: boolean) => void
  setTransparent: (isTransparent: boolean) => void
  setText: (text: string) => void
}

export const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  text: "",
  isTransparent: true,
  setLoading: () => {},
  setTransparent: () => {},
  setText: () => {},
})

const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setTextState] = useState("")
  const [isTransparent, setIsTransparent] = useState(true)
  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading)
  }

  const setText = (text: string) => {
    setTextState(text)
  }

  const setTransparent = (isTransparent: boolean) => {
    setIsTransparent(isTransparent)
  }

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading,
        text,
        setText,
        isTransparent,
        setTransparent,
      }}
    >
      <LoadingWrapper
        isLoading={isLoading}
        text={text}
        isTransparent={isTransparent}
      />
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
