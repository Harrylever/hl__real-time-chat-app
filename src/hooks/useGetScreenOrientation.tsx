import { useEffect, useState } from 'react'

type ScreenOrientation = 'mobile' | 'desktop'

const useGetScreenOrientation = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [screenOrientation, setScreenOrientation] =
    useState<ScreenOrientation>('desktop')

  const getScreenSizeHandler = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    setScreenWidth(width)
    setScreenHeight(height)

    if (width > 1023) {
      setScreenOrientation('desktop')
    } else {
      setScreenOrientation('mobile')
    }
  }

  useEffect(() => {
    getScreenSizeHandler()
    window.addEventListener('resize', getScreenSizeHandler)

    return () => {
      window.removeEventListener('resize', getScreenSizeHandler)
    }
  }, [])

  return { screenWidth, screenHeight, screenOrientation }
}

export default useGetScreenOrientation
