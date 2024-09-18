import { useState } from 'react'
import { useAppSelector } from 'src/app'
import { useGetUserChatsQuery } from 'src/app/api/hooks/useChat'
import {
  useGetScreenSize,
  useUpdateCurrentChatHandler,
} from 'src/components/hooks'
import { UserMessageWrap } from 'src/components/molecules'
import { IChat, IPotentialChatWrapProps } from 'typings'

const ChatsView = () => {
  const user = useAppSelector((state) => state.userReduce)
  const potentialChats = useAppSelector(
    (state) => state.potentialChatsReduce.users,
  )

  const [activeChats, setActiveChats] = useState<
    'userschats' | 'potentialchats'
  >('userschats')

  const { updateCurrentChatHandler } = useUpdateCurrentChatHandler()

  const handleCallBackFromPotentialsChatsWrap = (chat: IChat) => {
    if (
      typeof callBackFromPotentialChatsWrap !== 'boolean' &&
      typeof callBackFromPotentialChatsWrap !== 'object'
    ) {
      callBackFromPotentialChatsWrap()
    }
    updateCurrentChatHandler(chat)
  }

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between">
        <p>Select chat</p>

        <button
          type="button"
          onClick={() =>
            setActiveChats(
              activeChats === 'userschats' ? 'potentialchats' : 'userschats',
            )
          }
        >
          <p className="text-xs font-medium text-mx-grey p-0.5 bg-[#ffffff8e] rounded-md">
            {activeChats === 'userschats'
              ? 'See all contacts'
              : 'See your chats'}
          </p>
        </button>
      </div>

      {/* Potential Chats */}
      <div>{chatsIsLoading && <LoadingPlayer />}</div>
    </div>
  )
}

const UserChatList = ({
  chatId,
  activeChats,
  potentialChats,
}: {
  chatId: string
  activeChats: 'userschats' | 'potentialchats'
  potentialChats: IPotentialChatWrapProps
}) => {
  const { screenWidth } = useGetScreenSize()
  const { data } = useGetUserChatsQuery(chatId)
  const user = useAppSelector((state) => state.userReduce)

  if (!data) {
    return <p>Loading chats...</p>
  }

  return (
    <>
      {activeChats === 'userschats' ? (
        <UserMessageWrap
          props={{
            chats: data as IChat[],
            user: user,
            messageType: 'chats',
            isForMobile: screenWidth < 1024,
          }}
        />
      ) : (
        <PotentialChatWrap
          props={potentialChats as IPotentialChatWrapProps}
          updatePotentialChatsCb={(chat) =>
            handleCallBackFromPotentialsChatsWrap(chat)
          }
        />
      )}
    </>
  )
}
