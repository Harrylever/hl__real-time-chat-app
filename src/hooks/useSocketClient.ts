import { useCallback, useEffect, useReducer, useState } from 'react'
import { io } from 'socket.io-client'
import { useAppDispatch } from 'src/app'
import { addMessages } from 'src/app/slices/messagesSlice'

const socket = io('http://localhost:4002', {
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
      return {
        ...state,
        isConnected: true,
        socketId: action.payload.socketId,
        email: action.payload.email,
      }
    case 'DISCONNECT':
      return { ...state, isConnected: false, socketId: null, email: null }
    default:
      return state
  }
}

const useSocketClient = () => {
  const appDispatch = useAppDispatch()
  const [state, dispatch] = useReducer(socketReducer, initialState)
  const [myEmail, setMyEmail] = useState<string | null>(null)
  const [onlinueUsers, setOnlineUsers] = useState<any[]>([])

  const handleAddUserEvent = useCallback(
    ({ id, email }: { id: string; email: string }) => {
      socket.emit('add-user-event', JSON.stringify({ email, id }))
    },
    [],
  )

  useEffect(() => {
    const handleConnect = () => {
      if (socket.id === undefined || myEmail === null) return
      dispatch({
        type: 'CONNECT',
        payload: { socketId: socket.id, email: myEmail },
      })

      handleAddUserEvent({ id: socket.id, email: myEmail })
      console.log(socket.id, myEmail)
    }

    const handleDisconnect = (reason: any, details: any) => {
      dispatch({ type: 'DISCONNECT' })
      console.log({ reason, details })
    }

    const handleAddMessage = () => {
      appDispatch(addMessages({ messages: [] }))
    }

    const handleOnlineUsers = (users: any[]) => {
      setOnlineUsers(users)
      console.log('Online users:', users)
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('add_message', handleAddMessage)
    socket.on('online_users', handleOnlineUsers)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('add_message', handleAddMessage)
      socket.on('online_users', handleOnlineUsers)
    }
  }, [appDispatch, handleAddUserEvent, myEmail])

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
    isConnected: state.isConnected,
    messages: state.messages,
    socketId: state.socketId,
    onlinueUsers,
  }
}

export default useSocketClient
