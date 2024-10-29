import React from 'react'
import { RouteProps } from 'typings'
import { goToLocation } from '../util/utils'
import Footer from 'src/components/ui/Footer'
import { useNavigate } from 'react-router-dom'
import { RiTwitterXFill } from 'react-icons/ri'
import FAQSection from 'src/components/ui/FAQSection'
import { MdOutlineArrowRightAlt } from 'react-icons/md'
import DefaultWidth from 'src/components/ui/DefaultWidth'
import OurFeaturesList from 'src/components/ui/OurFeaturesWrap'

interface LandingPageProps extends RouteProps {}

const LandingPage: React.FC<LandingPageProps> = ({ user }) => {
  const navigate = useNavigate()

  return (
    <section>
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
              onClick={() => goToLocation(user ? '/app' : '/register')}
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
        <img src="/png/static-marquee.png" alt="MX Chat" className="w-full" />
      </div>

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
                  *Experience the convenience of instant messaging amplified by
                  MX Chat's
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
                onClick={() => navigate('/register')}
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

      <section className="w-full h-[58vh] lg:h-[60vh] relative bg-mx-white flex items-center justify-center">
        {/* Overlay */}
        <div className="absolute top-0 z-10 bg-mx-primary w-full h-[29vh]"></div>
        <div className="relative z-20 w-full">
          <DefaultWidth>
            <div className="relative w-full bg-mx-primary-9 px-6 rounded-md pb-6 md:py-10">
              <img
                src="/png/faq-vectors.png"
                alt="FAQ"
                className="absolute z-20 -right-5 sm:right-20"
              />
              <div className="flex flex-col items-center justify-start gap-6 mx-auto max-w-[500px] pt-[20px]">
                <p className="text-mx-black font-medium text-base text-center">
                  Frequently asked questions
                </p>
                <p className=" text-mx-grey-2 font-normal text-xs text-center">
                  Clear all your confusions and reservations, ask us anything
                  and the team will provide swift responses.
                </p>

                <div className="w-full">
                  <FAQSection />
                </div>
              </div>
            </div>
          </DefaultWidth>
        </div>
      </section>

      {/* Contact us */}
      <section className=" bg-mx-primary-9 py-10">
        <DefaultWidth>
          <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:gap-5">
            <div className="w-full lg:w-1/2 min-h-[530px] sm:min-h-min bg-mx-white rounded-md py-8 px-8 relative duration-300">
              <img
                src="/png/contact-vector-0.png"
                alt="Contact Section Vector 1"
                className="absolute right-0 bottom-0"
              />

              <p className="font-medium text-mx-black text-xl">
                Find us online
              </p>

              <div className="pt-6 flex flex-col items-start justify-start gap-y-6">
                {/* Mail */}
                <div>
                  <a
                    href="mailto:info@mxchat.com"
                    className="flex flex-row items-center justify-start gap-4"
                  >
                    <img src="/svg/contact-mail-icon.svg" alt="" />
                    <p>info@mxchat.com</p>
                  </a>
                </div>

                {/* Whatsapp */}
                <div>
                  <a
                    href="tel:+2348166114977"
                    className="flex flex-row items-center justify-start gap-4"
                  >
                    <img src="/svg/contact-whatsapp-icon.svg" alt="" />
                    <p>+234 816-611-4977</p>
                  </a>
                </div>

                {/* Twitter */}
                <div>
                  <a
                    href="#"
                    className="flex flex-row items-center justify-start gap-4"
                  >
                    <RiTwitterXFill className="text-mx-black text-base" />
                    <p>MX Chat</p>
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <a
                    href="tel:+2348166114977"
                    className="flex flex-row items-center justify-start gap-4"
                  >
                    <img src="/svg/contact-phone-icon.svg" alt="" />
                    <p>+234 816-611-4977</p>
                  </a>
                </div>

                {/* Working hours */}
                <div className="flex flex-row items-start justify-start gap-4">
                  <img src="/svg/contact-work-hours-icon.svg" alt="" />
                  <p>
                    09:00 - 17:00 WAT, <br /> {'('}Monday - Friday{')'}
                  </p>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="w-full mt-14 lg:mt-0 lg:w-1/2 px-7 sm:px-14">
              <form className="w-full flex flex-col items-center justify-start gap-10">
                <p className="text-center text-xs text-mx-grey">
                  Feel free to find us virtually around the globe, we’re always
                  <br /> available to connect.
                </p>

                {/*  */}
                <div className="w-full">
                  <input
                    type="text"
                    className="border border-mx-stroke focus:border-mx-stroke outline-none bg-mx-white rounded-md placeholder:text-xs text-xs w-full py-3 px-3.5"
                    placeholder="Name"
                  />
                </div>

                {/*  */}
                <div className="w-full">
                  <input
                    type="email"
                    className="border border-mx-stroke focus:border-mx-stroke outline-none bg-mx-white rounded-md placeholder:text-xs text-xs w-full py-3 px-3.5"
                    placeholder="Email address"
                  />
                </div>

                {/*  */}
                <div className="relative w-full h-[100px] rounded-md overflow-hidden">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Type message"
                    className="border border-mx-stroke focus:border-mx-stroke outline-none bg-mx-white rounded-md placeholder:text-xs text-xs w-full h-full py-3 px-3.5"
                  ></textarea>

                  {/*  */}
                  {/* <button type="button" className="absolute bottom-0 right-0">
                    <img
                      src="/svg/send-message-icon.svg"
                      alt=""
                      className="w-[40px]"
                    />
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </DefaultWidth>
      </section>

      <Footer />
    </section>
  )
}

export default LandingPage
