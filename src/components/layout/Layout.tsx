import React from 'react'
import { useAppSelector } from 'src/app'
import NavBarComponent from '../ui/NavBar'
import { useGetScreenSize } from 'src/hooks'
import LoadingPlayer from '../ui/LoadingPlayer'
import { Toaster } from '@/components/ui/toaster'
import { useIndexQuery } from 'src/app/api/hooks'
import { Outlet, useLocation } from 'react-router-dom'
import ChangeViewComponent from '../ui/ChangeViewComponent'
import SideBarChatList from '../ui/SideBarChatList/SideBarChatList'

export default function Layout() {
  const { user } = useAppSelector((state) => state.userReduce)
  const sideBarChatListIsOpen = useAppSelector(
    (state) => state.appUIStateReduce.sideBarChatOpen,
  )

  const location = useLocation()

  const { data, error, isFetching } = useIndexQuery()
  const { screenWidth } = useGetScreenSize()

  return (
    <React.Fragment>
      {isFetching && <LoadingPlayer />}

      {!error && data && (
        <div className="w-full">
          <div className="w-full relative">
            {screenWidth < 1024 && user && sideBarChatListIsOpen && (
              <SideBarChatList user={user} />
            )}

            <div className="relative z-[20] w-full bg-mx-white shadow-md">
              <NavBarComponent />
            </div>

            {user && location.pathname === '/app' ? (
              <div className="relative h-[88vh] w-full sm:overflow-hidden z-[10] flex flex-row items-start justify-start">
                <div className="hidden lg:block max-w-[210px] h-full">
                  <ChangeViewComponent />
                </div>

                <Outlet />
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Outlet />
              </div>
            )}
          </div>
        </div>
      )}
      <Toaster />
    </React.Fragment>
  )
}
