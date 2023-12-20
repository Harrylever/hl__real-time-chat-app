import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from '../../../typings';

const initAuthState: IAuthState | undefined = {
  email: '',
  _id: '',
  access: '',
  refresh: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState,
  reducers: {
    setToken: (
      state: IAuthState | undefined,
      action: PayloadAction<IAuthState>
    ) => {
        state!._id = action.payload._id;
        state!.email = action.payload.email;
        state!.access = action.payload.access;
        state!.refresh = action.payload.refresh;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
