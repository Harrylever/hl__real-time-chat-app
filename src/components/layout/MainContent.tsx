import React, { Fragment } from 'react'
import { IUser } from 'typings'
import { Outlet, useLocation } from 'react-router-dom'
import ChangeViewComponent from '../ui/ChangeViewComponent'

interface MainContentProps {
  user?: IUser
}

const MainContent: React.FC<MainContentProps> = ({ user }) => {
  const location = useLocation()

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default MainContent
