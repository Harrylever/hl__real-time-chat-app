import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOnlineUser } from '../../../typings';

interface ISocketState {
    onlineUsers: Array<IOnlineUser>;
}

const socketInitState: ISocketState = {
  onlineUsers: []
}

const socketSlice = createSlice({
  name: 'socket',
  initialState: socketInitState,
  reducers: {
    updateOnlineUsers: (state: ISocketState, action: PayloadAction<ISocketState>) => {
      state.onlineUsers = action.payload.onlineUsers;
    }
  }
})

export const { updateOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;