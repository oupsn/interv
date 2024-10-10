import React from "react"

interface LoadingWrapperProps {
  isLoading: boolean
  text: string
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ isLoading, text }) => {
  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 bg-white opacity-80 z-50">
          <div className="flex justify-center items-center h-full flex-col gap-8">
            <div className="inline-block h-32 w-32 animate-spin rounded-full border-8 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1s_linear_infinite] border-primary"></div>
            {text && (
              <p className="text-xl font-semibold text-slate-800">{text}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LoadingWrapper
