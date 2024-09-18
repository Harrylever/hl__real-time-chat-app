import React from 'react'
import UserChat from './UserChat'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserChatsWrapProps } from '../../../../typings'
import { PotentialChatsModal } from 'src/components/features'

const UserChatsWrap: React.FC<UserChatsWrapProps> = ({ user, chats }) => {
  return (
    <div className="w-full h-full">
      <div className="hidden sm:flex flex-row items-center justify-between">
        <p className="text-3xl font-medium capitalize">chats</p>
        <PotentialChatsModal />
      </div>

      <div className="mt-4 w-full h-full">
        <ScrollArea className="w-full h-full rounded-sm">
          <div className="flex flex-col gap-y-2 sm:gap-y-1.5">
            {chats.map((chat, _) => (
              <div key={_}>
                <UserChat chat={chat} account={user} recipientUser={user} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default UserChatsWrap
