/* eslint-disable react-hooks/rules-of-hooks */
import { IAuthState } from '../../../typings'

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

export { getLocalStorageValueForAuth }
