import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TInsideView = 'chats' | 'groups' | 'settings' | 'logout'

interface AppUIState {
  sideBarChatOpen?: boolean
  potentialChatsModalIsOpen?: boolean
}

const appUIInitState: AppUIState = {
  sideBarChatOpen: false,
  potentialChatsModalIsOpen: false,
}

const appUIStateSlice = createSlice({
  name: 'appUI',
  initialState: appUIInitState,
  reducers: {
    setSideBarChatDisplay: (
      state: AppUIState,
      action: PayloadAction<boolean>,
    ) => {
      state.sideBarChatOpen = action.payload
    },
    setPotentialChatsModalIsOpen: (
      state: AppUIState,
      action: PayloadAction<boolean>,
    ) => {
      state.potentialChatsModalIsOpen = action.payload
    },
  },
})

export const { setSideBarChatDisplay, setPotentialChatsModalIsOpen } =
  appUIStateSlice.actions
export default appUIStateSlice.reducer
