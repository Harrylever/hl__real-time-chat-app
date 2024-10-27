import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from '../../app'
import { addMessages } from '../../app/slices/messagesSlice'
import { IMessage, INotification, IOnlineUser } from 'typings'
import { updateOnlineUsers } from '../../app/slices/socketSlice'
import { setReduxNotifications } from '../../app/slices/notificationSlice'

const SocketClient = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.userReduce)
  const { chat: activeChat } = useAppSelector((state) => state.chatReduce)
  const allMessages = useAppSelector((state) => state.messageReduce.messages)
  const newMessage = useAppSelector((state) => state.socketReduce.newMessage)

  const [, setSocketId] = useState<string | undefined>(undefined)
  const [socket, setSocket] = useState<Socket | undefined>(undefined)

  const socketUri = import.meta.env.VITE_SOCKET_URL

  const reduxNotifications = useAppSelector(
    (state) => state.notificationReduce.notifications,
  )
  // const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers)

  useEffect(() => {
    if (user && user._id !== '') {
      const newSocket = io(socketUri)

      if (newSocket) {
        newSocket.on('connect', () => {
          setSocket(newSocket)
          setSocketId(newSocket.id)
          console.log(newSocket.id)

          // Emit Current user id
          newSocket.emit('add-new-user', user._id)
        })

        newSocket.on('disconnect', () => {
          setSocket(undefined)
          setSocketId(undefined)
          console.warn('Disconnected')
        })
      }
    }
  }, [socketUri, user])

  // Get active users
  useEffect(() => {
    if (socket) {
      const handleGetOnlineUsers = (res: IOnlineUser[]) => {
        // console.log(res)
        const onlineUsersResponse = res
        dispatch(
          updateOnlineUsers({
            onlineUsers: onlineUsersResponse,
          }),
        )
      }

      socket.on('get-online-users', handleGetOnlineUsers)

      return () => {
        if (socket) {
          socket.off('get-online-users', handleGetOnlineUsers)
        }
      }
    }
  }, [dispatch, socket])

  // Add Message
  useEffect(() => {
    if (socket) {
      if (newMessage && activeChat && user) {
        const recipientId = activeChat.members?.find((id) => id !== user._id)
        console.log({ recipientId })
        socket.emit('send-message', { ...newMessage, recipientId })
      }
    }
  }, [activeChat, newMessage, socket, user])

  // Receive message
  useEffect(() => {
    if (socket) {
      const handleGetMessage = (res: IMessage & { recipientId: string }) => {
        console.log(res)
        if (activeChat && activeChat.id !== res.chatId) return
        dispatch(addMessages({ messages: [...allMessages, res] }))
      }

      socket.on('get-message', handleGetMessage)

      return () => {
        socket.off('get-message', handleGetMessage)
      }
    }
  }, [activeChat, allMessages, dispatch, socket])

  // Receive and Handle Notifications
  useEffect(() => {
    if (socket) {
      const handleGetNotification = (res: INotification) => {
        const isChatOpen =
          (activeChat &&
            activeChat.members?.some((id) => id === res.senderId._id)) ??
          false

        if (isChatOpen) {
          let newNotifications: INotification[] = []
          const getNewNotifications = (prev: INotification[]) => {
            newNotifications = [{ ...res, isRead: true }, ...prev]
            dispatch(setReduxNotifications({ notifications: newNotifications }))
            return newNotifications
          }
          getNewNotifications(reduxNotifications)
        } else {
          let newNotifications: INotification[] = []
          const getNewNotifications = (prev: INotification[]) => {
            newNotifications = [res, ...prev]
            dispatch(setReduxNotifications({ notifications: newNotifications }))
            return newNotifications
          }
          getNewNotifications(reduxNotifications)
        }
      }

      socket.on('get-notification', handleGetNotification)

      return () => {
        socket.off('get-notification', handleGetNotification)
      }
    }
  }, [activeChat, dispatch, reduxNotifications, socket])

  return null
}

export default SocketClient
