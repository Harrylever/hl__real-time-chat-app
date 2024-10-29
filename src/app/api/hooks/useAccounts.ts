import { useQuery } from '@tanstack/react-query'
import {
  getAccounts,
  getActiveAccount,
  getRecipientAccount,
} from '../actions/accounts'
import { AxiosError } from 'axios'
import { IUser, IGetRecipientAccountValues, QueryBaseResponse } from 'typings'

export function useGetActiveUserQuery() {
  return useQuery<QueryBaseResponse<IUser>, AxiosError>({
    queryKey: ['getactiveuser'],
    queryFn: getActiveAccount,
  })
}

export function useGetRecipientUserQuery(
  values: IGetRecipientAccountValues,
  { enabled }: { enabled: boolean },
) {
  return useQuery<QueryBaseResponse<IUser>, AxiosError>({
    queryKey: ['getrecipientuser'],
    queryFn: () => getRecipientAccount(values),
    enabled,
  })
}

export function useGetAllUsersQuery() {
  return useQuery<QueryBaseResponse<IUser[]>, AxiosError>({
    queryKey: ['getallaccounts'],
    queryFn: getAccounts,
  })
}
