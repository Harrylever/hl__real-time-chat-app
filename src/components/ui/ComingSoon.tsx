const ComingSoon = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="w-fit h-fit py-2 px-4 bg-mx-primary-8 rounded-sm">
        <p className="text-xl font-semibold text-mx-primary">Coming soon...</p>
      </div>
      <p className="text-sm font-normal text-mx-grey-2">{text}</p>
    </div>
  )
}

export default ComingSoon
