import { useAppSelector } from '../app'
import { IMessage } from '../../typings'
import { useCallback, useEffect, useState } from 'react'

const FetchLatestMessage = (): IMessage => {
  const newMessage = useAppSelector((state) => state.socketReduce.newMessage)
  const notifications = useAppSelector(
    (state) => state.notificationReduce.notifications,
  )
  const [latestMessage] = useState<IMessage | undefined>(undefined)

  const getMessages = useCallback(async () => {
    // if (!chat._id) return
    // const response = (await messageRequests.useGetLastChatMessage(
    //   chat._id as string,
    // )) as { success: boolean; data: IMessage }
    // setLatestMessage(response.data)
  }, [])

  useEffect(() => {
    getMessages()
  }, [getMessages, newMessage, notifications])

  return latestMessage as IMessage
}

export default FetchLatestMessage
