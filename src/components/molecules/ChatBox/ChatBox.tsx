import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  FormEvent,
  useCallback,
} from 'react';
import {
  IUser,
  IMessage,
  IMessageProps,
  IChatBoxProps,
  IChatViewProps,
} from '../../../../typings';
import clsx from 'clsx';
import moment from 'moment';
import { LuSend } from 'react-icons/lu';
import InputEmoji from 'react-input-emoji'
import { addMessages } from '../../../app/slices/messagesSlice';
import { updateNewMessage } from '../../../app/slices/socketSlice';
import { useAppDispatch, useAppSelector, useAxiosPrivate } from '../../../app';
import { MessageRequests, UserRequests } from '../../../app/features/requests';

const ChatBox: React.FC<{ props: IChatBoxProps }> = ({
  props,
}) => {
  const dispatch = useAppDispatch()
  const { currentChat, user } = props;
  const axiosInstance = useAxiosPrivate();
  const messageRequests = useMemo(
    () => new MessageRequests(axiosInstance),
    [axiosInstance]
  );
  const userRequests = useMemo(
    () => new UserRequests(axiosInstance),
    [axiosInstance]
  );
  const reduxMessages = useAppSelector((state) => state.messageReduce.messages);

  const [recipientUser, setRecipientUser] = useState<IUser | undefined>(
    undefined
  );
  const [realMessages, setRealMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messagesIsLoading, setMessagesIsLoading] = useState(false);

  // Get Messages Handler
  const getChatMessagesHandler = useCallback(async () => {
    try {
      setMessagesIsLoading(true);
      if (currentChat?._id === undefined || currentChat._id === '') {
        setMessagesIsLoading(false);
        return;
      }

      const fetch = await messageRequests.useGetChatMessages(currentChat._id);

      if (fetch.success) {
        dispatch(
          addMessages({
            messages: fetch.data.messages
          })
        )
      } else {
        console.log('Unexpected error');
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentChat._id, dispatch, messageRequests]);

  const getRecipientUser = useCallback(async () => {
    try {
      const fetch = await userRequests.useGetRecipientUserQuery(
        currentChat?.members as string[],
        user?._id as string
      );

      if (fetch.success) {
        const recipientUser = fetch.data as IUser;
        setRecipientUser(recipientUser);
      } else {
        console.log('Unexpected error occured!');
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentChat?.members, user?._id, userRequests]);

  useEffect(() => {
    if (currentChat && currentChat.members && currentChat.members.length > 0) {
      getRecipientUser();
      getChatMessagesHandler();
    }
  }, [currentChat, user, getRecipientUser, getChatMessagesHandler]);

  useEffect(() => {
    setIsLoading(true);
    if (reduxMessages && Array.isArray(reduxMessages)) {
      setRealMessages(reduxMessages);
    }
    setIsLoading(false);
  }, [reduxMessages]);

  return (
    <div className="w-full h-full">
      {recipientUser ? (
        <ChatView
          props={{
            messages: realMessages,
            isLoading,
            messagesIsLoading,
            userId: user?._id as string,
            chatId: currentChat?._id as string,
            recipientUser,
          }}
        />
      ) : (
        <p>No conversation to show</p>
      )}
    </div>
  );
};

const Message: React.FC<{ props: IMessageProps<HTMLDivElement> }> = ({ props }) => {
  const { message, prevMessage, isMainUserMessage, ref } = props;
  const [previousMessage, setPreviousMessage] = useState<IMessage | undefined>(
    undefined
  );

  useEffect(() => {
    if (prevMessage) {
      setPreviousMessage(prevMessage);
    }
  }, [prevMessage]);

  return (
    <div
      ref={ref}
      className={clsx([
        'relative w-fit min-w-[90px] max-w-[200px] sm:max-w-[300px] bg-slate-500 px-3 py-2 rounded-b-lg flex flex-col gap-y-2',
        {
          'rounded-tl-lg':
            (previousMessage &&
              previousMessage.senderId._id !== message.senderId._id &&
              isMainUserMessage) ||
            (!previousMessage && message && isMainUserMessage),
          'rounded-tr-lg':
            (previousMessage &&
              previousMessage.senderId._id !== message.senderId._id &&
              !isMainUserMessage) ||
            (!previousMessage && message && !isMainUserMessage),
          'rounded-t-lg':
            previousMessage &&
            previousMessage.senderId._id === message.senderId._id,
        },
      ])}
    >
      {/* Add triangle mark for first messages in chat */}
      {!previousMessage && message && (
        <div
          className={clsx([
            'absolute top-0 -right-[6px]',
            {
              'custom-right-angle-triangle -right-[6px]': isMainUserMessage,
              'custom-left-angle-triangle -left-[6px] ': !isMainUserMessage,
            },
          ])}
        ></div>
      )}

      {/* Add triangle mark for first new messages by each user in chats */}
      {previousMessage &&
        previousMessage.senderId._id !== message.senderId._id && (
        <>
          <div
            className={clsx([
              'absolute top-0 -right-[6px]',
              {
                'custom-right-angle-triangle -right-[6px]': isMainUserMessage,
                'custom-left-angle-triangle -left-[6px] ': !isMainUserMessage,
              },
            ])}
          ></div>
        </>
      )}

      {/*  */}
      <div>
        <p className="text-xs md:text-sm">{message.text}</p>
      </div>

      <small className="text-[0.55rem]/normal lowercase text-right">
        {moment(message.createdAt as string).format('LT')}
      </small>
    </div>
  );
};

const ChatView: React.FC<{ props: IChatViewProps }> = ({
  props,
}): JSX.Element => {
  const { messages, userId, chatId, recipientUser } = props;

  const scrollRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const axiosInstance = useAxiosPrivate();
  const messageRequests = useMemo(
    () => new MessageRequests(axiosInstance),
    [axiosInstance]
  );
  const allMessages = useAppSelector((state) => state.messageReduce.messages);
  const [newMessage, setNewMessage] = useState('');
  const [messageIsSending, setMessageIsSending] = useState(false);

  const handleMessageFormPost = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (newMessage === '') return;
      setMessageIsSending(true);
      const msg = newMessage;
      setNewMessage('');
      const newMessageData: { chatId: string; senderId: string; text: string } =
        {
          chatId,
          senderId: userId,
          text: msg,
        };

      const fetch = await messageRequests.usePostChatMessages(newMessageData);
      const newMessageToAdd = fetch.data as IMessage;
      dispatch(addMessages({ messages: [...allMessages, newMessageToAdd] }));
      dispatch(updateNewMessage({ newMessage: newMessageToAdd }));
    } catch (err) {
      console.log(err);
    } finally {
      setMessageIsSending(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className="relative w-full h-full bg-[#000000a5] rounded-t-xl rounded-b-md flex flex-col items-start justify-between overflow-hidden">
      {/* Display recipient user name */}
      <div className="w-full py-6 flex flex-row items-center justify-center bg-[#202020]">
        <p className="text-base font-normal text-mx-white">
          {recipientUser.username}
        </p>
      </div>

      {/* Chat Display */}
      <div className="relative w-full h-[80%] min-h-[50vh] pb-[15px] overflow-y-scroll flex flex-col-reverse items-end">
        <div className="h-fit w-full flex flex-col px-5 gap-y-2">
          {messages.map((message, index) => {
            const previousMessage = messages[index - 1] ?? undefined;

            return (
              <div
                key={index}
                className={clsx([
                  'w-full flex flex-row items-center px-4',
                  {
                    'justify-start': message.senderId._id !== props.userId,
                    'justify-end': message.senderId._id === props.userId,
                  },
                ])}
              >
                <Message
                  props={{
                    ref: scrollRef,
                    message,
                    prevMessage: previousMessage,
                    isMainUserMessage: message.senderId._id === userId,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Input Field */}
      <div className="relative w-full h-[20%] max-h-[10vh] bg-[#202020]">
        <form onSubmit={handleMessageFormPost} className="w-full h-full">
          <div className="relative h-full flex flex-row items-center justify-start md:pl-10 w-full lg:max-w-[60vw] xl:max-w-[63vw]">
            <div className="w-[85%]">
              <InputEmoji
                height={5}
                keepOpened
                maxLength={messageIsSending ? 0 : 100}
                value={newMessage}
                onChange={setNewMessage}
                placeholder={
                  messageIsSending
                    ? 'sending message...'
                    : 'Enter message here..'
                }
                inputClass="w-[100%] h-[40px] py-0.5 px-2 overflow-y-scroll"
              />
            </div>
            <div className="w-[10%] h-fit">
              <button
                type="submit"
                disabled={newMessage.length < 1 || messageIsSending}
                className={clsx([
                  'bg-black h-[36px] md:h-[45px] w-[36px] md:w-[45px] rounded-full flex items-center justify-center',
                  {
                    'opacity-45': newMessage.length < 1 || messageIsSending,
                  },
                ])}
              >
                <LuSend className="mt-0.5 mr-1 text-base md:text-xl text-mx-white" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChatBox;
