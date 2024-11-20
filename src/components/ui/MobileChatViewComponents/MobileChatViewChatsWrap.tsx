import { IChat } from 'typings'
import LoadingPlayer from '../LoadingPlayer'
import UserChatsWrap from '../UserChat/UserChatsWrap'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useCallback, useEffect, useState } from 'react'

interface MobileChatViewChatsWrapProps {
  isFetching: boolean
  userChats: IChat[]
  parentComponentHeight: number
}

const MobileChatViewChatsWrap: React.FC<MobileChatViewChatsWrapProps> = ({
  isFetching,
  userChats,
  parentComponentHeight,
}) => {
  const [componentHeight, setComponentHeight] = useState<number>(0)
  const hasChats = userChats.length > 0

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
