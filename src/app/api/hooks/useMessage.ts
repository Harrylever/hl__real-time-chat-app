import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getChatMessages,
  postChatMessages,
  getLastChatMessage,
  IMessageFormValues,
} from '../actions/message'
import { QueryBaseResponse, MutationBaseResponse, IPlainMessage } from 'typings'

export function useGetChatMessagesQuery(chatId: string) {
  return useQuery<QueryBaseResponse<IPlainMessage[]>, AxiosError>({
    queryKey: ['chat-messages', chatId],
    queryFn: async () => getChatMessages(chatId),
  })
}

export function usePostChatMessageMutation() {
  return useMutation<MutationBaseResponse, AxiosError, IMessageFormValues>({
    mutationFn: (values) => postChatMessages(values),
  })
}

export function useGetLastChatMessageQuery(chatId: string) {
  return useQuery<QueryBaseResponse<any>, AxiosError>({
    queryKey: ['last-chat-message', chatId],
    queryFn: () => getLastChatMessage(chatId),
  })
}
