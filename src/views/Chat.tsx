import { BiSolidMessageAdd } from 'react-icons/bi';
import { ChatSection } from '../components/sections';
import { IChat, IUser, PageProps } from '../../typings';
import { addUserChat } from '../app/slices/userChatsSlice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PrivateRequestConstruct } from '../app/features/requests';
import { addPotentialChat } from '../app/slices/potentialChatsSlice';
import { setSideBarChatDisplay } from '../app/slices/appUIStateSlice';
import { useAppDispatch, useAppSelector, useAxiosPrivate } from '../app';

const Chat: React.FC<{ props?: PageProps }> = () => {
  const dispatch = useAppDispatch();
  const axiosInstance = useAxiosPrivate();
  const privateRequestInstance = useMemo(
    () => new PrivateRequestConstruct(axiosInstance),
    [axiosInstance]
  );

  const sideBarChatListIsOpen = useAppSelector(
    (state) => state.appUIStateReduce.sideBarChatOpen
  );

  const handleSetSideBarChatListDisplay = () => {
    dispatch(
      setSideBarChatDisplay({
        sideBarChatOpen: true,
      })
    );
  };

  // Memoize Important Values - user
  const user = useAppSelector((state) => state.userReduce);

  // Memoize Important Values - potentialChats
  const potentialChats = useAppSelector(
    (state) => state.potentialChatsReduce.users
  );
  const memoizedPotentialChats = useMemo(
    () => potentialChats,
    [potentialChats]
  );

  // Memoize Important Values - userChats
  const userChats = useAppSelector((state) => state.userChatsReduce.chats);
  const memoizedUserChats = useMemo(() => userChats, [userChats]);

  // Memoize Important Values - currentChat
  const currentChat = useAppSelector((state) => state.chatReduce.chat);
  const memoizedCurrentChat = useMemo(() => currentChat, [currentChat]);

  const [chatsIsLoading, setChatsIsLoading] = useState(false);
  const [pChatsIsLoading, setPChatsIsLoading] = useState(false);

  // Error States
  // const [messagesError, setMessagesError] = useState(undefined);

  const getUserChatsHandler = useCallback(
    async (id: string) => {
      try {
        let willEnterStepTwo = false;
        setChatsIsLoading(true);
        let allChats: Array<IChat> = [];
        const response = (await privateRequestInstance.useGetUserChatsQuery(
          id
        )) as { success: boolean; data: IChat[] };

        if (response.success) {
          allChats = response.data;

          dispatch(
            addUserChat({
              chats: allChats,
            })
          );
          willEnterStepTwo = true;
        } else {
          console.log('unexpected error occured');
        }
        return {
          willEnterStepTwo,
          allChats,
        };
      } catch (err) {
        console.log('unexpected error occured', err);
      } finally {
        setChatsIsLoading(false);
      }
    },
    [dispatch, privateRequestInstance]
  );

  const getPotentialChatsHandler = useCallback(
    async (chats: Array<IChat>) => {
      try {
        setPChatsIsLoading(true);
        const response =
          (await privateRequestInstance.useGetAllUsersQuery()) as {
            success: boolean;
            data: IUser[];
          };

        if (response.success) {
          const pChats = response.data;
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

          dispatch(addPotentialChat({ users: filteredUsers }));
        } else {
          console.log('unexpected error occured!');
        }
      } catch (err) {
        console.log('unexpected error occured', err);
      } finally {
        setPChatsIsLoading(false);
      }
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

  return (
    <div className="relative">
      {/* Chat Section */}
      <ChatSection
        props={{
          chatsIsLoading,
          pChatsIsLoading,
          userChats: memoizedUserChats,
          currentChat: memoizedCurrentChat,
          potentialChats: memoizedPotentialChats,
          callBackFromPotentialChatsWrap: callBackFromPotentialChatsWrap,
        }}
      />

      {/* button */}
      {!sideBarChatListIsOpen && (
        <button
          type="button"
          className="fixed bottom-[400px] -right-1 w-[55px] h-[55px] rounded-full bg-white flex lg:hidden items-center justify-center"
          onClick={handleSetSideBarChatListDisplay}
        >
          <BiSolidMessageAdd className="mt-1 text-3xl text-[#1e293b]" />
        </button>
      )}
    </div>
  );
};

export default Chat;
