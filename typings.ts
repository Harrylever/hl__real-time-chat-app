export const BASE_URL = import.meta.env.VITE_BE_URL

export interface IAuthState {
  id: string
  email: string
  access: string
  refresh: string
}

export interface IAccount extends ICreateAccountFormValues {
  _id: string
  profileImage: string
  role: ('standard' | 'admin')[]
}

export interface ICreateAccountFormValues {
  username: string
  fullname: string
  email: string
  password: string
}

export interface ILoginFormValues {
  email: string
  password: string
}

export interface IUseGoogleAuthValues {
  username: string
  fullname: string
  email: string
  profileImage: string
}

export interface QueryBaseResponse<T> {
  message: string
  data: T
}

export interface MutationBaseResponse {
  data?: any
  message: string
}

export interface ILoginResValues {
  exp: number
  iat: number
  jti: string
  token_type: string
  _id: string
  email: string
  username: string
}

export interface IChat {
  id: string
  members: Array<string>
}

export interface PageProps {
  user: IUser
}

export interface IMessage {
  _id?: string
  chatId: string
  senderId: IAccount
  text: string
  createdAt?: string
}

export interface IOnlineUser {
  email: string
  socketId: string
}

export interface INotification {
  date: unknown
  senderId: IAccount
  message: string
  isRead: boolean
}

export type TRoute = 'chats' | 'groups' | 'settings'

export interface InternalRoute {
  active: TRoute
}

export type TInViewTab = 'chats' | 'groups'

export interface IGetRecipientAccountValues {
  members: string[]
  accountId: string
}

export type IUser = Pick<
  IAccount,
  '_id' | 'email' | 'fullname' | 'profileImage' | 'username'
>

export interface RouteProps {
  user?: IUser
}
