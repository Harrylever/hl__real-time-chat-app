import axios from 'axios'
import { IUser } from 'typings'
import { useAppSelector } from 'src/app'
import { Outlet, useLocation } from 'react-router-dom'
import { LoadingPlayer } from 'src/components/ui'
import { Toaster } from '@/components/ui/toaster'
import React, { useEffect, useState } from 'react'
import { useGetScreenSize } from 'src/components/hooks'
import { ChangeViewComponent } from 'src/components/molecules'
import { NavBarComponent, SideBarChatList } from 'src/components/features'

export default function Layout() {
  const user = useAppSelector((state) => state.userReduce)
  const sideBarChatListIsOpen = useAppSelector(
    (state) => state.appUIStateReduce.sideBarChatOpen,
  )

  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [localUser, setLocalUser] = useState<IUser | undefined>(undefined)

  useEffect(() => {
    if (user && user._id !== '') {
      setLocalUser(user)
    }
  }, [user])

  useEffect(() => {
    ;(async () => {
      const handleGetAPIIndex = async () => {
        const BASE_URL = import.meta.env.VITE_BE_URL
        const fetch = await axios.get(BASE_URL)
        return fetch.data
      }

      const response = await handleGetAPIIndex()
      if (response.success) {
        setIsLoading(false)
      }
    })()
  }, [])

  const [screenWidth] = useGetScreenSize()

  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingPlayer />
      ) : (
        <div className="w-full">
          <div className="w-full relative">
            {/*  */}
            {screenWidth < 1024 && user && sideBarChatListIsOpen && (
              <SideBarChatList />
            )}

            <div className="relative z-[20] w-full bg-mx-white shadow-md">
              {/* Nav Bar */}
              <NavBarComponent props={{ user: localUser }} />
            </div>

            {localUser && location.pathname === '/app' ? (
              <div className="relative h-[88vh] w-full sm:overflow-hidden z-[10] flex flex-row items-start justify-start">
                {/*  */}
                <div className="hidden lg:block max-w-[210px] h-full">
                  <ChangeViewComponent />
                </div>

                {/*  */}
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

      {/*  */}
      <Toaster />
    </React.Fragment>
  )
}
