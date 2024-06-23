import React from 'react'
import UserChat from './UserChat'
import { IUserChatWrapProps } from '../../../../typings'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PotentialChatsModal } from 'src/components/features'

const UserMessageWrap: React.FC<{
  props: IUserChatWrapProps
}> = ({ props: { chats, user, messageType, isForMobile } }) => {
  return (
    <div className="w-full h-full">
      {!isForMobile && (
        <div className="hidden sm:flex flex-row items-center justify-between">
          <p className="text-3xl font-medium capitalize">{messageType}</p>
          <PotentialChatsModal />
        </div>
      )}

      <div className="mt-4 w-full h-full">
        <ScrollArea className="w-full h-full rounded-sm">
          <div className="flex flex-col gap-y-2 sm:gap-y-1.5">
            {chats.map((chat, _) => (
              <div key={_}>
                <UserChat props={{ chat: chat, user: user }} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default UserMessageWrap
