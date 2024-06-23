import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InternalRoute, TRoute } from '../../../typings'

const initState: InternalRoute = {
  active: 'chats',
}

const internalRouteSlice = createSlice({
  name: 'internalRouteSlice',
  initialState: initState,
  reducers: {
    setActiveRoute: (state: InternalRoute, action: PayloadAction<TRoute>) => {
      state.active = action.payload
    },
  },
})

export const { setActiveRoute } = internalRouteSlice.actions
export default internalRouteSlice.reducer
