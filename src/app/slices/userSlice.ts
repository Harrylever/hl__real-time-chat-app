import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../typings';

const initState: IUser = {
  _id: '',
  username: '',
  fullname: '',
  email: '',
  imgUri: '',
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initState,
  reducers: {
    setUser: (state: IUser, action: PayloadAction<IUser>) => {
      (state._id = action.payload._id),
      (state.username = action.payload.username),
      (state.fullname = action.payload.fullname),
      (state.email = action.payload.email);
      (state.imgUri = action.payload.imgUri);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;