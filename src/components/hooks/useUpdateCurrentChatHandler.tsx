import { IChat, INotification } from 'typings'
import { useAppDispatch, useAppSelector } from 'src/app'
import { updateCurrentChat } from 'src/app/slices/chatSlice'
import { setActiveRoute } from 'src/app/slices/internalRouteSlice'
import { setSideBarChatDisplay } from 'src/app/slices/appUIStateSlice'
import useMarkUserNotificationsHandler from './useMarkUserNotification'

const useUpdateCurrentChatHandler = () => {
  const dispatch = useAppDispatch()

  const sideBarChatListIsOpen = useAppSelector(
    (state) => state.appUIStateReduce.sideBarChatOpen,
  )

  const [markThisUserNotfications] = useMarkUserNotificationsHandler()

  // Update the current chat reducer
  const updateCurrentChatHandler = (chat: IChat) => {
    dispatch(setActiveRoute('chats'))

    dispatch(updateCurrentChat(chat))

    if (sideBarChatListIsOpen) {
      setTimeout(() => {
        dispatch(setSideBarChatDisplay(false))
      }, 500)
    }
  }

  const updateCurrentChatHandlerWithNotifications = (
    chat: IChat,
    notifications?: INotification[],
    thisUserNotifications?: INotification[],
  ) => {
    dispatch(setActiveRoute('chats'))

    dispatch(updateCurrentChat(chat))

    if (
      notifications &&
      thisUserNotifications &&
      thisUserNotifications.length > 0
    ) {
      markThisUserNotfications(notifications, thisUserNotifications)
    }

    if (sideBarChatListIsOpen) {
      setTimeout(() => {
        dispatch(setSideBarChatDisplay(false))
      }, 500)
    }
  }

  return { updateCurrentChatHandler, updateCurrentChatHandlerWithNotifications }
}

export default useUpdateCurrentChatHandler
