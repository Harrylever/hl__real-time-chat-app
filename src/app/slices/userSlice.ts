import { IAccount } from '../../../typings'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserSlice {
  user: IAccount | undefined
}

interface ISetUserPayload {
  username?: string
  fullname?: string
  email?: string
  imgUri?: string
}

const initState: IUserSlice = {
  user: undefined,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initState,
  reducers: {
    setUser: (state: IUserSlice, action: PayloadAction<ISetUserPayload>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
