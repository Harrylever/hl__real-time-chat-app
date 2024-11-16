import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const MobileNavigation = ({
  isOpen,
  setMobileNavOpen,
}: {
  isOpen: boolean
  setMobileNavOpen: (value: boolean) => void
}) => {
  const [height, setHeight] = useState(0)

  const navigate = useNavigate()

  const handleButtonClick = (route: string) => {
    navigate(route)
    setMobileNavOpen(!isOpen)
  }

  const calculateHeaderHeight = () => {
    const header = document.getElementById('header')
    if (header) {
      // minus header height from screen height
      // set value to height state
      setHeight(window.innerHeight - header.clientHeight)
    }
  }

  useEffect(() => {
    calculateHeaderHeight()

    window.addEventListener('resize', calculateHeaderHeight)
    return () => {
      window.removeEventListener('resize', calculateHeaderHeight)
    }
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.5 }}
          style={{ height: `${height}px` }}
          className=" w-full relative flex flex-col items-center pt-[100px] gap-6"
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileNavigation
