import { createSlice, PayloadAction} from '@reduxjs/toolkit'

interface AppUIState {
    sideBarChatOpen: boolean;
}

const appUIInitState: AppUIState = {
  sideBarChatOpen: false,
}

const appUIStateSlice = createSlice({
  name: 'appUI',
  initialState: appUIInitState,
  reducers: {
    setSideBarChatDisplay: (state: AppUIState, action: PayloadAction<AppUIState>) => {
      state.sideBarChatOpen = action.payload.sideBarChatOpen
    }
  }
})

export const { setSideBarChatDisplay } = appUIStateSlice.actions;
export default appUIStateSlice.reducer;