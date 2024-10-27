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
import { BaseResponse, ICreateAccountFormValues } from 'typings'

export function useIndexQuery() {
  return useQuery<any, AxiosError>({
    queryKey: ['index'],
    queryFn: getIndex,
  })
}

export function useLoginUserMutation() {
  return useMutation<any, AxiosError, ILoginValues>({
    mutationFn: (credentials) => loginUser(credentials),
  })
}

export function useRegisterUserMutation<T>() {
  return useMutation<BaseResponse<T>, AxiosError, ICreateAccountFormValues>({
    mutationFn: (user) => createUserAccount(user),
  })
}

export function useLoginStatusQuery() {
  return useQuery<any, AxiosError>({
    queryKey: ['loginstatus'],
    queryFn: loginStatus,
  })
}

export function useLogoutUser() {
  return useQuery<any, AxiosError>({
    queryKey: ['logout'],
    queryFn: logoutUser,
  })
}
