import { Fragment } from 'react'
import NavBar from '../ui/NavBar'
import { RouteProps } from 'typings'
import MainContent from './MainContent'
import { Toaster } from '@/components/ui/toaster'
import useUserEffect from 'src/hooks/useUserEffect'
import SideBarWrapper from '../ui/SideBarChatList/SideBarWrapper'

interface LayoutProps extends RouteProps {}

export default function Layout({ user }: LayoutProps) {
  useUserEffect()

  return (
    <Fragment>
      <div className="w-full relative">
        <SideBarWrapper user={user} />

        <div className="relative z-[20] w-full bg-mx-white shadow-md">
          <NavBar />
        </div>

        <MainContent user={user} />
      </div>

      <Toaster />
    </Fragment>
  )
}
