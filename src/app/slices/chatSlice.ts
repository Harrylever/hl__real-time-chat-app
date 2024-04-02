import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from '../../../typings';

interface ISliceState {
  chat: IChat;
}

const initialState: ISliceState = {
  chat: {
    _id: '',
    members: [],
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // 
    updateCurrentChat: (state: ISliceState, action: PayloadAction<ISliceState>) => {
      state.chat = action.payload.chat;
    },
  },
});

export const { updateCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;