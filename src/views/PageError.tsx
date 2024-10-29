import React from 'react'

interface PageErrorProps {
  refetch?: () => void
}

const PageError: React.FC<PageErrorProps> = ({ refetch }) => {
  return (
    <section>
      <div>
        <p>Error on Loading</p>
        <button type="button" onClick={refetch}>
          Retry
        </button>
      </div>
    </section>
  )
}

export default PageError
