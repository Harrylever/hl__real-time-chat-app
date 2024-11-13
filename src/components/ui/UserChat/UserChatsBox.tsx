import { useMemo } from 'react'
import UserChatsWrap from './UserChatsWrap'
import LoadingPlayer from '../LoadingPlayer'
import { useGetUserChatsQuery } from 'src/app/api/hooks'
import { ScrollArea } from '@/components/ui/scroll-area'
import PotentialChatsModal from 'src/components/modals/PotentialChatsModal'

const UserChatsBox = () => {
  const { data, isFetching, error, refetch } = useGetUserChatsQuery()
  const userChats = useMemo(() => data?.data ?? [], [data?.data])
  const hasChats = userChats.length > 0

  if (error) {
    return (
      <div>
        <p className="italic">Error loading chats</p>
        <button type="button" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="hidden lg:flex flex-col items-start justify-start w-[27%] min-w-[320px] pl-8 pr-0 h-full overflow-hidden">
      <div className="w-full flex flex-row items-center justify-between">
        <p className="text-3xl font-medium capitalize">chats</p>
        {!isFetching && <PotentialChatsModal />}
      </div>

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

export default UserChatsBox
