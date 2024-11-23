import { useCallback, useEffect, useReducer, useState } from 'react'
import { debounce } from 'lodash'
import { IPlainMessage } from 'typings'
import { io } from 'socket.io-client'
import { BASE_URL } from 'src/config'
import { useAppDispatch, useAppSelector } from 'src/app'
import { addMessages } from 'src/app/slices/messagesSlice'
import { updateOnlineUsers } from 'src/app/slices/socketSlice'

const socket = io(BASE_URL, {
  autoConnect: false,
})

interface SocketContext {
  isConnected: boolean
  socketId: string | null
  email: string | null
  messages: string[]
}

const initialState: SocketContext = {
  isConnected: false,
  socketId: null,
  email: null,
  messages: [],
}

type SocketAction =
  | { type: 'CONNECT'; payload: { socketId: string; email: string } }
  | { type: 'DISCONNECT' }

const socketReducer = (
  state: SocketContext,
  action: SocketAction,
): SocketContext => {
  switch (action.type) {
    case 'CONNECT':
      console.info('Connected')
      return {
        ...state,
        isConnected: true,
        socketId: action.payload.socketId,
        email: action.payload.email,
      }
    case 'DISCONNECT':
      console.warn('Disconnected')
      return { ...state, isConnected: false, socketId: null, email: null }
    default:
      return state
  }
}

const useSocketClient = () => {
  const appDispatch = useAppDispatch()
  const [state, dispatch] = useReducer(socketReducer, initialState)
  const [myEmail, setMyEmail] = useState<string | null>(null)
  const { messages: existingMessages } = useAppSelector(
    (state) => state.messageReduce,
  )

  const handleAddUserEvent = useCallback(
    ({ id, email }: { id: string; email: string }) => {
      socket.emit('add-user-event', JSON.stringify({ email, id }))
    },
    [],
  )

  const handleSendMessage = useCallback((message: IPlainMessage) => {
    if (!socket.connected) {
      socket.connect()
      handleSendMessage(message)
      return
    }

    socket.emit('send-message-event', JSON.stringify(message))
  }, [])

  useEffect(() => {
    const handleConnect = () => {
      if (!socket.id || !myEmail) return
      dispatch({
        type: 'CONNECT',
        payload: { socketId: socket.id, email: myEmail },
      })

      handleAddUserEvent({ id: socket.id, email: myEmail })
    }

    const handleDisconnect = (reason: any, details: any) => {
      dispatch({ type: 'DISCONNECT' })
      console.warn({ reason, details })
    }

    const handleOnlineUsers = (users: any[]) => {
      appDispatch(
        updateOnlineUsers({
          onlineUsers: users,
        }),
      )
    }

    const handleIncomingMessage = debounce(async (message: string) => {
      const parsedMessage = JSON.parse(message) as IPlainMessage
      const combinedMessages = [...existingMessages, parsedMessage]
      appDispatch(addMessages(combinedMessages))
    }, 100)

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('online_users', handleOnlineUsers)
    socket.on('incoming_message', handleIncomingMessage)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('online_users', handleOnlineUsers)
      socket.off('incoming_message', handleIncomingMessage)
    }
  }, [appDispatch, existingMessages, handleAddUserEvent, myEmail])

  const handleConnect = useCallback(
    (email: string) => {
      if (state.isConnected) return
      socket.connect()
      setMyEmail(email)
    },
    [state.isConnected],
  )

  const handleDisconnect = () => {
    if (!state.isConnected) return
    socket.disconnect()
  }

  return {
    handleConnect,
    handleDisconnect,
    handleAddUserEvent,
    handleSendMessage,
    isConnected: state.isConnected,
    messages: state.messages,
    socketId: state.socketId,
  }
}

export default useSocketClient
