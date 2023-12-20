import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector, useAxiosPrivate } from '../../app';
import { PrivateRequestConstruct } from '../../app/features/requests';
import { ChatBox, PotentialChatWrap, UserChatWrap } from '../molecules';
import { IChat, IChatSectionProps, IUser } from '../../../typings';
import { addPotentialChat } from '../../app/slices/potentialChatsSlice';
import { addUserChat } from '../../app/slices/userChatsSlice';
import { addMessages } from '../../app/slices/messagesSlice';

const ChatSection: React.FC<{ props?: IChatSectionProps }> = () => {
  const dispatch = useAppDispatch();
  const axiosInstance = useAxiosPrivate();
  const privateRequestInstance = useMemo(
    () => new PrivateRequestConstruct(axiosInstance),
    [axiosInstance]
  );

  // Memoize Important Values - user
  const user = useAppSelector((state) => state.userReduce);
  const memoizedUser = useMemo(() => user, [user]);

  // Memoize Important Values - currentChat
  const currentChat = useAppSelector((state) => state.chatReduce.chat);
  const memoizedCurrentChat = useMemo(() => currentChat, [currentChat]);

  // Memoize Important Values - userChats
  const userChats = useAppSelector((state) => state.userChatsReduce.chats);
  const memoizedUserChats = useMemo(() => userChats, [userChats]);

  // Memoize Important Values - potentialChats
  const potentialChats = useAppSelector(
    (state) => state.potentialChatsReduce.users
  );
  const memoizedPotentialChats = useMemo(
    () => potentialChats,
    [potentialChats]
  );

  // Memoize Important Values - messages
  const messages = useAppSelector((state) => state.messageReduce.messages);
  const memoizedMessages = useMemo(() => messages, [messages]);

  const [chatsIsLoading, setChatsIsLoading] = useState(false);
  const [pChatsIsLoading, setPChatsIsLoading] = useState(false);
  const [messagesIsLoading, setMessagesIsLoading] = useState(false);

  // Error States
  // const [messagesError, setMessagesError] = useState(undefined);

  const getUserChatsHandler = useCallback(
    (id: string) => {
      let willEnterStepTwo = false;
      setChatsIsLoading(true);
      let allChats: Array<IChat> = [];
      const fetch = privateRequestInstance.useGetUserChatsQuery(id);

      return fetch
        .then((res) => {
          if (res.success) {
            allChats = res.data;

            dispatch(
              addUserChat({
                chats: allChats,
              })
            );
            willEnterStepTwo = true;
          } else {
            console.log('Unexpected error occurred!');
          }
          return {
            willEnterStepTwo,
            allChats,
          };
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setChatsIsLoading(false);
        });
    },
    [dispatch, privateRequestInstance]
  );

  const getPotentialChatsHandler = useCallback(
    (chats: Array<IChat>) => {
      setPChatsIsLoading(true);
      const fetch = privateRequestInstance.useGetAllUsersQuery();

      fetch
        .then((res) => {
          if (res.success) {
            const pChats = res.data as Array<IUser>;
            const filteredUsers = pChats.filter((u) => {
              let isChatCreated = false;

              if (user._id === u._id) return false;

              if (chats) {
                isChatCreated = chats.some((chat) => {
                  return (
                    chat.members &&
                    (chat.members[0] === u._id || chat.members[1] === u._id)
                  );
                });

                return !isChatCreated;
              }
            });

            dispatch(
              addPotentialChat({
                users: filteredUsers,
              })
            );
          } else {
            console.log('Unexpected error occured!');
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPChatsIsLoading(false);
        });
    },
    [dispatch, privateRequestInstance, user._id]
  );

  const callBackFromPotentialChatsWrap = async () => {
    if (user._id && user._id !== '') {
      const result = await getUserChatsHandler(user._id as string);

      if (result && result.willEnterStepTwo === true) {
        getPotentialChatsHandler(result.allChats);
      }
    }
  };

  // Get Messages Handler
  const getChatMessagesHandler = useCallback(() => {
    setMessagesIsLoading(true);
    if (currentChat._id === undefined || currentChat._id === '') {
      setMessagesIsLoading(false);
      return;
    }

    const fetch = privateRequestInstance.useGetChatMessages(
      currentChat._id as string
    );

    fetch
      .then((res) => {
        if (res.success) {
          dispatch(
            addMessages({
              messages: res.data.messasges,
            })
          );
        } else {
          //
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMessagesIsLoading(false);
      });
  }, [currentChat, dispatch, privateRequestInstance]);

  useEffect(() => {
    if (user._id && user._id !== '') {
      setTimeout(async () => {
        const result = await getUserChatsHandler(user._id as string);

        if (result && result.willEnterStepTwo === true) {
          getPotentialChatsHandler(result.allChats);
        }
      }, 1000);
    }
  }, [getPotentialChatsHandler, getUserChatsHandler, user]);

  useEffect(() => {
    getChatMessagesHandler();
  }, [getChatMessagesHandler, currentChat]);

  return (
    <div className="w-full flex flex-row flex-grow-0 gap-4">
      <div>
        <div className="flex flex-row gap-x-2 pb-5">
          {chatsIsLoading || pChatsIsLoading ? (
            <p>Loading chats...</p>
          ) : (
            // Potential-Chats-Wrap Component
            // the potentialChats Array is being passed as the props from THE REDUX REDUCER
            <PotentialChatWrap
              props={memoizedPotentialChats}
              updatePotentialChatsCb={() => callBackFromPotentialChatsWrap()}
            />
          )}
        </div>

        <div>
          {userChats && (
            // User-Chats-Wrap Component
            // the userChats Array is being passed as the props from THE REDUX REDUCER
            <UserChatWrap props={{ chats: memoizedUserChats, user: user }} />
          )}
        </div>
      </div>

      {/* The Chat Interface View */}
      <div>
        <ChatBox
          props={{
            messsagesIsLoading: messagesIsLoading,
            messages: memoizedMessages,
            currentChat: memoizedCurrentChat,
            user: memoizedUser,
          }}
        />
      </div>
    </div>
  );
};

export default ChatSection;
