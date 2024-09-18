import { IGetRecipientAccountValues } from 'typings'
import axiosInstance from 'src/app/constants/axiosInstance'

export async function getActiveAccount() {
  const fetch = await axiosInstance.get('/accounts/me')
  return fetch.data
}

export async function getRecipientAccount({
  members,
  accountId,
}: IGetRecipientAccountValues) {
  const recipientAccountId = members.find((el) => el !== accountId)
  const fetch = await axiosInstance.get(`/accounts/${recipientAccountId}`)
  return fetch.data
}

export async function getAccounts() {
  const fetch = await axiosInstance.get('/accounts')
  return fetch.data
}
