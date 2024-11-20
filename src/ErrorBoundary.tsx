import React from 'react'
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from 'react-error-boundary'

const FallbackComponent: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <div className="text-center p-5">
      <h2>Something went wrong</h2>
      <p>We apologize for the inconvenience. Please try again later.</p>
      <button name="error-boundary-reset-button" onClick={resetErrorBoundary}>
        Retry
      </button>
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
