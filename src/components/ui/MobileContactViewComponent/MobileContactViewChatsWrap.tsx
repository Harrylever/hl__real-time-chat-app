import { useCallback, useEffect, useState } from 'react'
import PotentialChatWrap from '../PotentialChat/PotentialChatWrap'
import { IUser } from 'typings'
import { debounce } from 'lodash'
import LoadingPlayer from '../LoadingPlayer'

interface MobileContactViewChatsWrapProps {
  isLoading: boolean
  searchValue: string
  potentialChats: IUser[]
}

const MobileContactViewChatsWrap: React.FC<MobileContactViewChatsWrapProps> = ({
  isLoading,
  searchValue,
  potentialChats,
}) => {
  const [searchedPotentialChats, setSearchedPotentialChats] = useState<IUser[]>(
    [],
  )

  const handleSearchValueChange = useCallback(
    debounce((query: string) => {
      if (query === '') {
        setSearchedPotentialChats(potentialChats)
        return
      }

      const filteredValues = potentialChats.filter((chat) => {
        return (
          chat.username?.toLowerCase().includes(query.toLowerCase()) ||
          chat.fullname?.toLowerCase().includes(query.toLowerCase())
        )
      })
      setSearchedPotentialChats(filteredValues)
    }, 500),
    [potentialChats],
  )

  useEffect(() => {
    if (searchValue) {
      handleSearchValueChange(searchValue)
    } else if (potentialChats) {
      setSearchedPotentialChats(potentialChats)
    }
  }, [handleSearchValueChange, potentialChats, searchValue])

  return (
    <div className="h-full w-full flex-1 border border-black/10 px-6 py-6 rounded-t-[2.5rem] shadow-inner bg-mx-white">
      {isLoading ? (
        <LoadingPlayer />
      ) : (
        <PotentialChatWrap chats={searchedPotentialChats} />
      )}
    </div>
  )
}

export default MobileContactViewChatsWrap
