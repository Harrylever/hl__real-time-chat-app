import { useAppSelector } from 'src/app'
import DefaultWidth from '../DefaultWidth'
import { useNavigate } from 'react-router-dom'
import OurFeaturesList from '../OurFeaturesWrap'
import { MdOutlineArrowRightAlt } from 'react-icons/md'

const AboutSection = () => {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.userReduce)

  return (
    <section className="bg-mx-white w-full">
      <DefaultWidth>
        <div className="flex flex-col items-center justify-start pt-16">
          <p className="text-center italic font-semibold text-2xl">
            &ldquo;MX Chat isn't your regular chat site&rdquo;
          </p>

          <div className="pt-6">
            <p className="text-sm text-mx-grey-2">How we're different</p>
          </div>

          {/*  */}
          <div className="pt-6">
            <OurFeaturesList />
          </div>
        </div>

        <div className="flex flex-col items-center justify-start pt-16 pb-14">
          <p className="text-center italic font-semibold text-2xl">
            Key Points
          </p>

          <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-6 pt-6 lg:pt-10">
            <div className="w-full lg:w-1/2 sm:pl-10 lg:pt-10 pr-1">
              <img
                src="/png/mxchat-pc.png"
                alt=""
                className="w-[80%] md:w-full max-w-[425px] mx-auto"
              />
            </div>
            <div className="w-full max-w-[850px] lg:w-1/2 flex flex-col space-y-4 text-justify px-5">
              <p className="font-normal text-mx-black text-sm">
                *Experience the future of messaging with MX Chat, where{' '}
                <span className="text-mx-primary-3 font-semibold">
                  real-time communication is not just a luxury but a standard.
                </span>
              </p>
              <p className="font-normal text-mx-black text-sm">
                *With MX Chat, you can effortlessly message anyone, anywhere
                around the world,{' '}
                <span className="text-mx-primary-3 font-semibold">
                  bridging geographic distances and fostering global
                  connections.
                </span>
              </p>
              <p className="font-normal text-mx-black text-sm">
                *Stay connected,{' '}
                <span className="text-mx-primary-3 font-semibold">
                  communicate in real-time,
                </span>{' '}
                and cultivate meaningful interactions across borders, all at
                your fingertips.
              </p>
              <p className="font-normal text-mx-black text-sm">
                *Experience the convenience of instant messaging amplified by MX
                Chat's
                <span className="text-mx-primary-3 font-semibold">
                  user-friendly interface and robust features
                </span>
                designed to enhance your communication experience.
              </p>
              <p className="font-normal text-mx-black text-sm">
                *Chatting made easy.
                <span className="text-mx-primary-3 font-semibold">
                  Message privately or join groups seamlessly
                </span>
                with MX Chat.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start pt-16 pb-14 gap-5">
          <p className="text-center text-mx-black text-sm">
            Start chatting now! MX Chat today and experience private, secure
            messaging!
          </p>
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              name="get-started-button"
              onClick={() => navigate(user ? '/app' : '/auth/register')}
              className="w-full sm:w-fit rounded-lg bg-mx-primary text-mx-white py-3 sm:px-24"
            >
              <p className="flex items-center justify-center gap-4 font-semibold text-xs sm:text-base">
                Get Started Now <MdOutlineArrowRightAlt className="text-xl" />
              </p>
            </button>
          </div>
        </div>
      </DefaultWidth>
    </section>
  )
}

export default AboutSection
