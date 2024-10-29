import { IUser } from 'typings'
import React, { Fragment } from 'react'
import { useAppSelector } from 'src/app'
import { useGetScreenSize } from 'src/hooks'
import SideBarChatList from './SideBarChatList'

interface SideBarWrapperProps {
  user?: IUser
}

const SideBarWrapper: React.FC<SideBarWrapperProps> = ({ user }) => {
  const { screenWidth } = useGetScreenSize()
  const sideBarChatListIsOpen = useAppSelector(
    (state) => state.appUIStateReduce.sideBarChatOpen,
  )

  return (
    <Fragment>
      {screenWidth < 1024 && user && sideBarChatListIsOpen && (
        <SideBarChatList user={user} />
      )}
    </Fragment>
  )
}

export default SideBarWrapper
