import React, { useState } from 'react'
import clsx from 'clsx'
import { IUser } from 'typings'
import PotentialChat from './PotentialChat'
import { ScrollArea } from '@/components/ui/scroll-area'
import useGetScreenOrientation from 'src/hooks/useGetScreenOrientation'

interface PotentialChatWrapProps {
  chats: IUser[]
}

const PotentialChatWrap: React.FC<PotentialChatWrapProps> = ({
  chats,
}): JSX.Element => {
  const [chatIsLoading, setChatIsLoading] = useState(false)
  const { screenOrientation } = useGetScreenOrientation()

  return (
    <ScrollArea
      className={clsx('mt-4 w-full', {
        'h-[350px]': screenOrientation === 'desktop',
        'h-full max-h-full': screenOrientation === 'mobile',
      })}
    >
      <div className="h-full max-h-full flex flex-col gap-y-2 sm:gap-y-1.5">
        {chats.map((chat) => (
          <PotentialChat
            chat={chat}
            key={chat.email}
            chatIsLoading={chatIsLoading}
            setChatIsLoading={setChatIsLoading}
          />
        ))}
        {chats.length === 0 && <p className="ml-3">No chats found.</p>}
      </div>
    </ScrollArea>
  )
}

export default PotentialChatWrap
