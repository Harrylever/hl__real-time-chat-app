import React from 'react'
import { IUser } from 'typings'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import ActiveNowText from '../ActiveNowText'

interface ChatViewHeaderProps {
  recipientUser: IUser
}

const ChatViewHeader: React.FC<ChatViewHeaderProps> = ({ recipientUser }) => {
  return (
    <div className="py-3 sm:py-2 px-3.5 sm:px-10  w-full flex items-center justify-between shadow-sm">
      <div className="w-full flex items-center justify-start space-x-2">
        <div>
          <img
            alt={recipientUser.email}
            src={recipientUser.profileImage}
            className="w-[50px] sm:w-[50px] h-auto"
          />
        </div>

        <div className="flex flex-col items-start justify-start">
          <p className="text-sm font-normal text-mx-black capitalize">
            {`${recipientUser.firstname} ${recipientUser.lastname}`}
          </p>

          <ActiveNowText email={recipientUser.email} />
        </div>
      </div>

      <button
        type="button"
        name="single-chat-info-button"
        className="focus:outline-none"
      >
        <IoIosInformationCircleOutline size={21} />
      </button>
    </div>
  )
}

export default ChatViewHeader
