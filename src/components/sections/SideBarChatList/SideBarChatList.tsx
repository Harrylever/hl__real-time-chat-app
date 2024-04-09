import { MdClose } from 'react-icons/md';
import { IChat, IUser } from '../../../../typings';
import LoadingPlayer from '../../atoms/LoadingPlayer';
import React, { useCallback, useMemo, useState } from 'react';
import { addUserChat } from '../../../app/slices/userChatsSlice';
import { PotentialChatWrap, UserChatWrap } from '../../molecules';
import { addPotentialChat } from '../../../app/slices/potentialChatsSlice';
import { setSideBarChatDisplay } from '../../../app/slices/appUIStateSlice';
import { ChatRequests, UserRequests } from '../../../app/features/requests';
import { useAppDispatch, useAppSelector, useAxiosPrivate } from '../../../app';

interface ISideBarChatListProps {}

const SideBarChatList: React.FC<ISideBarChatListProps> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReduce);
  const axiosInstance = useAxiosPrivate();
  const userRequests = useMemo(
    () => new UserRequests(axiosInstance),
    [axiosInstance]
  );
  const chatRequests = useMemo(
    () => new ChatRequests(axiosInstance),
    [axiosInstance]
  );
  const [chatsIsLoading, setChatsIsLoading] = useState(false);
  const [pChatsIsLoading, setPChatsIsLoading] = useState(false);

  const potentialChats = useAppSelector((state) => state.potentialChatsReduce.users);
  const userChats = useAppSelector((state) => state.userChatsReduce.chats);

  const handleCloseSideBarChatList = () => {
    dispatch(
      setSideBarChatDisplay({
        sideBarChatOpen: false,
      })
    );
  };

  const getUserChatsHandler = useCallback(
    (id: string) => {
      let willEnterStepTwo = false;
      setChatsIsLoading(true);
      let allChats: Array<IChat> = [];
      const fetch = chatRequests.useGetUserChatsQuery(id);

      return fetch
        .then((res: { success: unknown; data: IChat[]; }) => {
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
    [chatRequests, dispatch]
  );

  const getPotentialChatsHandler = useCallback(
    (chats: Array<IChat>) => {
      setPChatsIsLoading(true);
      const fetch = userRequests.useGetAllUsersQuery();

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
    [dispatch, user._id, userRequests]
  );

  const callBackFromPotentialChatsWrap = async () => {
    if (user._id && user._id !== '') {
      const result = await getUserChatsHandler(user._id as string);

      if (result && result.willEnterStepTwo === true) {
        getPotentialChatsHandler(result.allChats);
      }
    }
  };

  return (
    <section
      data-aos="fade-right"
      className="bg-[#1e293b] absolute z-[40] top-0 left-0 w-screen h-screen overflow-hidden"
    >
      <div className="relative w-full h-full flex flex-col items-start justify-between pt-10 px-3">
        <button
          type="button"
          className="absolute top-6 right-6 w-[40px] h-[40px] bg-[#425b8376] flex items-center justify-center rounded-lg"
          onClick={handleCloseSideBarChatList}
        >
          <MdClose className="text-xl" />
        </button>

        {/*  */}
        <div className="h-[25%]">
          <p>Select New Chat</p>

          {/* Potential Chats */}
          <div>
            {pChatsIsLoading && <LoadingPlayer />}
            <PotentialChatWrap
              props={potentialChats}
              updatePotentialChatsCb={() => callBackFromPotentialChatsWrap()}
            />
          </div>
        </div>

        {/*  */}
        <div className="h-[70%] w-full">
          {/* Continue chat */}
          <p>Select Chat</p>

          {/*  */}
          <div className="w-full max-h-full overflow-y-scroll pb-20">
            {chatsIsLoading && <LoadingPlayer />}
            <UserChatWrap props={{ chats: userChats, user: user }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBarChatList;
