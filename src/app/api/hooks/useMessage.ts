import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getChatMessages,
  postChatMessages,
  getLastChatMessage,
  IPostChatMessageValues,
} from '../actions/message'
import { delay } from 'src/util/utils'
import { BaseResponse, IMessage } from 'typings'

export function useGetChatMessagesQuery(chatId: string, delayMs: number = 100) {
  return useQuery<BaseResponse<IMessage[]>, AxiosError>({
    queryKey: ['getchatmessages'],
    queryFn: async () => {
      await delay(delayMs)
      return getChatMessages(chatId)
    },
  })
}

export function usePostChatMessageMutation() {
  return useMutation<BaseResponse<any>, AxiosError, IPostChatMessageValues>({
    mutationFn: (values) => postChatMessages(values),
  })
}

export function useGetLastChatMessageQuery(chatId: string) {
  return useQuery<BaseResponse<any>, AxiosError>({
    queryKey: ['getlastchatmessage'],
    queryFn: () => getLastChatMessage(chatId),
  })
}
