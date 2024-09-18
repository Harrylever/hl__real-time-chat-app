import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import {
  getChatMessages,
  getLastChatMessage,
  IPostChatMessagesValues,
  postChatMessages,
} from '../actions/message'
import { ApiBaseResponse } from 'typings'

interface IUseGetChatMessagesQuery extends ApiBaseResponse {
  data: any[]
}

export function useGetChatMessagesQuery(chatId: string) {
  return useQuery<IUseGetChatMessagesQuery, AxiosError>({
    queryKey: ['getchatmessages'],
    queryFn: () => getChatMessages(chatId),
  })
}

export function usePostChatMessagesMutation() {
  return useMutation<AxiosResponse, AxiosError, IPostChatMessagesValues>({
    mutationFn: (values) => postChatMessages(values),
  })
}

export function useGetLastChatMessageQuery(chatId: string) {
  return useQuery<AxiosResponse, AxiosError>({
    queryKey: ['getlastchatmessage'],
    queryFn: () => getLastChatMessage(chatId),
  })
}
