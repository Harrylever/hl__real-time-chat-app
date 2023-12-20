export const BASE_URL = 'http://localhost:4001/api/v1/';

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
  imgUri?: string;
  password?: string;
}

export interface LoginResValues {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  _id: string;
  email: string;
  username: string;
}

export interface IChat {
  _id?: string;
  members?: Array<string>;
}

export interface IChatSectionProps {}

export interface INavBarProps {
  user?: IUser;
}

export interface PageProps<T = unknown> {
  extendProps?: Partial<T>;
}

export interface IPotentialChatProps {
  chat: IUser;
  cb?: () => void;
}

export type IPotentialChatWrapProps = Array<IUser>;

export interface IUserChatProps {
  chat?: IChat;
  user?: IUser;
}

export interface IUserChatWrapProps {
  chats: Array<IChat>;
  user: IUser; 
}

export interface IMessage {
  _id?: string;
  chatId: string;
  senderId: string;
  text: string;
}