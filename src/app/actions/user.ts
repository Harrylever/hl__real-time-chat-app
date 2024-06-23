import { AxiosInstance } from 'axios'

// Users
export class UserRequests {
  // Constructor
  constructor(private readonly axiosInstance: AxiosInstance) {}

  // Methods
  async useGetUserByIdQuery(userid: string) {
    const fetch = await this.axiosInstance.get(`/users/${userid}`)
    return fetch.data
  }

  async useGetRecipientUserQuery(members: Array<string>, userid: string) {
    const recipientUserId = members.find((el) => el !== userid)
    const fetch = await this.axiosInstance.get(`/users/${recipientUserId}`)
    return fetch.data
  }

  async useGetAllUsersQuery() {
    const fetch = await this.axiosInstance.get('/users/')
    return fetch.data
  }
}
