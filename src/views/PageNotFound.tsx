const NotFound = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-mx-white flex flex-col items-center justify-between gap-10">
      <img
        src="/svg/400-not-found.svg"
        alt="500 internal server error"
        width={0}
        height={0}
        className="w-[240px] md:w-[500px] h-auto mt-32"
      />

      <div className="text-center flex flex-col gap-2 max-w-[300px] sm:max-w-none mx-auto">
        <h2 className="text-mx-primary-2 text-2xl font-medium">
          Page Not Found
        </h2>
        <h1 className="text-mx-primary-2 text-2xl font-medium">@ MX Chat</h1>
        <button
          name="back-to-home-reset-button"
          onClick={() => window.location.assign('/')}
          className="mt-10 rounded-sm bg-mx-primary-2 text-mx-white px-4 py-2 shadow-sm w-fit mx-auto"
        >
          Back to home
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

export default NotFound
