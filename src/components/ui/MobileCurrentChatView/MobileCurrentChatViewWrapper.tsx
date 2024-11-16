import React from 'react'
import { IChat } from 'typings'
import { useAppSelector } from 'src/app'
import { Navigate } from 'react-router-dom'
import LoadingPlayer from '../LoadingPlayer'
import MobileCurrentChatView from './MobileCurrentChatView'
import {
  useGetChatMessagesQuery,
  useGetRecipientUserQuery,
} from 'src/app/api/hooks'
import { motion, Variants } from 'framer-motion'

interface MobileCurrentChatViewWrapperProps {
  currentChat: IChat
}

const MobileCurrentChatViewWrapper: React.FC<
  MobileCurrentChatViewWrapperProps
> = ({ currentChat }) => {
  const { user } = useAppSelector((state) => state.userReduce)

  if (!user) {
    return <Navigate to="/auth/login" />
  }

  const {
    data: messages,
    isError: isMessagesError,
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useGetChatMessagesQuery(currentChat.id)

  const {
    data: recipientUserData,
    isError: isRecipientUserError,
    isLoading: isLoadingRecipientUser,
    refetch: refetchRecipientUser,
  } = useGetRecipientUserQuery({
    accountId: user.email,
    members: currentChat.members,
  })

  const isLoading = isLoadingMessages || isLoadingRecipientUser

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>Loading messages...</p>
        <LoadingPlayer />
      </div>
    )
  }

  if (isMessagesError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Error fetching messages...</p>
        <button
          type="button"
          name="refetch-message"
          onClick={() => refetchMessages()}
        >
          Retry
        </button>
      </div>
    )
  }

  if (isRecipientUserError || !recipientUserData?.data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Error fetching user...</p>
        <button
          type="button"
          name="refetch-recipient-user"
          onClick={() => refetchRecipientUser()}
        >
          Retry
        </button>
      </div>
    )
  }

  const variants: Variants = {
    initial: {
      x: '-100%',
    },
    animate: {
      x: 0,
    },
    exit: {
      x: '-100%',
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.75 }}
      className="w-full h-full flex-1"
    >
      <MobileCurrentChatView
        user={user}
        currentChat={currentChat}
        messages={messages?.data ?? []}
        recipientUser={recipientUserData.data}
      />
    </motion.div>
  )
}

export default MobileCurrentChatViewWrapper
