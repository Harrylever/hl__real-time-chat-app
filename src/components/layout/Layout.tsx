import useUserEffect from 'src/hooks/useUserEffect'
import Header from '../ui/Header/index'
import { Outlet } from 'react-router-dom'
import LoadingPlayer from '../ui/LoadingPlayer'

export default function Layout() {
  const { loading } = useUserEffect()

  return loading ? (
    <LoadingPlayer />
  ) : (
    <section className="w-full h-full">
      <Header />

      <div className="relative">
        <Outlet />
      </div>
    </section>
  )
}
