import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useAppSelector } from 'src/app'
import { Navigate } from 'react-router-dom'
import { IChat, IMobileChat } from 'typings'
import { useGetMobileUserChatsQuery } from 'src/app/api/hooks'
import MobileViewPropsHeader from 'src/components/ui/MobileViewPropsHeader'
import MobileChatViewChatsWrap from 'src/components/ui/MobileChatViewComponents/MobileChatViewChatsWrap'

const ChatView = () => {
  const { user } = useAppSelector((state) => state.userReduce)
  const [userQuery, setUserQuery] = useState('')
  const [chats, setChats] = useState<IChat[]>([])
  const [componentHeight, setComponentHeight] = useState<number>(0)

  if (!user) {
    return <Navigate to="/auth/login" />
  }

  const { data, isFetching, error, refetch } = useGetMobileUserChatsQuery()

  const mapToChats = useCallback(
    (chats: IMobileChat[]) =>
      chats.map((chat) => ({
        id: chat.id,
        members: [chat.me, chat.recipient.email],
      })),
    [],
  )

  useEffect(() => {
    if (data?.data) {
      setChats(mapToChats(data.data))
    }
  }, [data?.data, mapToChats])

  const debouncedFilterChats = useCallback(
    debounce((query: string) => {
      if (data?.data) {
        const filteredChats = data.data.filter(
          (chat) =>
            chat.recipient.firstname
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            chat.recipient.lastname.toLowerCase().includes(query.toLowerCase()),
        )
        setChats(mapToChats(filteredChats))
      }
    }, 500),
    [data?.data, mapToChats],
  )

  useEffect(() => {
    if (userQuery) {
      debouncedFilterChats(userQuery)
    } else if (data?.data) {
      setChats(mapToChats(data.data))
    }
  }, [data?.data, debouncedFilterChats, mapToChats, userQuery])

  if (error) {
    return (
      <div>
        <p className="italic">Error loading chats</p>
        <button
          type="button"
          onClick={() => refetch()}
          name="retry-fetch-r-chats-button"
        >
          Retry
        </button>
      </div>
    )
  }

  const getComponentHeight = () => {
    const bottomNavigation = document.getElementById('app-mobile-navigation')
    if (!bottomNavigation) return
    const bottomNavigationHeight = bottomNavigation.clientHeight
    setComponentHeight(window.innerHeight - bottomNavigationHeight)
  }

  useEffect(() => {
    getComponentHeight()
    window.addEventListener('resize', getComponentHeight)
    return () => window.removeEventListener('resize', getComponentHeight)
  }, [])

  return (
    <div
      style={{ height: componentHeight }}
      className="h-full w-full pt-4 flex flex-col gap-3 overflow-hidden"
    >
      <MobileViewPropsHeader
        user={user}
        label="Chats"
        userQuery={userQuery}
        updateUserQuery={(e) => setUserQuery(e)}
      />
      <MobileChatViewChatsWrap
        isFetching={isFetching}
        userChats={chats}
        parentComponentHeight={componentHeight}
      />
    </div>
  )
}

export default ChatView
