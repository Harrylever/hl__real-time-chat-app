import Header from '../ui/Header/index'
import { useAppSelector } from 'src/app'
import { Outlet } from 'react-router-dom'
import LoadingPlayer from '../ui/LoadingPlayer'
import useUserEffect from 'src/hooks/useUserEffect'
import useGetScreenSize from 'src/hooks/useGetScreenOrientation'

export default function Layout() {
  const { loading } = useUserEffect()
  const { screenOrientation } = useGetScreenSize()
  const { user } = useAppSelector((state) => state.userReduce)

  const isDesktop = screenOrientation === 'desktop'

  // If no user display header
  // if user and isDesktop display header

  return loading ? (
    <LoadingPlayer />
  ) : (
    <section className="w-full h-screen">
      {!user || (user && isDesktop) ? <Header /> : null}

      <div className={isDesktop ? 'relative' : 'h-full relative'}>
        <Outlet />
      </div>
    </section>
  )
}
