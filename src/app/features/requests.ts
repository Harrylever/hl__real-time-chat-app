import { AxiosInstance } from 'axios';
import { IUser } from '../../../typings';

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

  async useGetRecipientUserQuery(members: Array<string>, user: IUser) {
    const recipientUserId = members.find((el) => el === user._id);
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
}
