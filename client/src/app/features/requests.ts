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
    const fetch = await this.axiosInstance.get(
      `/users/${userid}`
    );
    return fetch.data;
  }

  async useGetAllUsersQuery() {
    const fetch = await this.axiosInstance.get('/api/v1/users/');
    return fetch.data;
  }
}
