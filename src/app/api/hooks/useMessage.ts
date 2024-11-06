import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getChatMessages,
  postChatMessages,
  getLastChatMessage,
  IPostChatMessageValues,
} from '../actions/message'
import { delay } from 'src/util/utils'
import { QueryBaseResponse, IMessage, MutationBaseResponse } from 'typings'

export function useGetChatMessagesQuery(chatId: string, delayMs: number = 100) {
  return useQuery<QueryBaseResponse<IMessage[]>, AxiosError>({
    queryKey: ['chat-messages'],
    queryFn: async () => {
      await delay(delayMs)
      return getChatMessages(chatId)
    },
  })
}

export function usePostChatMessageMutation() {
  return useMutation<MutationBaseResponse, AxiosError, IPostChatMessageValues>({
    mutationFn: (values) => postChatMessages(values),
  })
}

export function useGetLastChatMessageQuery(chatId: string) {
  return useQuery<QueryBaseResponse<any>, AxiosError>({
    queryKey: ['last-chat-message'],
    queryFn: () => getLastChatMessage(chatId),
  })
}
