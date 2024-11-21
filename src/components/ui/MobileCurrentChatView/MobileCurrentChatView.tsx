import React from 'react'
import { useAppDispatch } from 'src/app'
import { IChat, IPlainMessage, IUser } from 'typings'
import MessagesProvider from './MessagesProvider'
import { GoKebabHorizontal } from 'react-icons/go'
import MessageWrapper from '../Message/MessageWrapper'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { updateCurrentChat } from 'src/app/slices/chatSlice'
import MessageInputWrapper from '../MessageInput'

interface MobileCurrentChatViewProps {
  user: IUser
  currentChat: IChat
  recipientUser: IUser
  messages: IPlainMessage[]
}

const MobileCurrentChatView: React.FC<MobileCurrentChatViewProps> = ({
  user,
  messages,
  currentChat,
  recipientUser,
}) => {
  const dispatch = useAppDispatch()

  const goToChats = () => {
    dispatch(updateCurrentChat(undefined))
  }

  return (
    <section className="w-full h-full">
      <div className="h-[12vh] flex items-center justify-between px-5">
        <div className="flex items-center justify-start gap-3">
          <button name="back-to-mobile-view-layout-button" onClick={goToChats}>
            <MdOutlineArrowBackIos size={20} className="text-mx-primary-2" />
          </button>

          <img
            src={recipientUser.profileImage}
            alt={`${recipientUser.firstname} ${recipientUser.lastname}'s Image`}
            width={0}
            height={0}
            className="w-[50px] h-[50px] rounded-full"
          />

          <div className="flex flex-col items-start justify-center">
            <p className="text-base text-mx-black font-medium capitalize">
              {recipientUser.firstname} {recipientUser.lastname}
            </p>
            <p className="text-xs font-medium text-mx-grey">Active Now</p>
          </div>
        </div>

        <button
          name="chat-options-button"
          className="bg-mx-primary-7 rounded-full h-8 w-8 flex items-center justify-center"
        >
          <GoKebabHorizontal size={20} className="text-mx-white rotate-90" />
        </button>
      </div>

      <div className="h-[73vh] w-full border-t border-mx-grey/30 shadow-md">
        <MessagesProvider messages={messages}>
          <MessageWrapper user={user} />
        </MessagesProvider>
      </div>

      <div className="h-[15vh] w-full">
        <MessageInputWrapper user={user} currentChat={currentChat} />
      </div>
    </section>
  )
}

export default MobileCurrentChatView
