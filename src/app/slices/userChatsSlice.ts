import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChat } from '../../../typings'

interface ISliceState {
  chats: Array<IChat>
}

const initialState: ISliceState = {
  chats: [],
}

const userChatsSlice = createSlice({
  name: 'userChats',
  initialState,
  reducers: {
    // Update the current array to refetched Items
    addItem: (state: ISliceState, action: PayloadAction<ISliceState>) => {
      state.chats = action.payload.chats
    },

    // Removes Item with the certain id
    removeItem: (state: ISliceState, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((el) => el._id !== action.payload)
    },
  },
})

export const { addItem: addUserChat, removeItem: removeUserChat } =
  userChatsSlice.actions
export default userChatsSlice.reducer
