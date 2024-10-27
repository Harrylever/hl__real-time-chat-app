import DefaultWidth from './DefaultWidth'

const Footer = () => {
  return (
    <footer className="w-full bg-mx-primary">
      <div className="w-full py-16">
        <DefaultWidth>
          <div className="w-full flex flex-col items-start justify-start px-5 gap-x-6 gap-y-10">
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <img
                  src="/svg/white-logo.svg"
                  alt="MX Logo"
                  className="w-[120px] md:w-[180px]"
                />
              </div>

              {/*  */}
              <div>
                <select
                  name="select-site-language"
                  id="select-site-language"
                  className="border border-mx-stroke focus:border-mx-stroke outline-none py-1.5 px-4 rounded-sm text-sm bg-mx-white"
                >
                  <option value="--">Select a language</option>
                  <option value="en">
                    English {'('}Default{')'}
                  </option>
                </select>
              </div>
            </div>

            {/*  */}
            <div className="w-full flex flex-row items-center justify-between">
              <div>
                <a href="#">
                  <img
                    src="/svg/x-social-icon.svg"
                    alt="X Social"
                    className="w-[17px]"
                  />
                </a>
              </div>

              <div>
                <p className="text-mx-white tracking-wide">
                  <span>{new Date().getFullYear()}</span> &copy;{' '}
                  <span>MX Chat</span>
                </p>
              </div>
            </div>
          </div>
        </DefaultWidth>
      </div>
    </footer>
  )
}

export default Footer
