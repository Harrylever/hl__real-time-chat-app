import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import {
  getChatMessages,
  getLastChatMessage,
  IPostChatMessageValues,
  postChatMessages,
} from '../actions/message'
import { ApiBaseResponse, IMessage } from 'typings'
import { delay } from 'src/util/utils'

export function useGetChatMessagesQuery(chatId: string, delayMs: number = 500) {
  return useQuery<ApiBaseResponse<IMessage[]>, AxiosError>({
    queryKey: ['getchatmessages'],
    queryFn: async () => {
      await delay(delayMs)
      return getChatMessages(chatId)
    },
  })
}

export function usePostChatMessageMutation() {
  return useMutation<AxiosResponse, AxiosError, IPostChatMessageValues>({
    mutationFn: (values) => postChatMessages(values),
  })
}

export function useGetLastChatMessageQuery(chatId: string) {
  return useQuery<AxiosResponse, AxiosError>({
    queryKey: ['getlastchatmessage'],
    queryFn: () => getLastChatMessage(chatId),
  })
}
