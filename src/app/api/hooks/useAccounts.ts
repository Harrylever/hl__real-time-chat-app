import { useQuery } from '@tanstack/react-query'
import {
  getAccounts,
  getActiveAccount,
  getRecipientAccount,
} from '../actions/accounts'
import { AxiosError } from 'axios'
import { IUser, BaseResponse, IGetRecipientAccountValues } from 'typings'

export function useGetActiveUserQuery() {
  return useQuery<BaseResponse<IUser>, AxiosError>({
    queryKey: ['getactiveuser'],
    queryFn: getActiveAccount,
  })
}

export function useGetRecipientUserQuery(
  values: IGetRecipientAccountValues,
  { enabled }: { enabled: boolean },
) {
  return useQuery<BaseResponse<IUser>, AxiosError>({
    queryKey: ['getrecipientuser'],
    queryFn: () => getRecipientAccount(values),
    enabled,
  })
}

export function useGetAllUsersQuery() {
  return useQuery<BaseResponse<IUser[]>, AxiosError>({
    queryKey: ['getallaccounts'],
    queryFn: getAccounts,
  })
}
