import { AxiosInstance } from 'axios'
import { INotification } from 'typings'

export class NotificationRequests {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async usePostModifyNotificationsMutation(notifications: INotification[]) {
    const fetch = await this.axiosInstance.post(
      '/notifications/mutate-with-sender',
      {
        notifications,
      },
    )
    return fetch.data
  }
}
