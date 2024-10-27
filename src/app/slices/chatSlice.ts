import { IChat } from '../../../typings'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISliceState {
  chat: IChat | undefined
}

const initialState: ISliceState = {
  chat: undefined,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    //
    updateCurrentChat: (state: ISliceState, action: PayloadAction<IChat>) => {
      state.chat = action.payload
    },
  },
})

export const { updateCurrentChat } = chatSlice.actions
export default chatSlice.reducer
