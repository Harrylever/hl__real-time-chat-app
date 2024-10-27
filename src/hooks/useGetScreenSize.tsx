import { useEffect, useState } from 'react'

const useGetScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)

  const getScreenSizeHandler = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    setScreenWidth(width)
    setScreenHeight(height)
  }

  useEffect(() => {
    // getScreenSizeHandler()
    window.addEventListener('resize', getScreenSizeHandler)

    return () => {
      window.removeEventListener('resize', getScreenSizeHandler)
    }
  }, [])

  return { screenWidth, screenHeight }
}

export default useGetScreenSize
