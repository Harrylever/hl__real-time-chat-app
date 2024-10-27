import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createChat, getUserChats, ICreateChatValues } from '../actions/chat'
import { BaseResponse, IChat } from 'typings'

export function useGetUserChatsQuery() {
  return useQuery<BaseResponse<IChat[]>, AxiosError>({
    queryKey: ['getuserchats'],
    queryFn: getUserChats,
  })
}

export function useCreateChatMutation() {
  return useMutation<any, AxiosError, ICreateChatValues>({
    mutationFn: (values) => createChat(values),
  })
}
