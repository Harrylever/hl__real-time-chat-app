import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useAppDispatch } from 'src/app'
import LoadingPlayer from '../LoadingPlayer'
import { IPlainMessage } from 'typings'
import { addMessages } from 'src/app/slices/messagesSlice'

interface MessagesProviderProps {
  children: React.ReactNode
  messages: IPlainMessage[]
}

const MessagesProvider: React.FC<MessagesProviderProps> = ({
  children,
  messages,
}) => {
  const [loading, setLoading] = useState(true)

  const dispatch = useAppDispatch()

  const debouncedAddMessages = useCallback(
    debounce((messages: IPlainMessage[]) => {
      dispatch(addMessages(messages))
    }, 100),
    [dispatch],
  )

  useEffect(() => {
    if (!messages.length) {
      dispatch(addMessages([]))
      setLoading(false)
      return
    }
    debouncedAddMessages(messages)
  }, [debouncedAddMessages, dispatch, messages])

  return loading ? <LoadingPlayer /> : <>{children}</>
}

export default MessagesProvider
