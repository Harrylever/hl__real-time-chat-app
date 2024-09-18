import { INotification } from 'typings'
import axiosInstance from 'src/app/constants/axiosInstance'

export interface IPostModifyNotificationsValues {
  notifications: INotification[]
}
export async function postModifyNotifications(
  data: IPostModifyNotificationsValues,
) {
  const fetch = await axiosInstance.post(
    '/notifications/mutate-with-sender',
    data,
  )
  return fetch.data
}
