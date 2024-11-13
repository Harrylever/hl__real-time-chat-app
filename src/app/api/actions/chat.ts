import axiosInstance from 'src/app/constants/axiosInstance'

/**
 * Fetches all the chats for the currently login user
 * @param userid
 * @returns
 */
export async function getUserChats() {
  const fetch = await axiosInstance.get('/chats/me')
  return fetch.data
}

export interface ICreateChatValues {
  emailOne: string
  emailTwo: string
}
/**
 * Takes two params
 * userOneEmail: the id vaue for the logged in user,
 * userTwoEmail: is the id value for the user being sent a message
 * @param chatBody
 * @returns
 */
export async function createChat(data: ICreateChatValues) {
  const fetch = await axiosInstance.post('/chats/create', data)
  return fetch.data
}

export async function getMobileUserChats() {
  const fetch = await axiosInstance.get('/chats/mobile/me')
  return fetch.data
}
