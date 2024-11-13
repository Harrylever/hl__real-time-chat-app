import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'src/app'

const HeroSection = () => {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.userReduce)

  return (
    <Fragment>
      <main className="h-[88vh] bg-mx-primary-9 w-full flex flex-col items-start justify-start">
        <div className="mt-10 h-[50%] bg-landing-vectors bg-no-repeat bg-contain w-full flex flex-col items-center justify-center gap-4">
          <p className="text-mx-primary font-bold text-5xl sm:text-6xl tracking-wide">
            Chatting
          </p>
          <p className=" font-bold text-3xl sm:text-5xl tracking-wide">
            Made Easy
          </p>
        </div>

        <div className="h-[50%] w-full relative">
          <div className="relative">
            <button
              name="get-started-btn"
              onClick={() => navigate(user ? '/app' : '/auth/register')}
              className="absolute z-[1000] -translate-x-1/2 left-1/2 -top-3 sm:-top-10 bg-mx-primary text-mx-white rounded-sm py-3 px-7 cursor-pointer"
            >
              <span>Get Started</span>
            </button>
          </div>

          <img
            src="/png/bg-vectors.png"
            alt="Placement MX_1"
            className="block sm:hidden w-full absolute top-10 -translate-x-1/2 left-1/2 rotate-180"
          />

          <img
            src="/png/bg-placement.png"
            alt="Placement MX_1"
            className="w-[90%] sm:w-[80%] absolute bottom-0 -translate-x-1/2 left-1/2"
          />
        </div>
      </main>

      {/* Static */}
      <div className="w-full">
        <img
          src="/png/static-marquee.png"
          alt="MX Chat"
          width={0}
          height={0}
          className="w-full h-auto"
        />
      </div>
    </Fragment>
  )
}

export default HeroSection
