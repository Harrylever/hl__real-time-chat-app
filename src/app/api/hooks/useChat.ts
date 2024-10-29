import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createChat, getUserChats, ICreateChatValues } from '../actions/chat'
import { IChat, QueryBaseResponse } from 'typings'

export function useGetUserChatsQuery() {
  return useQuery<QueryBaseResponse<IChat[]>, AxiosError>({
    queryKey: ['getuserchats'],
    queryFn: getUserChats,
  })
}

export function useCreateChatMutation() {
  return useMutation<any, AxiosError, ICreateChatValues>({
    mutationFn: (values) => createChat(values),
  })
}
