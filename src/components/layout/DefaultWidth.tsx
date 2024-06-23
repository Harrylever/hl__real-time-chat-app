const DefaultWidth = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 xl:px-0">{children}</div>
  )
}

export default DefaultWidth
