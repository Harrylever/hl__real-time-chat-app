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
    const fetch = await this.axiosInstance.get(
      `/api/v1/users/getuserbyid/${userid}`
    );
    return fetch.data;
  }

  async useGetAllUsersQuery(type?: 'standard' | 'admin') {
    const fetch = await this.axiosInstance.get(
      type
        ? `/api/v1/users/getallusers?role=${type}`
        : '/api/v1/users/getallusers'
    );
    return fetch.data;
  }
}
