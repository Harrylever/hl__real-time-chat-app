import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const useContactForm = () => {
  return useMutation<
    AxiosResponse<any>,
    AxiosError,
    { name: string; email: string; message: string }
  >({
    mutationFn: async (data) => {
      const formBody = `email=${encodeURIComponent(data.email)}&message=${encodeURIComponent(data.message)}`

      return axios.post(
        'https://app.loops.so/api/newsletter-form/cm0g6ixcw00b69o7bdahqkjup',
        formBody,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
    },
  })
}
