import React from 'react'
import { IChat } from 'typings'
import UserChat from './UserChat'
import { ScrollArea } from '@/components/ui/scroll-area'
import PotentialChatsModal from 'src/components/modals/PotentialChatsModal'

interface UserChatsWrapProps {
  chats: IChat[]
}

const UserChatsWrap: React.FC<UserChatsWrapProps> = ({ chats }) => {
  return (
    <div className="w-full h-full">
      <div className="hidden sm:flex flex-row items-center justify-between">
        <p className="text-3xl font-medium capitalize">chats</p>
        <PotentialChatsModal />
      </div>

      <div className="mt-4 w-full h-full">
        <ScrollArea className="w-full h-full rounded-sm">
          <div className="flex flex-col gap-y-2 sm:gap-y-1.5">
            {chats.map((chat, index) => (
              <div key={index}>
                <UserChat chat={chat} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default UserChatsWrap
