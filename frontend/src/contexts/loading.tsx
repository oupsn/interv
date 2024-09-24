import LoadingWrapper from "@/components/shared/LoadingWrapper"
import React, { createContext, PropsWithChildren, useState } from "react"

interface LoadingContextProps {
  isLoading: boolean
  setLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  setLoading: () => {},
})

const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      <LoadingWrapper isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
