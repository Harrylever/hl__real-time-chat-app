import { classNames } from 'src/styles'
import { useAppSelector } from 'src/app'
import PotentialChat from './PotentialChat'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PotentialChatWrapProps, IAccount } from 'typings'
import React, { ChangeEvent, useEffect, useState } from 'react'

const PotentialChatWrap: React.FC<PotentialChatWrapProps> = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('')
  const [chatIsLoading, setChatIsLoading] = useState(false)
  const [searchedPotentialChats, setSearchedPotentialChats] = useState<
    IAccount[]
  >([])

  const potentialChats = useAppSelector(
    (state) => state.potentialChatsReduce.users,
  )

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setSearchValue(text)

    if (text === '') {
      setSearchedPotentialChats(potentialChats)
      return
    }

    const filteredValues = potentialChats.filter((chat) => {
      return (
        chat.username?.toLowerCase().includes(text.toLowerCase()) ||
        chat.fullname?.toLowerCase().includes(text.toLowerCase())
      )
    })
    setSearchedPotentialChats(filteredValues)
  }

  useEffect(() => {
    setSearchedPotentialChats(potentialChats)
  }, [potentialChats])

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="mt-2">
          <label htmlFor="search-chat">
            <input
              className={classNames.authFormInput}
              type="text"
              placeholder="Search name or username"
              name="search-chat"
              id="search-chat"
              aria-label="search-chat"
              value={searchValue}
              onChange={handleSearchValueChange}
            />
          </label>
        </div>

        <ScrollArea className="mt-4 h-[350px] w-full">
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
      </div>
    </React.Fragment>
  )
}

export default PotentialChatWrap
