import { AxiosInstance } from 'axios'

// Messages
export class MessageRequests {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  /**
   * Gets chat messages by chat id
   * @param chatid
   * @returns
   */
  async useGetChatMessages(chatid: string) {
    const fetch = await this.axiosInstance.get(`/messages/chat/${chatid}`)
    return fetch.data
  }

  /**
   * Post new messages to the server
   * @param param0
   * @returns
   */
  async usePostChatMessages({
    chatId,
    senderId,
    text,
  }: {
    chatId: string
    senderId: string
    text: string
  }) {
    const fetch = await this.axiosInstance.post('/messages/create', {
      chatId,
      senderId,
      text,
    })
    return fetch.data
  }

  async useGetLastChatMessage(chatId: string) {
    const fetch = await this.axiosInstance.get(
      `/messages/chat/${chatId}/last-message`,
    )
    return fetch.data
  }
}
