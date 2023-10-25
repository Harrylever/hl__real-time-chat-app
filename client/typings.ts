export const BASE_URL = 'http://localhost:4001/api/v1/'

export interface IAuthState {
    _id: string;
    email: string;
    access: string;
    refresh: string;
  }
  
export interface IUser {
  _id?: string;
  username?: string;
  fullname?: string;
  email?: string;
  password?: string;
}

export interface LoginResValues {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  _id: number;
  email: string;
  username: string;
}
