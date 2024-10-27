import { IUser } from '../../../typings'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISliceState {
  users: IUser[]
}

const initialState: ISliceState = {
  users: [],
}

const potentialChatsSlice = createSlice({
  name: 'potentialChats',
  initialState,
  reducers: {
    // Update the current array to refetched Items
    addItem: (state: ISliceState, action: PayloadAction<ISliceState>) => {
      state.users = action.payload.users
    },

    // Removes Item with the certain id
    removeItem: (state: ISliceState, action: PayloadAction<string>) => {
      state.users = state.users.filter((el) => el._id !== action.payload)
    },
  },
})

export const { addItem: addPotentialChat, removeItem: removePotentialChat } =
  potentialChatsSlice.actions
export default potentialChatsSlice.reducer
