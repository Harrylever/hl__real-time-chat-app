import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createChat,
  getUserChats,
  ICreateChatValues,
  getMobileUserChats,
} from '../actions/chat'
import {
  IChat,
  IMobileChat,
  QueryBaseResponse,
  MutationBaseResponse,
} from 'typings'

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

export function useGetMobileUserChatsQuery() {
  return useQuery<QueryBaseResponse<IMobileChat[]>, AxiosError>({
    queryKey: ['mobile-user-chats'],
    queryFn: getMobileUserChats,
  })
}
