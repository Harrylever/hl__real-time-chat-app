import { AxiosInstance } from 'axios';

export class PrivateRequestConstruct {
  axiosInstance: AxiosInstance;

  // Constructor
  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  // Methods

  // Users
  async useGetUserByIdQuery(userid: string) {
    const fetch = await this.axiosInstance.get(`/users/${userid}`);
    return fetch.data;
  }

  async useGetRecipientUserQuery(members: Array<string>, userid: string) {
    const recipientUserId = members.find((el) => el !== userid);
    const fetch = await this.axiosInstance.get(`/users/${recipientUserId}`);
    return fetch.data;
  }

  async useGetAllUsersQuery() {
    const fetch = await this.axiosInstance.get('/users/');
    return fetch.data;
  }

  // Chats
  /**
   * Fetches all the chats for the currently login user
   * @param userid
   * @returns
   */
  async useGetUserChatsQuery(userid: string) {
    const fetch = await this.axiosInstance.get(`/chats/getuserchats/${userid}`);
    return fetch.data;
  }

  /**
   * Takes two params
   * userOneId: the id vaue for the logged in user,
   * userTwoId: is the id value for the user being sent a message
   * @param chatBody
   * @returns
   */
  async useCreateChatMutation({
    userOneId,
    userTwoId,
  }: {
    userOneId: string;
    userTwoId: string;
  }) {
    const fetch = await this.axiosInstance.post('/chats/create', {
      userOneId,
      userTwoId,
    });
    return fetch.data;
  }

  // Messages
  /**
   * Gets chat messages by chat id
   * @param chatid
   * @returns
   */
  async useGetChatMessages(chatid: string) {
    const fetch = await this.axiosInstance.get(`/messages/chat/${chatid}`);
    return fetch.data;
  }

  /**
   * Post new messages to the server
   * @param param0 
   * @returns 
   */
  async usePostChatMessages({ chatId, senderId, text }: { chatId: string; senderId: string; text: string; }) {
    const fetch = await this.axiosInstance.post('/messages/create', {
      chatId,
      senderId,
      text,
    });
    return fetch.data;
  }
}
