import { useQuery } from '@tanstack/react-query'
import {
  getAccounts,
  getActiveAccount,
  getRecipientAccount,
  getUserLastActive,
} from '../actions/accounts'
import { AxiosError } from 'axios'
import { IUser, IGetRecipientAccountValues, QueryBaseResponse } from 'typings'

export function useGetActiveUserQuery() {
  return useQuery<QueryBaseResponse<IUser>, AxiosError>({
    queryKey: ['active-user'],
    queryFn: getActiveAccount,
  })
}

export function useGetRecipientUserQuery(values: IGetRecipientAccountValues) {
  return useQuery<QueryBaseResponse<IUser>, AxiosError>({
    queryKey: ['recipient-user', values.accountId, values.members],
    queryFn: () => getRecipientAccount(values),
    enabled: !!values.accountId && values.members.length > 0,
  })
}

export function useGetAllUsersQuery() {
  return useQuery<QueryBaseResponse<IUser[]>, AxiosError>({
    queryKey: ['all-user-accounts'],
    queryFn: getAccounts,
  })
}

export function useGetUserLastActive(email: string) {
  return useQuery<QueryBaseResponse<any>, AxiosError>({
    queryKey: ['user-last-active', email],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return getUserLastActive(email)
    },
  })
}
