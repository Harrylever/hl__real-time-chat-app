import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUser } from 'typings'
import { classNames } from 'src/styles'
import PotentialChatWrap from './PotentialChatWrap'

interface PotentialChatBoxProps {
  potentialChats: IUser[]
}

const PotentialChatBox: React.FC<PotentialChatBoxProps> = ({
  potentialChats,
}): JSX.Element => {
  const [searchValue, setSearchValue] = useState('')
  const [searchedPotentialChats, setSearchedPotentialChats] = useState<IUser[]>(
    [],
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
        chat.firstname?.toLowerCase().includes(text.toLowerCase()) ||
        chat.lastname?.toLowerCase().includes(text.toLowerCase())
      )
    })
    setSearchedPotentialChats(filteredValues)
  }

  useEffect(() => {
    setSearchedPotentialChats(potentialChats)
  }, [potentialChats])

  return (
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

      <PotentialChatWrap chats={searchedPotentialChats} />
    </div>
  )
}

export default PotentialChatBox
