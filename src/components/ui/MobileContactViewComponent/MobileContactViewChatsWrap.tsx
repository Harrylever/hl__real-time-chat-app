import { useCallback, useEffect, useState } from 'react'
import PotentialChatWrap from '../PotentialChat/PotentialChatWrap'
import { IUser } from 'typings'
import { debounce } from 'lodash'
import LoadingPlayer from '../LoadingPlayer'

interface MobileContactViewChatsWrapProps {
  isLoading: boolean
  searchValue: string
  potentialChats: IUser[]
  parentComponentHeight: number
}

const MobileContactViewChatsWrap: React.FC<MobileContactViewChatsWrapProps> = ({
  isLoading,
  searchValue,
  potentialChats,
  parentComponentHeight,
}) => {
  const [componentHeight, setComponentHeight] = useState<number>(0)
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

  const handleSetContainerHeight = useCallback(() => {
    const header = document.getElementById('mobile-view-props-header')
    if (!header) return
    const headerHeight = header.clientHeight

    const remainHeight = parentComponentHeight - headerHeight
    setComponentHeight(remainHeight)
  }, [parentComponentHeight])

  useEffect(() => {
    handleSetContainerHeight()
    window.addEventListener('resize', handleSetContainerHeight)
    return () => window.removeEventListener('resize', handleSetContainerHeight)
  }, [handleSetContainerHeight])

  return (
    <div
      style={{ height: componentHeight }}
      className="h-full w-full border border-black/10 px-6 py-6 rounded-t-[2.5rem] shadow-inner bg-mx-white overflow-y-hidden"
    >
      {isLoading ? (
        <LoadingPlayer />
      ) : (
        <PotentialChatWrap chats={searchedPotentialChats} />
      )}
    </div>
  )
}

export default MobileContactViewChatsWrap
