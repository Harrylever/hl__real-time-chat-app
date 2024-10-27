import axiosInstance from 'src/app/constants/axiosInstance'

/**
 * @description Gets chat messages by chat id
 * @param chatid
 * @returns
 */
export async function getChatMessages(chatId: string) {
  const fetch = await axiosInstance.get(`/messages/chat/${chatId}`)
  return fetch.data
}

export interface IPostChatMessageValues {
  chatId: string
  senderId: string
  text: string
}
/**
 * @description Post new messages to the server
 * @returns
 */
export async function postChatMessages(data: IPostChatMessageValues) {
  const fetch = await axiosInstance.post('/messages/create', data)
  return fetch.data
}

/**
 *
 * @description Get the last message in a chat
 * @param chatId
 * @returns
 */
export async function getLastChatMessage(chatId: string) {
  const fetch = await axiosInstance.get(`/messages/chat/${chatId}/last-message`)
  return fetch.data
}
