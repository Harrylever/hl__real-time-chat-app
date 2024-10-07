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
import { BaseResponse, IAccount } from 'typings'

export function useIndexQuery() {
  return useQuery<BaseResponse, AxiosError>({
    queryKey: ['index'],
    queryFn: getIndex,
  })
}

export function useLoginUserMutation() {
  return useMutation<BaseResponse, AxiosError, ILoginValues>({
    mutationFn: (credentials) => loginUser(credentials),
  })
}

export function useRegisterUserMutation() {
  return useMutation<BaseResponse, AxiosError, IAccount>({
    mutationFn: (user) => createUserAccount(user),
  })
}

export function useLoginStatusQuery() {
  return useQuery<BaseResponse, AxiosError>({
    queryKey: ['loginstatus'],
    queryFn: loginStatus,
  })
}

export function useLogoutUser() {
  return useQuery<BaseResponse, AxiosError>({
    queryKey: ['logout'],
    queryFn: logoutUser,
  })
}
