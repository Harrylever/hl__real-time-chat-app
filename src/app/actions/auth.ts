import { AxiosInstance } from 'axios'
import { IUser } from 'typings'

export class AuthRequests {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  public async login({ email, password }: { email: string; password: string }) {
    const fetch = await this.axiosInstance.post('/auth/login', {
      email,
      password,
    })
    return fetch.data
  }

  public async register(user: IUser) {
    const fetch = await this.axiosInstance.post('/auth/register', {
      ...user,
    })
    return fetch.data
  }

  public async loginStatus() {
    const fetch = await this.axiosInstance.get('/auth/loginstatus')
    return fetch.data
  }

  public async logout() {
    const fetch = await this.axiosInstance.get('/auth/logout')
    return fetch.data
  }
}
