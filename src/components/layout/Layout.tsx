import PageLayout from './PageLayout'
import Header from '../ui/Header/index'
import { useAppSelector } from 'src/app'
import { Outlet } from 'react-router-dom'
import useUserEffect from 'src/hooks/useUserEffect'
import useGetScreenSize from 'src/hooks/useGetScreenOrientation'

export default function Layout() {
  const { loading, error, retry } = useUserEffect()
  const { screenOrientation } = useGetScreenSize()
  const { user } = useAppSelector((state) => state.userReduce)

  const isDesktop = screenOrientation === 'desktop'

  return (
    <PageLayout loading={loading} error={error} onRetry={() => retry()}>
      <section className="w-full h-screen">
        {!user || (user && isDesktop) ? <Header /> : null}

        <div className={isDesktop ? 'relative' : 'h-full relative'}>
          <Outlet />
        </div>
      </section>
    </PageLayout>
  )
}
