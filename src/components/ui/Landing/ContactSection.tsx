import DefaultWidth from '../DefaultWidth'
import { RiTwitterXFill } from 'react-icons/ri'

const ContactSection = () => {
  return (
    <section className=" bg-mx-primary-9 py-10">
      <DefaultWidth>
        <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:gap-5">
          <div className="w-full lg:w-1/2 min-h-[530px] sm:min-h-min bg-mx-white rounded-md py-8 px-8 relative duration-300">
            <img
              src="/png/contact-vector-0.png"
              alt="Contact Section Vector 1"
              className="absolute right-0 bottom-0"
            />

            <p className="font-medium text-mx-black text-xl">Find us online</p>

            <div className="pt-6 flex flex-col items-start justify-start gap-y-6">
              {/* Mail */}
              <div>
                <a
                  href="mailto:info@mxchat.app"
                  className="flex flex-row items-center justify-start gap-4"
                >
                  <img src="/svg/contact-mail-icon.svg" alt="" />
                  <p>info@mxchat.app</p>
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
  )
}

export default ContactSection
