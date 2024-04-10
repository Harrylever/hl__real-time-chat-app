export const BASE_URL = import.meta.env.VITE_BE_URL;

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

export interface IChatSectionProps {
  chatsIsLoading: boolean;
  pChatsIsLoading: boolean;
  userChats: IChat[];
  potentialChats: IChat[];
  currentChat: IChat;
  callBackFromPotentialChatsWrap: () => void;
}

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
  senderId: IUser;
  text: string;
  createdAt?: string;
}

export interface IChatBoxProps {
  currentChat: IChat;
  user: IUser;
}

export interface IChatViewProps {
  messages: IMessage[];
  isLoading: boolean;
  messagesIsLoading: boolean;
  userId: string;
  chatId: string;
  recipientUser: IUser;
}

export interface IMessageProps<T> {
  prevMessage?: IMessage;
  message: IMessage;
  isMainUserMessage: boolean;
  ref?: React.LegacyRef<T>
}

export interface IOnlineUser { 
  userId: string; 
  socketId: string 
}

export interface INotification {
  date: unknown;
  senderId: IUser;
  message: string;
  isRead: boolean;
}