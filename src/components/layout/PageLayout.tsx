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
        <div className="w-full h-screen overflow-hidden bg-mx-white flex flex-col items-center justify-between gap-10">
          <div className="text-center flex flex-col gap-2 max-w-[300px] sm:max-w-none mx-auto mt-32">
            <h2 className="text-mx-primary-2 text-2xl font-medium">
              Something went wrong
            </h2>
            <h1 className="text-mx-primary-2 text-2xl font-medium">
              @ MX Chat
            </h1>
            <p className="text-mx-primary-2/50 shadow-none md:shadow-sm">
              We apologize for the inconvenience. Please try again later.
            </p>
            <button
              name="error-boundary-reset-button"
              onClick={onRetry}
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
      )}

      {!loading && !isUnHandledError && <>{children}</>}
    </div>
  )
}

export default PageLayout
