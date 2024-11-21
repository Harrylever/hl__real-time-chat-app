import {
  ICreateAccountFormValues,
  ILoginFormValues,
  IUseGoogleAuthValues,
} from 'typings'
import axiosInstance from 'src/app/constants/axiosInstance'

export async function loginUser(credentials: ILoginFormValues) {
  const fetch = await axiosInstance.post('/auth/login', credentials)
  return fetch.data
}

export async function createUserAccount(user: ICreateAccountFormValues) {
  const fetch = await axiosInstance.post('/auth/create-account', user)
  return fetch.data
}

export async function useGoogleAuth(credentials: IUseGoogleAuthValues) {
  const fetch = await axiosInstance.post('/auth/google', credentials)
  return fetch.data
}

export async function loginStatus() {
  const fetch = await axiosInstance.get('/auth/loginstatus')
  return fetch.data
}

export async function logoutUser() {
  const fetch = await axiosInstance.post('/auth/logout', {})
  return fetch.data
}
