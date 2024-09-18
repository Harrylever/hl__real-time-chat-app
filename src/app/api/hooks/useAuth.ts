import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getIndex,
  loginUser,
  logoutUser,
  loginStatus,
  ILoginValues,
  createUserAccount,
} from '../actions/auth'
import { AxiosError } from 'axios'
import { ApiBaseResponse, IAccount } from 'typings'

export function useIndexQuery() {
  return useQuery<ApiBaseResponse, AxiosError>({
    queryKey: ['index'],
    queryFn: getIndex,
  })
}

export function useLoginUserMutation() {
  return useMutation<ApiBaseResponse, AxiosError, ILoginValues>({
    mutationFn: (credentials) => loginUser(credentials),
  })
}

export function useRegisterUserMutation() {
  return useMutation<ApiBaseResponse, AxiosError, IAccount>({
    mutationFn: (user) => createUserAccount(user),
  })
}

export function useLoginStatusQuery() {
  return useQuery<ApiBaseResponse, AxiosError>({
    queryKey: ['loginstatus'],
    queryFn: loginStatus,
  })
}

export function useLogoutUser() {
  return useQuery<ApiBaseResponse, AxiosError>({
    queryKey: ['logout'],
    queryFn: logoutUser,
  })
}
