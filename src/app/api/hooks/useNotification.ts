import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import {
  postModifyNotifications,
  IPostModifyNotificationsValues,
} from '../actions/notifications'

export function usePostModifyNotifications() {
  return useMutation<AxiosResponse, AxiosError, IPostModifyNotificationsValues>(
    {
      mutationFn: (values) => postModifyNotifications(values),
    },
  )
}
