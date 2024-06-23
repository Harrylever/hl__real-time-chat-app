import { IChat, PageProps } from 'typings'
import { ChatSection } from 'src/components/features'
import { addUserChat } from 'src/app/slices/userChatsSlice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ChatRequests,
  useAppDispatch,
  useAppSelector,
  useAxiosPrivate,
} from 'src/app'
import { useToast } from '@/components/ui/use-toast'
import { userIsPresent } from 'src/util/utils'

const ChatInView: React.FC<{ props?: PageProps }> = () => {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const axiosInstance = useAxiosPrivate()
  const chatRequests = useMemo(
    () => new ChatRequests(axiosInstance),
    [axiosInstance],
  )

  // Memoize Important Values - user
  const user = useAppSelector((state) => state.userReduce)

  // Memoize Important Values - userChats
  const userChats = useAppSelector((state) => state.userChatsReduce.chats)
  const memoizedUserChats = useMemo(() => userChats, [userChats])

  // Memoize Important Values - currentChat
  const currentChat = useAppSelector((state) => state.chatReduce.chat)
  const memoizedCurrentChat = useMemo(() => currentChat, [currentChat])

  const [chatsIsLoading, setChatsIsLoading] = useState(false)

  const getUserChatsHandler = useCallback(
    async (id: string) => {
      try {
        setChatsIsLoading(true)
        let allChats: Array<IChat> = []
        const response = (await chatRequests.useGetUserChatsQuery(id)) as {
          success: boolean
          data: IChat[]
        }

        if (response.success) {
          allChats = response.data

          dispatch(
            addUserChat({
              chats: allChats,
            }),
          )
        } else {
          toast({
            variant: 'destructive',
            title: 'Failed to load user chats',
          })
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Failed to load user chats',
        })
      } finally {
        setChatsIsLoading(false)
      }
    },
    [chatRequests, dispatch, toast],
  )

  useEffect(() => {
    if (userIsPresent(user)) {
      setTimeout(async () => {
        await getUserChatsHandler(user._id as string)
      }, 1000)
    }
  }, [getUserChatsHandler, user])

  return (
    <div className="relative w-full h-full pb-5">
      {/* Chat Section */}
      <ChatSection
        props={{
          chatsIsLoading,
          userChats: memoizedUserChats,
          currentChat: memoizedCurrentChat,
        }}
      />
    </div>
  )
}

export default ChatInView
