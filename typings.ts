import { LegacyRef } from 'react'

export const BASE_URL = import.meta.env.VITE_BE_URL

export interface IAuthState {
  _id: string
  email: string
  access: string
  refresh: string
}

export interface IAccount {
  username?: string
  fullname?: string
  email?: string
  imgUri?: string
  password?: string
  role?: ('standard' | 'admin')[]
}

export interface BaseResponse {
  success: boolean
  message: string
}

export interface ApiBaseResponse<T> {
  success: boolean
  message: string
  data: T
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
  id?: string
  members: Array<string>
}

export interface ChatSectionProps {
  user: IAccount
}

export interface NavBarProps {}

export interface PageProps<T = unknown> {
  extendProps?: Partial<T>
}

export interface PotentialChatProps {
  chat: IAccount
  chatIsLoading: boolean
  setChatIsLoading: (value: boolean) => void
}

export interface PotentialChatWrapProps {}

export interface UserChatProps {
  chat: IChat
}

export interface UserChatsWrapProps {
  chats: Array<IChat>
}

export interface IMessage {
  _id?: string
  chatId: string
  senderId: IAccount
  text: string
  createdAt?: string
}

export interface ChatBoxProps {
  user: IAccount
}

export interface ChatViewProps {
  messages: IMessage[]
  userEmail: string
  recipientUser: IAccount
}

export interface MessageProps<T> {
  prevMessage?: IMessage
  nextMessage?: IMessage
  message: IMessage
  isMainUserMessage: boolean
  ref?: React.LegacyRef<T>
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

export type TInViewTabProps = {
  name: TInViewTab
  isMsgView: boolean
  icon: { active: string; inactive: string }
}

export interface IGetRecipientAccountValues {
  members: string[]
  accountId: string
}

export interface UserChatTemplateProps {
  ref: LegacyRef<HTMLButtonElement>
  chat: IChat
  recipientUser: IAccount
  currentChat: IChat | undefined
  isOnline: boolean
  handleButtonClick: () => void
  latestMessage: IMessage | undefined
  thisUserNotifications: INotification[]
}
