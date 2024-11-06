import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createChat, getUserChats, ICreateChatValues } from '../actions/chat'
import { IChat, MutationBaseResponse, QueryBaseResponse } from 'typings'

export function useGetUserChatsQuery() {
  return useQuery<QueryBaseResponse<IChat[]>, AxiosError>({
    queryKey: ['user-chats'],
    queryFn: getUserChats,
  })
}

export function useCreateChatMutation() {
  return useMutation<MutationBaseResponse, AxiosError, ICreateChatValues>({
    mutationFn: (values) => createChat(values),
  })
}
