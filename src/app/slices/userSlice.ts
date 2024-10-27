import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from 'typings'

interface IUserSlice {
  user: IUser | undefined
}

const initState: IUserSlice = {
  user: undefined,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initState,
  reducers: {
    setUser: (state: IUserSlice, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
