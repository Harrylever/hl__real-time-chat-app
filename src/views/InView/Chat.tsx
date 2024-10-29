import { useEffect } from 'react'
import { PageProps } from 'typings'
import { useAppDispatch } from 'src/app'
import ChatSection from 'src/components/ui/ChatSection'
import { addUserChat } from 'src/app/slices/userChatsSlice'
import LoadingPlayer from 'src/components/ui/LoadingPlayer'
import { useGetUserChatsQuery } from 'src/app/api/hooks/useChat'

const ChatInView: React.FC<PageProps> = ({ user }) => {
  const dispatch = useAppDispatch()

  const { data, error, refetch, isFetching } = useGetUserChatsQuery()

  useEffect(() => {
    if (!isFetching && data) {
      dispatch(
        addUserChat({
          chats: data.data,
        }),
      )
    }
  }, [data, dispatch, isFetching])

  return (
    <div className="relative w-full h-full pb-5">
      {user && (
        <>
          {isFetching && <LoadingPlayer />}

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
