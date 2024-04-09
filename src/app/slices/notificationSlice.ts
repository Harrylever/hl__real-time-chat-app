import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../../../typings';

interface INotificationSlice {
  notifications: Array<INotification>;
}

const initState: INotificationSlice = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: initState,
  reducers: {
    setReduxNotifications: (
      state: INotificationSlice,
      action: PayloadAction<INotificationSlice>
    ) => {
      state.notifications = action.payload.notifications;
    },
  },
});

export const { setReduxNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
