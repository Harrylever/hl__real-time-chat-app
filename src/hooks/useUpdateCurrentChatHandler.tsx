// import { IChat, INotification } from 'typings'
// import { useAppDispatch, useAppSelector } from 'src/app'
// import { updateCurrentChat } from 'src/app/slices/chatSlice'
// import { setActiveRoute } from 'src/app/slices/internalRouteSlice'
// import { setSideBarChatDisplay } from 'src/app/slices/appUIStateSlice'
// import useMarkUserNotificationsHandler from './useMarkUserNotification'

// const useUpdateCurrentChatHandler = () => {
//   const dispatch = useAppDispatch()

//   const sideBarChatListIsOpen = useAppSelector(
//     (state) => state.appUIStateReduce.sideBarChatOpen,
//   )

//   const [markThisUserNotfications] = useMarkUserNotificationsHandler()

//   // Update the current chat reducer
//   const updateCurrentChatHandler = (chat: IChat) => {
//     dispatch(updateCurrentChat(chat))
//   }

//   const updateCurrentChatHandlerWithNotifications = (
//     chat: IChat,
//     notifications?: INotification[],
//     thisUserNotifications?: INotification[],
//   ) => {
//     dispatch(setActiveRoute('chats'))
//     dispatch(updateCurrentChat(chat))
//   }

//   return { updateCurrentChatHandler, updateCurrentChatHandlerWithNotifications }
// }

// export default useUpdateCurrentChatHandler
