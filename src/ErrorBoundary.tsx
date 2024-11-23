import React from 'react'
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from 'react-error-boundary'

const FallbackComponent: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <div className="w-full h-screen overflow-hidden bg-mx-white flex flex-col items-center justify-between gap-10">
      <img
        src="/svg/500-error.svg"
        alt="500 internal server error"
        width={0}
        height={0}
        className="w-[240px] md:w-[500px] h-auto mt-32"
      />

      <div className="text-center flex flex-col gap-2 max-w-[300px] sm:max-w-none mx-auto">
        <h2 className="text-mx-primary-2 text-2xl font-medium">
          Something went wrong
        </h2>
        <h1 className="text-mx-primary-2 text-2xl font-medium">@ MX Chat</h1>
        <p className="text-mx-primary-2/50 shadow-none md:shadow-sm">
          We apologize for the inconvenience. Please try again later.
        </p>
        <button
          name="error-boundary-reset-button"
          onClick={resetErrorBoundary}
          className="mt-10 rounded-sm bg-mx-primary-2 text-mx-white px-4 py-2 shadow-sm w-fit mx-auto"
        >
          Try again
        </button>
      </div>

      <img
        src="/png/road-block-vector.png"
        alt="Road block"
        width={0}
        height={0}
        className="w-full h-auto"
      />
    </div>
  )
}

interface ErrorBoundaryProps {
  fallback?: React.ComponentType<FallbackProps>
  onError?: (error: any) => void
  children: React.ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  fallback,
  onError,
  children,
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback || FallbackComponent}
      onError={
        onError ||
        ((error, errorInfo) => console.log('Error:', error, errorInfo))
      }
    >
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary
