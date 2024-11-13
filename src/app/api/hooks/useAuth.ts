import { useMutation, useQuery } from '@tanstack/react-query'
import {
  loginUser,
  logoutUser,
  loginStatus,
  useGoogleAuth,
  createUserAccount,
} from '../actions/auth'
import { AxiosError } from 'axios'
import {
  ILoginFormValues,
  IUseGoogleAuthValues,
  MutationBaseResponse,
  ICreateAccountFormValues,
} from 'typings'

export function useGoogleAuthMutation() {
  return useMutation<MutationBaseResponse, AxiosError, IUseGoogleAuthValues>({
    mutationFn: (credentials) => useGoogleAuth(credentials),
  })
}

export function useLoginUserMutation() {
  return useMutation<MutationBaseResponse, AxiosError, ILoginFormValues>({
    mutationFn: (credentials) => loginUser(credentials),
  })
}

export function useCreateAccountMutation() {
  return useMutation<
    MutationBaseResponse,
    AxiosError,
    ICreateAccountFormValues
  >({
    mutationFn: (user) => createUserAccount(user),
  })
}

export function useLoginStatusQuery() {
  return useQuery<any, AxiosError>({
    queryKey: ['login-status'],
    queryFn: loginStatus,
  })
}

export function useLogoutUser() {
  return useMutation<{ message: string }, AxiosError>({
    mutationFn: logoutUser,
  })
}
