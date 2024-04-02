import { configureStore } from '@reduxjs/toolkit';
import { authApiSlice } from '../slices/authApiSlice';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import userChatsReducer from '../slices/userChatsSlice';
import potentialChatsReducer from '../slices/potentialChatsSlice';
import chatReducer from '../slices/chatSlice';
import messageReducer from '../slices/messagesSlice';
import appUIStateReducer from '../slices/appUIStateSlice';
import socketReducer from '../slices/socketSlice';

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
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
