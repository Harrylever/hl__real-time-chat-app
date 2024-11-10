import { IChat } from 'typings'
import LoadingPlayer from '../LoadingPlayer'
import UserChatsWrap from '../UserChat/UserChatsWrap'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

interface MobileChatViewChatsWrapProps {
  isFetching: boolean
  userChats: IChat[]
}

const MobileChatViewChatsWrap: React.FC<MobileChatViewChatsWrapProps> = ({
  isFetching,
  userChats,
}) => {
  const hasChats = userChats.length > 0

  return (
    <div className="h-full w-full flex-1 border border-black/10 px-6 py-6 rounded-t-[2.5rem] shadow-inner bg-mx-white">
      {isFetching ? (
        <LoadingPlayer />
      ) : hasChats ? (
        <ScrollArea className="mt-4 w-full h-full rounded-sm">
          <UserChatsWrap userChats={userChats} />
        </ScrollArea>
      ) : (
        <p className="mt-4 italic">No chats available</p>
      )}
    </div>
  )
}

export default MobileChatViewChatsWrap
