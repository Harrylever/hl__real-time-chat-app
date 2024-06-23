/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { IAuthState, BASE_URL } from '../../../typings'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

const getLocalStorageValueForAuth = (): IAuthState | null => {
  const authDataFromStorage = window.localStorage.getItem('auth') as string
  if (authDataFromStorage === null) {
    return {
      access: '',
      refresh: '',
      email: '',
      _id: '',
    }
  }
  const authData: IAuthState = JSON.parse(authDataFromStorage)
  return authData
}

export { axiosInstance, getLocalStorageValueForAuth }
