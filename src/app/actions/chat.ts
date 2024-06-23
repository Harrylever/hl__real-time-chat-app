import { AxiosInstance } from 'axios'

// Chats
export class ChatRequests {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  /**
   * Fetches all the chats for the currently login user
   * @param userid
   * @returns
   */
  public async useGetUserChatsQuery(userid: string) {
    const fetch = await this.axiosInstance.get(`/chats/getuserchats/${userid}`)
    return fetch.data
  }

  /**
   * Takes two params
   * userOneId: the id vaue for the logged in user,
   * userTwoId: is the id value for the user being sent a message
   * @param chatBody
   * @returns
   */
  public async useCreateChatMutation({
    userOneId,
    userTwoId,
  }: {
    userOneId: string
    userTwoId: string
  }) {
    const fetch = await this.axiosInstance.post('/chats/create', {
      userOneId,
      userTwoId,
    })
    return fetch.data
  }
}
