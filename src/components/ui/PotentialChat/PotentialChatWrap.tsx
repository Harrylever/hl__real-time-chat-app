import React, { useEffect, useState } from 'react'
import { IUser } from 'typings'
import PotentialChat from './PotentialChat'
import { ScrollArea } from '@/components/ui/scroll-area'
import clsx from 'clsx'
import useGetScreenOrientation from 'src/hooks/useGetScreenOrientation'

interface PotentialChatWrapProps {
  chats: IUser[]
}

const PotentialChatWrap: React.FC<PotentialChatWrapProps> = ({
  chats,
}): JSX.Element => {
  const [chatIsLoading, setChatIsLoading] = useState(false)
  const [searchedPotentialChats, setSearchedPotentialChats] = useState<IUser[]>(
    [],
  )
  const { screenOrientation } = useGetScreenOrientation()

  useEffect(() => {
    setSearchedPotentialChats(chats)
  }, [chats])

  return (
    <ScrollArea
      className={clsx('mt-4 w-full', {
        'h-[350px]': screenOrientation === 'desktop',
        'h-full': screenOrientation === 'mobile',
      })}
    >
      <div className="flex flex-col gap-y-2 sm:gap-y-1.5">
        {searchedPotentialChats.map((chat, index) => (
          <PotentialChat
            key={index}
            chat={chat}
            chatIsLoading={chatIsLoading}
            setChatIsLoading={setChatIsLoading}
          />
        ))}
        {searchedPotentialChats.length === 0 && (
          <p className="ml-3">No chats found.</p>
        )}
      </div>
    </ScrollArea>
  )
}

export default PotentialChatWrap
