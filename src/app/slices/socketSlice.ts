import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage, IOnlineUser } from '../../../typings'

interface ISocketState {
  onlineUsers?: Array<IOnlineUser>
  newMessage?: IMessage
}

const socketInitState: ISocketState = {
  onlineUsers: [],
  newMessage: undefined,
}

const socketSlice = createSlice({
  name: 'socket',
  initialState: socketInitState,
  reducers: {
    updateOnlineUsers: (
      state: ISocketState,
      action: PayloadAction<ISocketState>,
    ) => {
      state.onlineUsers = action.payload.onlineUsers
    },
  },
})

export const { updateOnlineUsers } = socketSlice.actions
export default socketSlice.reducer
