import { IChat } from 'typings'
import useToastNotifier from './useToastNotifier'
import { useCallback, useMemo, useState } from 'react'
import { addUserChat } from 'src/app/slices/userChatsSlice'
import {
  ChatRequests,
  useAppDispatch,
  useAppSelector,
  useAxiosPrivate,
} from 'src/app'
import { userIsPresent } from 'src/util/utils'

const useMobileSelectChatHandler = () => {
  const dispatch = useAppDispatch()
  const [, destructiveToast] = useToastNotifier()
  const user = useAppSelector((state) => state.userReduce)
  const axiosInstance = useAxiosPrivate()
  const chatRequests = useMemo(
    () => new ChatRequests(axiosInstance),
    [axiosInstance],
  )

  const [chatsIsLoading, setChatsIsLoading] = useState(false)

  const userChats = useAppSelector((state) => state.userChatsReduce.chats)

  const getUserChatsHandler = useCallback(
    (id: string) => {
      let willEnterStepTwo = false
      setChatsIsLoading(true)
      let allChats: Array<IChat> = []
      const fetch = chatRequests.useGetUserChatsQuery(id)

      return fetch
        .then((res: { success: unknown; data: IChat[] }) => {
          if (res.success) {
            allChats = res.data

            dispatch(
              addUserChat({
                chats: allChats,
              }),
            )
            willEnterStepTwo = true
          } else {
            destructiveToast({
              title: 'Uh oh! Something went wrong',
              description: 'Unexpected connection distruption',
            })
          }
          return {
            willEnterStepTwo,
            allChats,
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setChatsIsLoading(false)
        })
    },
    [chatRequests, destructiveToast, dispatch],
  )

  const callBackFromPotentialChatsWrap = async () => {
    if (userIsPresent(user)) {
      await getUserChatsHandler(user._id as string)
    }
  }

  return [callBackFromPotentialChatsWrap, userChats, chatsIsLoading]
}

export default useMobileSelectChatHandler
