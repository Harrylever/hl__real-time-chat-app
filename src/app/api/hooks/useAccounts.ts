import { useQuery } from '@tanstack/react-query'
import {
  getAccounts,
  getActiveAccount,
  getRecipientAccount,
} from '../actions/accounts'
import { AxiosError } from 'axios'
import { ApiBaseResponse, IAccount, IGetRecipientAccountValues } from 'typings'

export function useGetActiveUserQuery() {
  return useQuery<
    ApiBaseResponse<
      Pick<IAccount, 'email' | 'fullname' | 'imgUri' | 'username'>
    >,
    AxiosError
  >({
    queryKey: ['getactiveuser'],
    queryFn: getActiveAccount,
  })
}

export function useGetRecipientUserQuery(
  values: IGetRecipientAccountValues,
  { enabled }: { enabled: boolean },
) {
  return useQuery<ApiBaseResponse<IAccount>, AxiosError>({
    queryKey: ['getrecipientuser'],
    queryFn: () => getRecipientAccount(values),
    enabled,
  })
}

export function useGetAllUsersQuery() {
  return useQuery<ApiBaseResponse<IAccount[]>, AxiosError>({
    queryKey: ['getallaccounts'],
    queryFn: getAccounts,
  })
}
