import { createContext, useState, PropsWithChildren } from "react"

interface CandidateContextProps {
  candidateName: string
  setCandidateName: (candidateName: string) => void
}

export const CandidateContext = createContext<CandidateContextProps>({
  candidateName: "",
  setCandidateName: () => {},
})

const CandidateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [candidateName, setCandidateName] = useState("")
  return (
    <CandidateContext.Provider value={{ candidateName, setCandidateName }}>
      {children}
    </CandidateContext.Provider>
  )
}

export default CandidateProvider
