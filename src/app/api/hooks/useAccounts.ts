import { useQuery } from '@tanstack/react-query'
import {
  getAccounts,
  getActiveAccount,
  getRecipientAccount,
} from '../actions/accounts'
import { AxiosError } from 'axios'
import { ApiBaseResponse, IAccount, IGetRecipientAccountValues } from 'typings'

interface IUseGetActiveUserQueryResponse extends ApiBaseResponse {
  data: Pick<IAccount, 'email' | 'fullname' | 'imgUri' | 'username'>
}

export function useGetActiveUserQuery() {
  return useQuery<IUseGetActiveUserQueryResponse, AxiosError>({
    queryKey: ['getactiveuser'],
    queryFn: getActiveAccount,
  })
}

export function useGetRecipientUserQuery(values: IGetRecipientAccountValues) {
  return useQuery<IAccount, AxiosError>({
    queryKey: ['getrecipientuser'],
    queryFn: () => getRecipientAccount(values),
  })
}

interface IUseGetAllUsersQuery extends ApiBaseResponse {
  data: IAccount[]
}

export function useGetAllUsersQuery() {
  return useQuery<IUseGetAllUsersQuery, AxiosError>({
    queryKey: ['getallaccounts'],
    queryFn: getAccounts,
  })
}
