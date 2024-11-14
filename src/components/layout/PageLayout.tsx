import React from 'react'
import LoadingPlayer from '../ui/LoadingPlayer'
import { AxiosError } from 'axios'

interface PageLayoutProps {
  children: React.ReactNode
  loading: boolean
  error?: AxiosError<unknown, any> | null
  errorMessage?: string
  onRetry: () => void
}

const PageLayout: React.FC<PageLayoutProps> = ({
  onRetry,
  loading,
  children,
  error,
}) => {
  const isUnHandledError = error && error.response?.status !== 401

  return (
    <div className="w-full h-full flex-1 flex items-center justify-center">
      {loading && (
        <>
          <p>MX Chat is loading...</p>
          <LoadingPlayer />
        </>
      )}

      {isUnHandledError && (
        <div>
          <p>Something went wrong</p>
          <button name="page-loading-error-retry-button" onClick={onRetry}>
            <span>Try again</span>
          </button>
        </div>
      )}

      {!loading && !isUnHandledError && <>{children}</>}
    </div>
  )
}

export default PageLayout
