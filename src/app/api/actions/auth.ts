import { ICreateAccountFormValues } from 'typings'
import axiosInstance from 'src/app/constants/axiosInstance'

export interface ILoginValues {
  email: string
  password: string
}

export async function getIndex() {
  const fetch = await axiosInstance.get('/')
  return fetch.data
}

export async function loginUser(credentials: ILoginValues) {
  const fetch = await axiosInstance.post('/auth/login', credentials)
  return fetch.data
}

export async function createUserAccount(user: ICreateAccountFormValues) {
  const fetch = await axiosInstance.post('/auth/register', user)
  return fetch.data
}

// export async function createAdminAccount(
//   user: Pick<IAccount, 'email' | 'password' | 'username'>,
// ) {
//   const data: IAccount = {
//     role: ['admin'],
//     ...user,
//   }
//   const fetch = await axiosInstance.post('/auth/register', data)
//   return fetch.data
// }

export async function loginStatus() {
  const fetch = await axiosInstance.get('/auth/loginstatus')
  return fetch.data
}

export async function logoutUser() {
  const fetch = await axiosInstance.get('/auth/logout')
  return fetch.data
}
