import { useEffect } from 'react'
import { PageProps } from 'typings'
import { LoadingPlayer } from 'src/components/ui'
import { useAppDispatch, useAppSelector } from 'src/app'
import { addUserChat } from 'src/app/slices/userChatsSlice'
import { useGetUserChatsQuery } from 'src/app/api/hooks/useChat'
import { ChatSection } from 'src/components/features'

const ChatInView: React.FC<{ props?: PageProps }> = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userReduce.user)

  const { data, error, refetch, isFetching, isLoading } = useGetUserChatsQuery()

  const loading = isLoading || isFetching

  useEffect(() => {
    if (!loading && data) {
      dispatch(
        addUserChat({
          chats: data.data,
        }),
      )
    }
  }, [data, dispatch, loading])

  return (
    <div className="relative w-full h-full pb-5">
      {user && (
        <>
          {loading && <LoadingPlayer />}

          {/* Chat Section */}
          {data && <ChatSection user={user} />}

          {error && (
            <div className="w-full h-full flex items-center justify-center">
              <p>Error fetching chats...</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="bg-mx-primary-2 py-3 px-5 rounded-lg text-white text-sm"
              >
                Try again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ChatInView
