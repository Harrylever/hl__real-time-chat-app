import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { IMessage } from 'typings'
import { useAppDispatch } from 'src/app'
import { addMessages } from 'src/app/slices/messagesSlice'
import useDecryptMessage from 'src/hooks/decrypt-message/useDecryptMessage'
import LoadingPlayer from '../LoadingPlayer'

interface MessagesProviderProps {
  children: React.ReactNode
  encryptedMessages: IMessage[]
}

const MessagesProvider: React.FC<MessagesProviderProps> = ({
  children,
  encryptedMessages,
}) => {
  const [loading, setLoading] = useState(true)

  const dispatch = useAppDispatch()
  const { decryptMessages } = useDecryptMessage()

  const fetchDecryptedMessages = useCallback(
    debounce(async (messages: IMessage[]) => {
      const decrypted = await decryptMessages(messages)
      dispatch(addMessages({ messages: decrypted }))
      setLoading(false)
    }, 1200),
    [decryptMessages],
  )

  useEffect(() => {
    if (!encryptedMessages.length) {
      dispatch(addMessages({ messages: [] }))
      setLoading(false)
      return
    }
    dispatch(addMessages({ messages: [] }))
    fetchDecryptedMessages(encryptedMessages)
  }, [dispatch, encryptedMessages, fetchDecryptedMessages])

  return loading ? <LoadingPlayer /> : <>{children}</>
}

export default MessagesProvider
