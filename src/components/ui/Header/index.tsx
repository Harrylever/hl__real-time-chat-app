import { useEffect, useState } from 'react'
import { useAppSelector } from 'src/app'
import NotificationMenu from './NotificationMenu'
import { Fade as Hamburger } from 'hamburger-react'
import { useLocation, Link } from 'react-router-dom'
import MobileNavigation from './MobileNavigation'

const Header = () => {
  const location = useLocation()

  const { user } = useAppSelector((state) => state.userReduce)

  const [isScrollEnabled, setIsScrollEnabled] = useState(true)
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)

  useEffect(() => {
    if (!isScrollEnabled) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isScrollEnabled])

  useEffect(() => {
    setIsScrollEnabled(mobileNavIsOpen ? false : true)
  }, [mobileNavIsOpen, user])

  const isLoginPage = location.pathname === '/auth/login'

  return (
    <>
      <header
        id="header"
        className="relative z-[20] w-full bg-mx-white shadow-md"
      >
        <nav className=" py-6 h-[12vh] w-full flex flex-row items-center justify-between md:justify-center bg-transparent">
          <div className="w-full px-5 sm:px-12 flex items-center justify-center">
            <div className="w-full flex items-center justify-between">
              <Link to={user ? '#' : '/'}>
                <div className="flex items-center">
                  <img
                    src="/svg/mxchat-new-logo.svg"
                    alt="MX Chat Company Logo"
                    className="relative w-[120px] md:w-[210px]"
                    width={0}
                    height={0}
                  />
                </div>
              </Link>

              {/* Desktop Menu Button */}
              <div className="hidden lg:block">
                {user ? (
                  <NotificationMenu />
                ) : (
                  <Link to={isLoginPage ? 'auth/register' : 'auth/login'}>
                    <div className="group border border-blue-3 hover:bg-indigo-600 duration-500 rounded-sm py-2.5 px-16">
                      <p className="text-mx-primary group-hover:text-mx-white font-semibold text-sm tracking-tight">
                        {isLoginPage ? 'Sign up' : 'Log in'}
                      </p>
                    </div>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="block lg:hidden">
                <div className="sm:pt-2">
                  <div className="hidden sm:block pb-3 pt-4">
                    <Link to={isLoginPage ? 'auth/register' : 'auth/login'}>
                      <div className="group border border-blue-3 hover:bg-indigo-600 duration-500 rounded-sm py-2.5 px-16">
                        <p className="text-mx-primary group-hover:text-mx-white font-semibold text-sm tracking-tight">
                          {isLoginPage ? 'Sign up' : 'Log in'}
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="sm:hidden">
                    <Hamburger
                      size={28}
                      toggled={mobileNavIsOpen}
                      toggle={setMobileNavIsOpen}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <MobileNavigation
        isOpen={mobileNavIsOpen}
        setMobileNavOpen={setMobileNavIsOpen}
      />
    </>
  )
}

export default Header
