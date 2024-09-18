import { AxiosError } from 'axios'
import { ApiBaseResponse, IChat } from 'typings'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createChat, getUserChats, ICreateChatValues } from '../actions/chat'

interface IUseGetUserChatsQuery extends ApiBaseResponse {
  data: IChat[]
}

export function useGetUserChatsQuery() {
  return useQuery<IUseGetUserChatsQuery, AxiosError>({
    queryKey: ['getuserchats'],
    queryFn: getUserChats,
  })
}

interface IUseCreateChatMutation extends ApiBaseResponse {
  data: IChat
}

export function useCreateChatMutation() {
  return useMutation<IUseCreateChatMutation, AxiosError, ICreateChatValues>({
    mutationFn: (values) => createChat(values),
  })
}
