import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { INavBarProps, IUser } from 'typings'
import { LgMenuComponent } from '../molecules'
import { Fade as Hamburger } from 'hamburger-react'
import { useAppDispatch, useAppSelector } from 'src/app'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { setSideBarChatDisplay } from 'src/app/slices/appUIStateSlice'

const NavBar: React.FC<{ props: INavBarProps }> = ({ props: { user } }) => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  const [route, setRoute] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [localUser, setLocalUser] = useState<IUser>({})
  const [isScrollEnabled, setIsScrollEnabled] = useState(true)
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)

  useEffect(() => {
    // Set Route
    setRoute(location.pathname)

    // Update user details in state
    if (user && user._id !== '') {
      setLocalUser(user)
      setUserExists(true)
    } else {
      setLocalUser({})
      setUserExists(false)
    }
    // Don't add the logOut variable as a dependency
  }, [location, user])

  const sideBarChatDisplay = useAppSelector(
    (state) => state.appUIStateReduce.sideBarChatOpen,
  )

  const handleSetSideBarChatListDisplay = (value: boolean) => {
    dispatch(setSideBarChatDisplay(value))
  }

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
    if (mobileNavIsOpen) {
      setIsScrollEnabled(false)
    } else {
      setIsScrollEnabled(true)
    }
  }, [mobileNavIsOpen])

  return (
    <header
      className={clsx([
        'w-full',
        {
          'h-screen': mobileNavIsOpen,
        },
      ])}
    >
      <nav className="py-6 h-[11.6%] sm:h-[12vh] w-full flex flex-row items-center justify-between md:justify-center bg-transparent">
        <div className="w-full px-5 sm:px-12 flex items-center justify-center">
          <div className="w-full flex items-center justify-between">
            <Link to={userExists ? '#' : '/'}>
              <div className="flex items-center">
                <img
                  src="/svg/mxchat-new-logo.svg"
                  alt="MX Chat Company Logo"
                  className="w-[120px] md:w-[210px]"
                />
              </div>
            </Link>

            {/* Desktop Menu Button */}
            <div className="hidden lg:block">
              {userExists ? (
                <LgMenuComponent localUser={localUser} />
              ) : (
                <Link to={route === '/login' ? '/register' : '/login'}>
                  <div className="group border border-blue-3 hover:bg-indigo-600 duration-500 rounded-sm py-2.5 px-16">
                    <p className="text-mx-primary group-hover:text-mx-white font-semibold text-sm tracking-tight">
                      {route === '/login' ? 'Sign up' : 'Log in'}
                    </p>
                  </div>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="block lg:hidden">
              {userExists ? (
                <>
                  <Hamburger
                    size={28}
                    toggled={sideBarChatDisplay}
                    onToggle={handleSetSideBarChatListDisplay}
                  />
                </>
              ) : (
                <div className="sm:pt-2">
                  {/*  */}
                  <div className="hidden sm:block pb-3 pt-4">
                    <Link to={route === '/login' ? '/register' : '/login'}>
                      <div className="group border border-blue-3 hover:bg-indigo-600 duration-500 rounded-sm py-2.5 px-16">
                        <p className="text-mx-primary group-hover:text-mx-white font-semibold text-sm tracking-tight">
                          {route === '/login' ? 'Sign up' : 'Log in'}
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/*  */}
                  <div className="sm:hidden">
                    <Hamburger
                      size={28}
                      toggled={mobileNavIsOpen}
                      toggle={setMobileNavIsOpen}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/*  */}
      <MobileNav
        isOpen={mobileNavIsOpen}
        setMobileNavOpen={(value) => setMobileNavIsOpen(value)}
      />
    </header>
  )
}

const MobileNav = ({
  isOpen,
  setMobileNavOpen,
}: {
  isOpen: boolean
  setMobileNavOpen: (value: boolean) => void
}) => {
  const navigate = useNavigate()

  const handleButtonClick = (route: string) => {
    navigate(route)
    setMobileNavOpen(!isOpen)
  }

  return isOpen ? (
    <div className=" w-full h-[88.4%] relative flex flex-col items-center pt-[100px] gap-6">
      <button
        type="button"
        onClick={() => handleButtonClick('/login')}
        className="group border border-blue-3 hover:bg-indigo-600 duration-500 rounded-sm py-2.5 px-16"
      >
        <p className="text-mx-primary group-hover:text-mx-white font-semibold text-sm tracking-tight">
          'Log in'
        </p>
      </button>

      {/*  */}
      <button
        type="button"
        onClick={() => handleButtonClick('/register')}
        className="group border border-blue-3 bg-indigo-600 duration-500 rounded-sm py-2.5 px-16"
      >
        <p className="text-mx-white font-semibold text-sm tracking-tight">
          Sign up
        </p>
      </button>
    </div>
  ) : null
}

export default NavBar
