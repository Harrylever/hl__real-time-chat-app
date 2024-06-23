import authReducer from '../slices/authSlice'
import userReducer from '../slices/userSlice'
import chatReducer from '../slices/chatSlice'
import { configureStore } from '@reduxjs/toolkit'
import socketReducer from '../slices/socketSlice'
import messageReducer from '../slices/messagesSlice'
import userChatsReducer from '../slices/userChatsSlice'
import appUIStateReducer from '../slices/appUIStateSlice'
import notificationReducer from '../slices/notificationSlice'
import internalRouteReducer from '../slices/internalRouteSlice'
import potentialChatsReducer from '../slices/potentialChatsSlice'

const store = configureStore({
  reducer: {
    authReduce: authReducer,
    userReduce: userReducer,
    userChatsReduce: userChatsReducer,
    potentialChatsReduce: potentialChatsReducer,
    chatReduce: chatReducer,
    messageReduce: messageReducer,
    appUIStateReduce: appUIStateReducer,
    socketReduce: socketReducer,
    notificationReduce: notificationReducer,
    internalRouteReduce: internalRouteReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
