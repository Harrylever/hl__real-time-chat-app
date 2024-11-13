import { useNavigate } from 'react-router-dom'

const MobileNavigation = ({
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
        onClick={() => handleButtonClick('auth/login')}
        className="group border border-blue-3 hover:bg-indigo-600 duration-500 rounded-sm py-2.5 px-16"
      >
        <p className="text-mx-primary group-hover:text-mx-white font-semibold text-sm tracking-tight">
          'Log in'
        </p>
      </button>

      {/*  */}
      <button
        type="button"
        onClick={() => handleButtonClick('auth/register')}
        className="group border border-blue-3 bg-indigo-600 duration-500 rounded-sm py-2.5 px-16"
      >
        <p className="text-mx-white font-semibold text-sm tracking-tight">
          Sign up
        </p>
      </button>
    </div>
  ) : null
}

export default MobileNavigation
