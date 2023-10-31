import { configureStore } from '@reduxjs/toolkit';
import { authApiSlice } from '../slices/authApiSlice';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    authReduce: authReducer, 
    userReduce: userReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;