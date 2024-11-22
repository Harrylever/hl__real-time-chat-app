import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from 'src/app/constants/axiosInstance'

interface IContactFormValues {
  sender_name: string
  sender_email: string
  sender_message: string
}

export const usePostContactForm = () => {
  return useMutation<AxiosResponse<any>, AxiosError, IContactFormValues>({
    mutationFn: async (data) =>
      axiosInstance.post('/mail/send-contact-us-message', data),
  })
}
